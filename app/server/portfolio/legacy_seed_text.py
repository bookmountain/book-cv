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
