(() => {
  const editorSelector = "[data-markdown-editor='true']";
  const textareaSelector = "[data-markdown-editor-textarea='true']";
  const previewSelector = "[data-markdown-editor-preview='true']";

  function getCookie(name) {
    const parts = document.cookie ? document.cookie.split(";") : [];
    const prefix = `${name}=`;

    for (const part of parts) {
      const cookie = part.trim();
      if (cookie.startsWith(prefix)) {
        return decodeURIComponent(cookie.slice(prefix.length));
      }
    }

    return "";
  }

  function insertAroundSelection(textarea, prefix, suffix, placeholder) {
    const { selectionStart, selectionEnd, value } = textarea;
    const selection = value.slice(selectionStart, selectionEnd) || placeholder;
    const nextValue = `${value.slice(0, selectionStart)}${prefix}${selection}${suffix}${value.slice(selectionEnd)}`;
    const focusStart = selectionStart + prefix.length;
    const focusEnd = focusStart + selection.length;

    textarea.value = nextValue;
    textarea.focus();
    textarea.setSelectionRange(focusStart, focusEnd);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function prefixSelectedLines(textarea, prefix, fallback) {
    const { selectionStart, selectionEnd, value } = textarea;
    const rangeStart = value.lastIndexOf("\n", Math.max(selectionStart - 1, 0)) + 1;
    const rangeEnd = value.indexOf("\n", selectionEnd);
    const blockEnd = rangeEnd === -1 ? value.length : rangeEnd;
    const currentBlock = value.slice(rangeStart, blockEnd) || fallback;
    const nextBlock = currentBlock
      .split("\n")
      .map((line) => `${prefix}${line || fallback}`)
      .join("\n");

    textarea.value = `${value.slice(0, rangeStart)}${nextBlock}${value.slice(blockEnd)}`;
    textarea.focus();
    textarea.setSelectionRange(rangeStart, rangeStart + nextBlock.length);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function insertTemplate(textarea, template, cursorOffset) {
    const { selectionStart, selectionEnd, value } = textarea;
    const nextValue = `${value.slice(0, selectionStart)}${template}${value.slice(selectionEnd)}`;

    textarea.value = nextValue;
    textarea.focus();
    const cursor = selectionStart + cursorOffset;
    textarea.setSelectionRange(cursor, cursor);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function applyAction(action, textarea) {
    switch (action) {
      case "bold":
        insertAroundSelection(textarea, "**", "**", "bold text");
        break;
      case "italic":
        insertAroundSelection(textarea, "*", "*", "italic text");
        break;
      case "heading":
        prefixSelectedLines(textarea, "## ", "Heading");
        break;
      case "link":
        insertAroundSelection(textarea, "[", "](https://example.com)", "link text");
        break;
      case "ulist":
        prefixSelectedLines(textarea, "- ", "List item");
        break;
      case "quote":
        prefixSelectedLines(textarea, "> ", "Quoted text");
        break;
      case "code":
        insertTemplate(textarea, "```\ncode\n```", 4);
        break;
      default:
        break;
    }
  }

  async function renderPreview(editor) {
    const preview = editor.querySelector(previewSelector);
    const textarea = editor.querySelector(textareaSelector);
    const previewUrl = editor.dataset.previewUrl;

    if (!preview || !textarea || !previewUrl) {
      return;
    }

    preview.innerHTML = '<p class="markdown-editor__placeholder">Rendering preview…</p>';

    try {
      const response = await fetch(previewUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ markdown: textarea.value }),
      });

      if (!response.ok) {
        throw new Error(`Preview request failed with ${response.status}`);
      }

      const payload = await response.json();
      preview.innerHTML = payload.html || '<p class="markdown-editor__placeholder">Nothing to preview yet.</p>';
      editor.dataset.previewDirty = "false";
    } catch (_error) {
      preview.innerHTML = '<p class="markdown-editor__placeholder">Preview is unavailable right now.</p>';
    }
  }

  function setMode(editor, mode) {
    const textareaPane = editor.querySelector(".markdown-editor__write-pane");
    const preview = editor.querySelector(previewSelector);
    const modeButtons = editor.querySelectorAll("[data-markdown-mode]");

    if (!textareaPane || !preview) {
      return;
    }

    const previewMode = mode === "preview";
    textareaPane.hidden = previewMode;
    preview.hidden = !previewMode;

    for (const button of modeButtons) {
      const active = button.dataset.markdownMode === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    }

    if (previewMode && editor.dataset.previewDirty !== "false") {
      renderPreview(editor);
    }
  }

  function initEditor(editor) {
    if (!(editor instanceof HTMLElement) || editor.dataset.markdownEditorReady === "true") {
      return;
    }

    const textarea = editor.querySelector(textareaSelector);
    if (!(textarea instanceof HTMLTextAreaElement)) {
      return;
    }

    editor.dataset.markdownEditorReady = "true";
    editor.dataset.previewDirty = "true";

    editor.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const actionButton = target.closest("[data-markdown-action]");
      if (actionButton instanceof HTMLElement) {
        event.preventDefault();
        applyAction(actionButton.dataset.markdownAction, textarea);
        return;
      }

      const modeButton = target.closest("[data-markdown-mode]");
      if (modeButton instanceof HTMLElement) {
        event.preventDefault();
        setMode(editor, modeButton.dataset.markdownMode);
      }
    });

    textarea.addEventListener("input", () => {
      editor.dataset.previewDirty = "true";
    });
  }

  function initEditors(root = document) {
    const scope = root instanceof Element || root instanceof Document ? root : document;
    scope.querySelectorAll(editorSelector).forEach(initEditor);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initEditors());
  } else {
    initEditors();
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          if (node.matches(editorSelector)) {
            initEditor(node);
          } else {
            initEditors(node);
          }
        }
      });
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
