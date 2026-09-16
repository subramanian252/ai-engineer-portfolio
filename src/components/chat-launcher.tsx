"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { X } from "lucide-react";

import { ScrollCompanion } from "./scroll-companion";
const ProfileChat = dynamic(
  () => import("./profile-chat").then((module) => module.ProfileChat),
  {
    loading: () => (
      <p className="chat-loading" role="status">
        Pip is opening the journal…
      </p>
    ),
  },
);

export function ChatLauncher() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const viewport = window.visualViewport;
    const panel = dialog.current;
    function fitViewport() {
      if (!viewport || !panel) return;
      panel.style.setProperty("--chat-viewport-height", viewport.height + "px");
      panel.style.setProperty(
        "--chat-keyboard-inset",
        Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop) +
          "px",
      );
    }
    fitViewport();
    viewport?.addEventListener("resize", fitViewport);
    viewport?.addEventListener("scroll", fitViewport);
    return () => {
      document.body.style.overflow = previous;
      viewport?.removeEventListener("resize", fitViewport);
      viewport?.removeEventListener("scroll", fitViewport);
      panel?.style.removeProperty("--chat-viewport-height");
      panel?.style.removeProperty("--chat-keyboard-inset");
    };
  }, [open]);
  function show() {
    setHasOpened(true);
    dialog.current?.showModal();
    setOpen(true);
  }
  function close() {
    dialog.current?.close();
  }
  return (
    <>
      <ScrollCompanion buttonRef={trigger} open={open} onOpen={show} />
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
            <span>✦ A NOTE FROM THE LITTLE LAB</span>
            <button
              className="dialog-close"
              aria-label="Close chat"
              onClick={close}
            >
              <X size={21} />
            </button>
          </div>
          {hasOpened && <ProfileChat />}
        </div>
      </dialog>
    </>
  );
}
