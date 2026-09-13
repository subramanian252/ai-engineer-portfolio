"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  CornerDownLeft,
  Plus,
  RotateCcw,
  Square,
} from "lucide-react";
import { suggestedQuestions } from "@/content/knowledge";
import type { ChatMessage } from "@/lib/profile-answers";

type Message = ChatMessage & { sources?: string[]; notice?: string };

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
        signal: controller.signal,
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
          err instanceof Error
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
    <section id="ask" className="profile-chat" aria-labelledby="chat-title">
      <header className="chat-header">
        <div className="chat-identity">
          <span className="avatar-monogram">
            s<span>m</span>
          </span>
          <div>
            <h2 id="chat-title">
              Ask about me<span>.</span>
            </h2>
            <p>Subramanian’s portfolio assistant</p>
          </div>
        </div>
        <button
          className="icon-button reset-chat"
          type="button"
          onClick={reset}
          disabled={busy}
          aria-label="New conversation"
        >
          <RotateCcw size={16} />
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
            <div className="chat-symbol" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="chat-welcome-title">
              The résumé is a start.
              <br />
              <span>What else are you curious about?</span>
            </p>
            <p className="chat-welcome-copy">
              Explore my skills, experience and the path
              <br className="desktop-break" /> that brought me to AI
              engineering.
            </p>
            <div className="chat-suggestions">
              {suggestedQuestions.map((question) => (
                <button
                  type="button"
                  key={question}
                  onClick={() => void send(question)}
                >
                  {question}
                  <ArrowUpRight size={13} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, i) => (
            <div className={`chat-message message-${message.role}`} key={i}>
              {message.role === "assistant" && (
                <span className="message-author">
                  <span className="mini-square" /> PORTFOLIO ASSISTANT
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
            <span />
            <span />
            <span />
            <p>Finding an answer…</p>
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
          placeholder="What would you like to know?"
          maxLength={2000}
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
            <Square size={13} fill="currentColor" />
          </button>
        ) : (
          <button
            className="send-button"
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <ArrowUp size={19} />
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
          <CornerDownLeft size={11} /> to send
        </span>
      </footer>
      <div className="chat-corner corner-one" aria-hidden="true">
        <Plus size={13} />
      </div>
      <div className="chat-corner corner-two" aria-hidden="true">
        <Plus size={13} />
      </div>
    </section>
  );
}
