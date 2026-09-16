"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CornerDownLeft,
  RotateCcw,
  Square,
  Send,
  Code2,
  Sprout,
  Clapperboard,
  Compass,
} from "lucide-react";
import { PipDrawing } from "./pip";
import { suggestedQuestions } from "@/content/knowledge";
import type { ChatMessage } from "@/lib/profile-answers";

type Message = ChatMessage & { sources?: string[]; notice?: string };
const questionIcons = [Sprout, Code2, Clapperboard, Compass];
const compactQuestions = [
  "His work",
  "Tech stack",
  "Background",
  "Opportunities",
];

export function ProfileChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"profile" | "ai">("profile");
  const log = useRef<HTMLDivElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const pending = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/chat", { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setMode(data.mode === "ai" ? "ai" : "profile"))
      .catch(() => {});
    return () => {
      controller.abort();
      pending.current?.abort();
    };
  }, []);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, busy]);

  async function send(question = input) {
    const text = question.trim();
    if (!text || busy) return;
    if (text.length > 2000) {
      setError("Keep your question under 2,000 characters.");
      return;
    }
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError("");
    const controller = new AbortController();
    pending.current = controller;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.any([
          controller.signal,
          AbortSignal.timeout(30_000),
        ]),
        body: JSON.stringify({
          messages: next
            .slice(-11)
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await response.json();
      if (!response.ok || typeof data.answer !== "string")
        throw new Error(
          data.error || "Couldn’t send that message. Please try again.",
        );
      setMode(data.mode);
      setMessages([
        ...next,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources,
          notice: data.notice,
        },
      ]);
    } catch (err) {
      if (!controller.signal.aborted)
        setError(
          err instanceof Error && err.name === "TimeoutError"
            ? "Pip took too long to reply. Please try your question again."
            : err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.",
        );
      setMessages(next.slice(0, -1));
      setInput(text);
    } finally {
      setBusy(false);
      pending.current = null;
    }
  }
  function reset() {
    if (busy) return;
    setMessages([]);
    setError("");
    setInput("");
    textarea.current?.focus();
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void send();
  }

  return (
    <section
      id="ask"
      className="profile-chat journal-chat"
      data-has-messages={messages.length > 0 || busy}
      aria-labelledby="chat-title"
    >
      <header className="chat-header">
        <div className="chat-identity">
          <span className="chat-pip-avatar">
            <PipDrawing />
          </span>
          <div>
            <h2 id="chat-title">
              <span className="chat-desktop-copy">Pip’s little help desk.</span>
              <span className="chat-mobile-copy">Ask Pip</span>
            </h2>
            <p>
              <span className="chat-desktop-copy">
                Your guide to Subramanian’s world
              </span>
              <span className="chat-mobile-copy">About Subramanian</span>
            </p>
          </div>
        </div>
        <button
          className="icon-button reset-chat"
          type="button"
          onClick={reset}
          disabled={busy}
          aria-label="New conversation"
          title="Start a fresh page"
        >
          <RotateCcw size={19} />
        </button>
      </header>
      <div
        className="chat-log"
        ref={log}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label="Conversation"
        tabIndex={0}
      >
        {!messages.length ? (
          <div className="chat-welcome">
            <p className="chat-mobile-copy chat-mobile-greeting">
              A little curious? Ask away.
            </p>
            <div className="welcome-note">
              <span className="welcome-scribble" aria-hidden="true">
                psst…
              </span>
              <p className="chat-welcome-title">
                Good questions.
                <br />
                <span>Lovely place to start.</span>
              </p>
              <span className="note-spark" aria-hidden="true">
                ✳
              </span>
            </div>
            <p className="chat-welcome-copy">
              I’m Pip, the little keeper of this journal. Ask me about
              Subramanian’s work, his tools, or how he got here.
            </p>
            <div className="chat-suggestions">
              {suggestedQuestions.map((question, index) => {
                const Icon = questionIcons[index];
                return (
                  <button
                    type="button"
                    key={question}
                    aria-label={question}
                    onClick={() => void send(question)}
                  >
                    <Icon size={20} />
                    <span className="chat-desktop-copy">{question}</span>
                    <span className="chat-mobile-copy">
                      {compactQuestions[index]}
                    </span>
                    <ArrowUpRight size={16} />
                  </button>
                );
              })}
            </div>
            <p className="chat-handnote">
              No question too curious. Go on, pick one. ↗
            </p>
          </div>
        ) : (
          messages.map((message, i) => (
            <div className={"chat-message message-" + message.role} key={i}>
              {message.role === "assistant" && (
                <span className="message-author">
                  <PipDrawing /> PIP · FROM THE JOURNAL
                </span>
              )}
              <p>{message.content}</p>
              {message.sources && (
                <span className="answer-source">
                  From {message.sources.join(" · ")}
                </span>
              )}
              {message.notice && (
                <span className="answer-notice">{message.notice}</span>
              )}
            </div>
          ))
        )}
        {busy && (
          <div className="thinking" role="status">
            <PipDrawing />
            <span />
            <span />
            <span />
            <p>Flipping through the journal…</p>
          </div>
        )}
      </div>
      {error && (
        <p className="chat-error" role="alert">
          {error}
        </p>
      )}
      <form className="chat-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="chat-question">
          Ask a question about Subramanian
        </label>
        <textarea
          id="chat-question"
          ref={textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="A little question…"
          maxLength={2000}
          readOnly={busy}
          rows={1}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing
            ) {
              e.preventDefault();
              void send();
            }
          }}
        />
        {busy ? (
          <button
            type="button"
            className="send-button"
            onClick={() => pending.current?.abort()}
            aria-label="Stop response"
          >
            <Square size={15} fill="currentColor" />
          </button>
        ) : (
          <button
            className="send-button"
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send size={21} />
          </button>
        )}
      </form>
      <footer className="chat-bottom">
        <span>
          <span className="connection-dot" />
          {mode === "ai"
            ? "AI · Résumé & profile"
            : "Profile answers · No live AI connected"}
        </span>
        <span className="enter-hint">
          <CornerDownLeft size={13} /> to send
        </span>
      </footer>
    </section>
  );
}
