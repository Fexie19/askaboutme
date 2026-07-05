"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ViewUserInput from "../components/ViewInputChat";
import ViewUserChat, { Message } from "./chat";

const smoothEase = [0.22, 1, 0.36, 1] as const;

interface PostProps {
  username: string;
}

const Post = ({ username }: PostProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const hasMessages = messages.length > 0;
  
    const handleSend = (content: string) => {
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMsg]);
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
          <ViewUserInput onSend={handleSend} />
        </motion.div>
      </div>
    );
  };

export default Post;