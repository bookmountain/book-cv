"""Text that older versions of ``seed_portfolio`` wrote for resume-covered rows.

``sync_resume_content`` only replaces ``summary``, ``details`` or ``highlights`` when the
live value is empty or still one of these seed values, so text written in the admin is kept.
"""

LEGACY_PROJECT_TEXT = {
    "microservice-demo-auction-platform": {
        "summary": "A containerized auction platform built around decoupled "
        "services, asynchronous events, real-time updates, and "
        "gateway routing.",
        "details": "This project is my working proof that I understand "
        "distributed application boundaries beyond just talking "
        "about them in interviews. It is organized around "
        "multiple services with clear ownership, asynchronous "
        "messaging, and a frontend that consumes live state "
        "instead of relying on one large monolith.\n"
        "\n"
        "The main value is not only the tech stack. It "
        "demonstrates how I think about service contracts, "
        "event-driven updates, failure boundaries, and how "
        "frontend product behavior changes when the backend is "
        "split into focused services.",
        "highlights": [
            "Modeled a real auction workflow with decoupled services instead of a monolithic API.",
            "Used RabbitMQ and gRPC to cover both asynchronous "
            "messaging and tighter service communication.",
            "Built the project as a practical microservice portfolio piece rather than a toy CRUD demo.",
        ],
    },
    "microsoft-form-recognizer-toolkit": {
        "summary": "Contribution work inside Microsoft's public toolkit for "
        "document intelligence workflows and supporting developer "
        "tooling.",
        "details": "This project reflects a public, inspectable part of my "
        "Microsoft work. Contributing to the official toolkit "
        "meant working within existing conventions, keeping "
        "developer ergonomics in mind, and improving tools that "
        "supported Azure AI document workflows.\n"
        "\n"
        "The important signal here is not just that the repository "
        "is public. It shows that I can work inside a large "
        "organization's engineering standards and contribute in a "
        "way that helps other developers use the platform "
        "effectively.",
        "highlights": [
            "Contributed to Microsoft's public developer tooling around Form Recognizer workflows.",
            "Worked in a codebase where usability and documentation mattered alongside implementation.",
            "Used the project as a bridge between internal product work and public developer experience.",
        ],
    },
    "ai-agent-project": {
        "summary": "An experiment in agent-style workflows that combine structured prompts, "
        "tooling, and local model infrastructure.",
        "details": "The point of this build is not to overclaim autonomous intelligence. It is "
        "to explore the parts of agent workflows that are actually useful: bounded "
        "tools, structured inputs, clear outputs, and repeatable runtime behavior.",
        "highlights": [
            "Bounded tools and explicit workflow design.",
            "Focused on useful orchestration rather than hype.",
        ],
    },
    "ai-web-generator": {
        "summary": "A project focused on generating practical web experiences while keeping "
        "the output readable, maintainable, and grounded in real implementation "
        "details.",
        "details": "This is where I want to test how far AI-assisted UI generation can go "
        "before it stops being a good engineering tool and starts producing generic "
        "output. The goal is to keep the generated result useful, readable, and "
        "consistent with real product constraints.",
        "highlights": [
            "Combines generation speed with human design review.",
            "Treats maintainability as a first-class output metric.",
        ],
    },
}

LEGACY_EXPERIENCE_TEXT = {
    "Microsoft": {
        "summary": "Worked across Azure AI Studio migration, enterprise document workflows, developer "
        "tooling, accessibility, and delivery operations.",
        "highlights": [
            "Migrated VDI products into Azure AI Studio and aligned legacy capabilities "
            "with scalable AI-enabled workflows.",
            "Used AI-assisted development tools to speed up workflow optimization for "
            "enterprise document processing.",
            "Standardized Linux workflows with WSL2 to reduce setup friction and improve "
            "team-wide velocity.",
        ],
    },
    "Gold Crown Technology Co., Ltd.": {
        "summary": "Built React and Vue applications with a focus on search "
        "visibility, faster rendering, and clearer product "
        "interactions.",
        "highlights": [
            "Delivered high-performance interfaces in React, Vue, and TypeScript.",
            "Improved SEO and load times through Next.js SSR and GraphQL-driven rendering.",
        ],
    },
    "DediProg": {
        "summary": "Maintained and modernized legacy front-end systems while improving runtime "
        "performance.",
        "highlights": [
            "Updated older jQuery-based workflows without disrupting existing product behavior."
        ],
    },
    "KozyGuru": {
        "summary": "Built the core property management workflow for Australian Airbnb listings.",
        "highlights": [
            "Shipped product-facing workflows for listing operations and day-to-day management."
        ],
    },
}


# Earlier versions of ``resume_content``. A row that still holds one of these was written by a
# previous sync, not by hand, so the next sync may replace it. Add the old value here whenever
# a resume-covered text field changes.
PREVIOUS_RESUME_PROJECT_TEXT = {
    "microsoft-form-recognizer-toolkit": {
        "summary": [
            "Contributor to Microsoft's open-source Form Recognizer Toolkit, supporting document intelligence tooling in a production-adjacent open-source codebase."
        ]
    },
    "ai-web-generator": {
        "highlights": [
            [
                "Built a web app that turns a text prompt into a working website (single HTML, multi-file, or full Vue project), streams the code live over SSE, and lets users click any element in the preview to edit it.",
                "Gave the AI agent 6 file tools and built an 11-step LangGraph4j workflow that collects images, icons, diagrams, and logos in 4 parallel branches, then checks code quality and retries if needed.",
                "Added Redis chat memory, rate limiting (5 requests/min per user), Prometheus/Grafana monitoring, and 36 tests; deployed with Docker Compose and GitHub Actions."
            ]
        ]
    }
}

PREVIOUS_RESUME_EXPERIENCE_TEXT = {
    "Microsoft": {
        "highlights": [
            [
                "Built front-end features for Azure Form Recognizer Studio (renamed Azure AI Document Intelligence in 2023) with React, TypeScript, and Redux, including the document labeling UI used to train custom extraction models.",
                "Migrated Document Intelligence Studio features into Azure AI Studio (now Azure AI Foundry) as the two products merged.",
                "Built a front-end monorepo that combined Azure AI products from multiple departments, as the platform grew from OCR (Form Recognizer) to images and audio in Azure AI Studio.",
                "Introduced Redux Toolkit Query (RTK Query) for API caching and request deduplication, cutting repeated API calls and page loading time.",
                "Kept unit test coverage above 90% with Jest and React Testing Library, improving release stability.",
                "Used GitHub Copilot to speed up development of Form Recognizer document processing features.",
                "Set up a shared WSL2 Linux development environment for the team, cutting manual setup work.",
                "Built accessibility features so the product works for more users."
            ],
            [
                "Built front-end features for Azure Form Recognizer Studio with React, TypeScript, and Redux, including the document labeling UI used to train custom extraction models.",
                "Migrated Form Recognizer Studio features into Azure AI Foundry as the two products merged.",
                "Built a front-end monorepo that combined Azure AI products from multiple departments, as the platform grew from OCR to images and audio in Azure AI Foundry.",
                "Introduced RTK Query for API caching and request deduplication, cutting repeated API calls and page loading time.",
                "Kept unit test coverage above 90% with Jest and React Testing Library, improving release stability.",
                "Used GitHub Copilot to speed up development of Form Recognizer document processing features.",
                "Set up a shared WSL2 Linux development environment for the team, cutting manual setup work.",
                "Built accessibility features so the product works for more users."
            ]
        ]
    },
    "Gold Crown Technology Co., Ltd.": {
        "highlights": [
            [
                "Built web apps with React, Vue, and TypeScript, with a focus on easy-to-use interfaces.",
                "Added server-side rendering with Next.js and GraphQL to improve SEO and page load times."
            ]
        ]
    },
    "KozyGuru": {
        "highlights": [
            [
                "Built the core property management platform for Australian Airbnb listings."
            ]
        ]
    }
}
