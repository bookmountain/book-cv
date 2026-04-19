from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import re


REPO_ROOT = Path(__file__).resolve().parents[3]
LATEX_DIR = REPO_ROOT / "latex"
RESUME_SECTIONS_DIR = LATEX_DIR / "sections" / "resume"

INPUT_PATTERN = re.compile(r"\\input\{([^}]+)\}")
HREF_PATTERN = re.compile(r"\\href\{[^{}]*\}\{([^{}]*)\}")
WHITESPACE_PATTERN = re.compile(r"\s+")


@dataclass(frozen=True)
class ResumeEducationEntry:
    degree: str
    institution: str
    location: str
    period: str
    sort_order: int


@dataclass(frozen=True)
class ResumeReferenceEntry:
    name: str
    role: str
    organization: str
    email: str
    relationship: str
    sort_order: int


def _read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _normalize_latex_text(value: str) -> str:
    text = HREF_PATTERN.sub(r"\1", value.strip())

    replacements = {
        "\\textbar": "|",
        "\\&": "&",
        "~": " ",
        "``": '"',
        "''": '"',
    }

    for source, target in replacements.items():
        text = text.replace(source, target)

    return WHITESPACE_PATTERN.sub(" ", text).strip()


def _extract_macro_arguments(source: str, macro_name: str, argument_count: int) -> list[str]:
    macro_start = source.find(macro_name)

    if macro_start < 0:
        raise ValueError(f"Could not find {macro_name!r} in resume source.")

    cursor = macro_start + len(macro_name)
    arguments: list[str] = []

    while len(arguments) < argument_count:
        while cursor < len(source) and source[cursor].isspace():
            cursor += 1

        if cursor >= len(source) or source[cursor] != "{":
            raise ValueError(f"Could not parse argument {len(arguments) + 1} for {macro_name!r}.")

        depth = 0
        argument_start = cursor + 1

        while cursor < len(source):
            character = source[cursor]

            if character == "{":
                depth += 1
            elif character == "}":
                depth -= 1

                if depth == 0:
                    arguments.append(_normalize_latex_text(source[argument_start:cursor]))
                    cursor += 1
                    break

            cursor += 1
        else:
            raise ValueError(f"Unclosed brace while parsing {macro_name!r}.")

    return arguments


def _iter_section_files(section_name: str) -> list[Path]:
    index_path = RESUME_SECTIONS_DIR / f"{section_name}.tex"
    matches = INPUT_PATTERN.findall(_read_text(index_path))
    return [LATEX_DIR / match for match in matches]


def _derive_reference_relationship(role: str) -> str:
    lowered = role.lower()

    if "engineer" in lowered:
        return "Engineering reference"
    if "program manager" in lowered:
        return "Program leadership reference"
    if "manager" in lowered:
        return "Leadership reference"

    return "Professional reference"


def _split_reference_role_and_organization(value: str) -> tuple[str, str]:
    if " at " in value:
        role, organization = value.rsplit(" at ", 1)
        return role.strip(), organization.strip()

    return value.strip(), ""


def load_resume_education_entries() -> list[ResumeEducationEntry]:
    entries: list[ResumeEducationEntry] = []

    for sort_order, path in enumerate(_iter_section_files("education"), start=1):
        degree, period, institution, location = _extract_macro_arguments(
            _read_text(path),
            r"\resumeEducation",
            4,
        )
        entries.append(
            ResumeEducationEntry(
                degree=degree,
                institution=institution,
                location=location,
                period=period,
                sort_order=sort_order,
            )
        )

    return entries


def load_resume_reference_entries() -> list[ResumeReferenceEntry]:
    entries: list[ResumeReferenceEntry] = []

    for sort_order, path in enumerate(_iter_section_files("referees"), start=1):
        name, raw_role, email = _extract_macro_arguments(_read_text(path), r"\resumeReferee", 3)
        role, organization = _split_reference_role_and_organization(raw_role)
        entries.append(
            ResumeReferenceEntry(
                name=name,
                role=role,
                organization=organization,
                email=email,
                relationship=_derive_reference_relationship(role),
                sort_order=sort_order,
            )
        )

    return entries
