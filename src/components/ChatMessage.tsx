
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Heart, Zap, Star } from "lucide-react";

interface ChatMessageProps {
  message: string;
  username: string;
  timestamp: Date;
  isOwnMessage?: boolean;
}

const ChatMessage = ({ message, username, timestamp, isOwnMessage = false }: ChatMessageProps) => {
  const [reactions, setReactions] = useState<{ [key: string]: number }>({});

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleReaction = (emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }));
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-cyan-400 to-blue-500',
      'from-purple-400 to-pink-500',
      'from-green-400 to-emerald-500',
      'from-orange-400 to-red-500',
      'from-indigo-400 to-purple-500',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className={`flex gap-3 p-4 group hover:bg-white/5 transition-all duration-200 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="w-10 h-10 flex-shrink-0 ring-2 ring-white/20">
        <AvatarFallback className={`text-white font-semibold bg-gradient-to-br ${getAvatarColor(username)}`}>
          {username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-sm font-medium ${isOwnMessage ? 'text-cyan-400' : 'text-purple-400'}`}>
            {isOwnMessage ? 'You' : username}
          </span>
          <span className="text-xs text-gray-500">
            {formatTime(timestamp)}
          </span>
        </div>
        
        <div className={`relative rounded-2xl px-4 py-3 backdrop-blur-sm border shadow-lg ${
          isOwnMessage 
            ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/30 text-white' 
            : 'bg-white/10 border-white/20 text-gray-100'
        }`}>
          {message}
          
          {/* Reaction buttons - appear on hover */}
          <div className="absolute -bottom-8 left-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button 
              onClick={() => handleReaction('❤️')}
              className="w-6 h-6 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110"
            >
              <Heart className="w-3 h-3 text-red-400" />
            </button>
            <button 
              onClick={() => handleReaction('⚡')}
              className="w-6 h-6 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110"
            >
              <Zap className="w-3 h-3 text-yellow-400" />
            </button>
            <button 
              onClick={() => handleReaction('⭐')}
              className="w-6 h-6 bg-blue-500/20 hover:bg-blue-500/40 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110"
            >
              <Star className="w-3 h-3 text-blue-400" />
            </button>
          </div>
        </div>
        
        {/* Show reactions */}
        {Object.keys(reactions).length > 0 && (
          <div className="flex gap-1 mt-1">
            {Object.entries(reactions).map(([emoji, count]) => (
              <span key={emoji} className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                {emoji === '❤️' && '❤️'}{emoji === '⚡' && '⚡'}{emoji === '⭐' && '⭐'} {count}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
