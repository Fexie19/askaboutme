'use client'

import { useState } from 'react';

const ViewUserInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    // Panggil fungsi submit/kirim kamu di sini, contoh:
    // handleSubmit(message);
    console.log("Pesan terkirim:", message);
    setMessage('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 overflow-hidden">
      <div className="relative flex items-end gap-2 bg-white/[0.04] border border-white/10 rounded-2xl shadow-[0_0_40px_-15px_rgba(255,255,255,0.1)] p-2.5 focus-within:border-white/30 transition-colors duration-200">
        <textarea
          maxLength={90}
          rows={1}
          placeholder="Ask anything about me"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              e.preventDefault();
            } else if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          className="w-full flex-1 max-h-32 p-1.5 pr-2 text-white placeholder-white/30 bg-transparent resize-none outline-none text-base"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!message.trim()}
          className="shrink-0 p-2 bg-white text-black rounded-xl hover:bg-white/90 active:scale-95 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-5 h-5 rotate-45"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between mt-2 px-1">
        <p className="text-xs text-white/30 tracking-wide">
          Peringatan. AI dapat membuat kesalahan.
        </p>
        <p className="text-xs text-white/30 tabular-nums">
          {message.length}/90
        </p>
      </div>
    </div>
  );
};

export default ViewUserInput;