"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/domain";

const initial: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Ask a question. Responses are mocked on Day 2.",
  },
];

export function AssistantChat() {
  const [messages, setMessages] = useState(initial);
  const [draft, setDraft] = useState("");

  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", content: question },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Demo answer only. On Day 17, Core will stream the AI response.",
        sources: [
          {
            documentId: "DEMO-DOC-1",
            documentName: "Sample policy (mock citation)",
            page: 1,
          },
        ],
      },
    ]);
    setDraft("");
  }

  return (
    <section className="max-w-3xl rounded-lg border bg-white p-5">
      <div aria-live="polite" className="space-y-4">
        {messages.map((message) => (
          <article key={message.id} className="rounded bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase">{message.role}</p>
            <p className="mt-1 whitespace-pre-wrap">{message.content}</p>
            {message.sources?.map((source) => (
              <p key={source.documentId} className="mt-2 text-xs text-blue-700">
                Source: {source.documentName}, page {source.page}
              </p>
            ))}
          </article>
        ))}
      </div>

      <form onSubmit={send} className="mt-5 flex gap-2">
        <input
          aria-label="Message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="min-w-0 flex-1 rounded border p-2"
          placeholder="Ask about a policy..."
        />
        <button
          disabled={!draft.trim()}
          className="rounded bg-blue-700 px-4 text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </section>
  );
}
