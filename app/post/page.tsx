"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ViewUserInput from "../components/ViewInputChat";
import ViewUserChat, { Message } from "./chat";

const smoothEase = [0.22, 1, 0.36, 1] as const;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface PostProps {
  username: string;
}

const Post = ({ username }: PostProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const hasMessages = messages.length > 0;

  const handleSend = async (content: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    const assistantPlaceholder: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Mikir dulu...",
    };

    setMessages((prev) => [...prev, userMsg, assistantPlaceholder]);
    setLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, message: content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Terjadi kesalahan pada server.");
      }

      const answer = typeof data.answer === "string"
        ? data.answer
        : "Maaf, tidak ada jawaban dari backend.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholder.id
            ? { ...msg, content: answer }
            : msg
        )
      );
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "Gagal menghubungi backend.";
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholder.id
            ? { ...msg, content: `Error: ${messageText}` }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };
  
    return (
      <div
        className={`flex flex-col h-dvh bg-black overflow-hidden ${
          hasMessages ? "" : "items-center justify-center px-4"
        }`}
      >
        <div
          className={`w-full min-h-0 ${
            hasMessages ? "flex-1 overflow-y-auto chat-scroll" : ""
          }`}
        >
          <ViewUserChat UserName={username} messages={messages} />
        </div>
  
        <motion.div
          layout
          transition={{ duration: 0.5, ease: smoothEase }}
          className={`w-full shrink-0 ${hasMessages ? "border-t border-white/10" : ""}`}
        >
          <ViewUserInput onSend={handleSend} disabled={loading} />
        </motion.div>
      </div>
    );
  };

export default Post;