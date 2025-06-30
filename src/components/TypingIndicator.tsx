
interface TypingIndicatorProps {
  users: string[];
}

const TypingIndicator = ({ users }: TypingIndicatorProps) => {
  if (users.length === 0) return null;

  return (
    <div className="flex items-center gap-2 p-3 text-sm text-gray-400 animate-fade-in">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span>
        {users.length === 1 
          ? `${users[0]} is typing...` 
          : `${users.join(', ')} are typing...`
        }
      </span>
    </div>
  );
};

export default TypingIndicator;
