"use client";

import type { FormEvent } from "react";

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
    const message = `${formData.get("message") ?? ""}`.trim();

    const mailto = toMailto(email);
    const subjectLine = `Portfolio inquiry from ${name || "website visitor"}`;
    const body = [
      `Name: ${name || "Not provided"}`,
      `Email: ${sender || "Not provided"}`,
      "",
      message || "No message provided.",
    ].join("\n");

    window.location.href = `mailto:${mailto}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
      <input
        className="field-input"
        name="name"
        placeholder="Name"
        required
        style={{ borderRadius: 6, padding: "12px 14px", background: "#0e0e0e" }}
        type="text"
      />
      <input
        className="field-input"
        name="sender"
        placeholder="Email"
        required
        style={{ borderRadius: 6, padding: "12px 14px", background: "#0e0e0e" }}
        type="email"
      />
      <textarea
        className="field-input"
        name="message"
        placeholder="Message"
        required
        rows={5}
        style={{ borderRadius: 6, padding: "12px 14px", background: "#0e0e0e", resize: "vertical" }}
      />
      <button className="btn btn-primary" style={{ justifySelf: "start" }} type="submit">
        Send message
      </button>
    </form>
  );
}
