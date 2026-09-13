"use client";

import { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { PipDrawing } from "./pip";
import { ProfileChat } from "./profile-chat";

export function ChatLauncher() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  function show() {
    dialog.current?.showModal();
    setOpen(true);
  }
  function close() {
    dialog.current?.close();
  }
  return (
    <>
      <button
        ref={trigger}
        className="chat-launcher"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <PipDrawing />
        <span>Ask about me</span>
        <ArrowUpRight size={15} />
      </button>
      <dialog
        ref={dialog}
        className="chat-dialog"
        aria-label="Ask about Subramanian"
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="chat-dialog-inner">
          <div className="dialog-topline">
            <span>A LITTLE MORE ABOUT ME.</span>
            <button
              className="dialog-close"
              aria-label="Close chat"
              onClick={close}
            >
              <X size={21} />
            </button>
          </div>
          <ProfileChat />
        </div>
      </dialog>
    </>
  );
}
