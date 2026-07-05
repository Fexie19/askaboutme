"use client";

import { useRef } from "react";

interface ViewInputChatProps {
  onSend?: (message: string) => void;
  disabled?: boolean;
}

const ViewInputChat = ({ onSend, disabled = false }: ViewInputChatProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (disabled) return;

    const el = textareaRef.current;
    if (!el) return;

    const trimmed = el.value.trim();
    if (!trimmed) return;

    onSend?.(trimmed);
    el.value = "";
    el.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-3">
      <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus-within:border-white/20 transition-colors">
        <textarea
          ref={textareaRef}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything About Me..."
          rows={1}
          disabled={disabled}
          className="flex-1 bg-transparent resize-none outline-none text-white placeholder-white/40 py-2 max-h-[200px] leading-relaxed disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={disabled}
          className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-white/90 active:scale-95 transition-all disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 h-4 text-black"
          >
            <path
              d="M12 19V5M12 5L5 12M12 5L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ViewInputChat;