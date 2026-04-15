"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";

type ContactInquiryFormProps = {
  email: string;
};

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value.slice("mailto:".length) : value;
}

export function ContactInquiryForm({ email }: ContactInquiryFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = `${formData.get("name") ?? ""}`.trim();
    const sender = `${formData.get("sender") ?? ""}`.trim();
    const subject = `${formData.get("subject") ?? ""}`.trim();
    const message = `${formData.get("message") ?? ""}`.trim();

    const mailto = toMailto(email);
    const subjectLine = subject || `Portfolio inquiry from ${name || "website visitor"}`;
    const body = [
      `Name: ${name || "Not provided"}`,
      `Email: ${sender || "Not provided"}`,
      "",
      message || "No message provided.",
    ].join("\n");

    window.location.href = `mailto:${mailto}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="grid gap-8" onSubmit={handleSubmit}>
      <div className="grid gap-8 md:grid-cols-2">
        <label className="flex flex-col gap-3">
          <span className="eyebrow-label">Full name</span>
          <input className="field-input" name="name" placeholder="Jane Doe" type="text" />
        </label>
        <label className="flex flex-col gap-3">
          <span className="eyebrow-label">Email address</span>
          <input className="field-input" name="sender" placeholder="jane@example.com" type="email" />
        </label>
      </div>

      <label className="flex flex-col gap-3">
        <span className="eyebrow-label">Subject</span>
        <input className="field-input" name="subject" placeholder="How can I help?" type="text" />
      </label>

      <label className="flex flex-col gap-3">
        <span className="eyebrow-label">Message</span>
        <textarea className="field-input min-h-32 resize-y" name="message" placeholder="Tell me about your project." />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Submitting opens your default mail client with the draft prefilled.</p>
        <Button size="lg" type="submit">
          Send inquiry
        </Button>
      </div>
    </form>
  );
}
