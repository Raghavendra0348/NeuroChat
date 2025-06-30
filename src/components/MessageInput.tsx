
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile, Paperclip } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSendMessage, disabled = false }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="p-4 backdrop-blur-lg bg-white/5 border-t border-white/10">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon"
            className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon"
            className="text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 transition-all duration-200"
          >
            <Smile className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your quantum message..."
            disabled={disabled}
            maxLength={500}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm pr-12"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
            {message.length}/500
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          size="icon"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
