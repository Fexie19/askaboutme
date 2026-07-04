import ViewUserInput from "../components/ViewInputChat";
import ViewUserChat from "./chat";

interface PostProps {
  username: string;
}

const Post = ({ username }: PostProps) => {
  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <ViewUserChat UserName={username} />
      </div>
      <div className="w-full border-t border-white/10">
        <ViewUserInput />
      </div>
    </div>
  );
};

export default Post;