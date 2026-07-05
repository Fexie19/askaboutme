"use client";

import { AnimatePresence, motion } from "framer-motion";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ViewUserChatProps {
  UserName: string;
  messages: Message[];
}

const smoothEase = [0.22, 1, 0.36, 1] as const;

const ViewUserChat = ({ UserName, messages }: ViewUserChatProps) => {
  return (
    <AnimatePresence mode="wait">
      {messages.length === 0 ? (
        <motion.div
          key="greeting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center h-full text-center px-6"
        >
          {/* <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-3xl">
            🤖
          </div> */}
          <h1 className="text-3xl font-semibold text-white mb-2">
            Hi {UserName}!!
          </h1>
          <p className="text-white/60 text-sm max-w-xs">
            Mau nanya apa nih soal aku atau dafa? Tulis aja di bawah, aku siap jawab.
          </p>
          <p className="text-white/40 text-xs max-w-xs mt-4 absolute bottom-62">
            Fexie AI merepresentasikan diriku. Invitation atau ajakan yang kalian berikan, akan diteruskan kepadaku.
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="messages"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col gap-4 pl-4 pr-6 sm:pr-8 py-6 max-w-2xl mx-auto"
        >
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                ease: smoothEase,
                delay: i === messages.length - 1 ? 0.1 : 0,
              }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className={
                `rounded-3xl px-4 py-3 text-sm leading-relaxed text-white ${
                  msg.role === "user"
                    ? "max-w-[75%] bg-white/10"
                    : "w-full"
                }`
              }>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewUserChat;
