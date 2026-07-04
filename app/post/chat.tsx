"use client"

interface ViewUserChatProps {
  UserName: string;
}

const ViewUserChat = ({ UserName }: ViewUserChatProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-3xl">
        🤖
      </div>
      <h1 className="text-2xl font-semibold text-white mb-2">
        Hi, {UserName}!
      </h1>
      <p className="text-white/40 text-sm max-w-xs">
        Mau nanya apa nih soal aku? Tulis aja di bawah, aku siap jawab.
      </p>
    </div>
  );
};

export default ViewUserChat;