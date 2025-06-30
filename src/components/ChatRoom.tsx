import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import UserProfile from "./UserProfile";
import { Button } from "@/components/ui/button";
import { LogOut, Users, Settings, Search, Hash, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id: string;
  message: string;
  username: string;
  timestamp: Date;
}

interface ChatRoomProps {
  username: string;
  onLeaveChat: () => void;
}

const ChatRoom = ({ username, onLeaveChat }: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers] = useState<string[]>([username, "CyberAlex", "QuantumBob", "NeoCharlie", "DigitalEve"]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Simulate some initial messages
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: "1",
        message: "🚀 Welcome to the quantum chat dimension!",
        username: "System",
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: "2", 
        message: "The neural networks are buzzing today! How's everyone doing?",
        username: "CyberAlex",
        timestamp: new Date(Date.now() - 120000)
      },
      {
        id: "3",
        message: "Just finished debugging my AI assistant. The future is here! 🤖",
        username: "QuantumBob", 
        timestamp: new Date(Date.now() - 60000)
      }
    ];
    setMessages(initialMessages);

    // Add join message
    const joinMessage: Message = {
      id: Date.now().toString(),
      message: `${username} has entered the digital realm ✨`,
      username: "System",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, joinMessage]);
  }, [username]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate typing indicators
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const randomUser = onlineUsers[Math.floor(Math.random() * (onlineUsers.length - 1)) + 1];
        setTypingUsers([randomUser]);
        setTimeout(() => setTypingUsers([]), 2000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [onlineUsers]);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      message,
      username: user?.displayName || username,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate occasional responses from other users
    if (Math.random() > 0.6) {
      setTimeout(() => {
        const responses = [
          "That's some next-level thinking! 🧠",
          "Absolutely fascinating perspective!",
          "The algorithms agree with you! ✨",
          "Your neural pathways are firing perfectly!",
          "Quantum entanglement detected! 🔬",
          "Processing... that's brilliant! 💎"
        ];
        const randomUser = onlineUsers[Math.floor(Math.random() * (onlineUsers.length - 1)) + 1];
        const response: Message = {
          id: (Date.now() + 1).toString(),
          message: responses[Math.floor(Math.random() * responses.length)],
          username: randomUser,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 1000 + Math.random() * 3000);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen backdrop-blur-lg bg-black/20">
        {/* Enhanced Header with User Profile */}
        <div className="flex items-center justify-between p-4 backdrop-blur-lg bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Hash className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Quantum Chat
              </h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">{onlineUsers.length} connected</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowProfile(true)}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <User className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLeaveChat}
              className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </div>

        {/* Messages Area with Scrolling Background */}
        <div className="flex-1 overflow-y-auto relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_50%)] animate-pulse"></div>
          <div className="relative z-10">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.message}
                username={msg.username}
                timestamp={msg.timestamp}
                isOwnMessage={msg.username === username}
              />
            ))}
            <TypingIndicator users={typingUsers} />
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Enhanced Message Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
      
      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default ChatRoom;
