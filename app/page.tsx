'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Post from "./post/page";

function PostWrapper({ username }: { username: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <Post username={username} />
    </div>
  );
};

export default function Home() {
  const [username, setUsername] = useState('');
  const [hasEntered, setHasEntered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || isExiting) return;

    setIsExiting(true);
    setTimeout(() => setHasEntered(true), 350); // samain sama duration transition di bawah
  };

  if (!hasEntered) {
    const showCard = mounted && !isExiting;

    return (
      <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden px-4">
        <form
          onSubmit={handleSubmit}
          className={`relative w-full max-w-sm rounded-3xl border border-white/10 bg-black p-8 transition-all duration-[350ms] ease-out motion-reduce:transition-none ${
            showCard
              ? 'opacity-100 scale-100 translate-y-0 blur-0'
              : 'opacity-0 scale-95 translate-y-3 blur-sm'
          }`}
        >
          <div className="flex flex-col items-center text-center mb-7">
            <div
              className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-2xl transition-all duration-500 delay-150 ease-out motion-reduce:transition-none ${
                showCard ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            >
              <Image src="/fexie-icon.svg" width={52} height={52} alt="Fexie Icon" />
            </div>
            <span className="text-[11px] tracking-[0.25em] text-white/40 mb-2">
              FexieAI/AskAboutMe
            </span>
            <h2 className="text-2xl font-semibold text-white leading-snug">
              Panggilan kamu siapa?
            </h2>
          </div>

          <div
            className={`mb-5 rounded-xl border bg-black transition-colors duration-200 ${
              isFocused ? 'border-white/20' : 'border-white/10'
            }`}
          >
            <input
              type="text"
              required
              placeholder="Ketik nama kamu..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isExiting}
              className="w-full bg-transparent text-white placeholder-white/30 p-3.5 rounded-xl outline-none disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={!username.trim() || isExiting}
            className="group w-full bg-white text-black p-3.5 rounded-xl font-medium transition-all duration-200 hover:bg-white/90 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              Skuy Nanya
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>
        </form>
      </div>
    );
  }

  return <PostWrapper username={username} />;
}