
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, MessageCircle } from "lucide-react";

interface UserSetupProps {
  onJoinChat: (username: string) => void;
}

const UserSetup = ({ onJoinChat }: UserSetupProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onJoinChat(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Join the Future Chat
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            Enter the quantum realm of conversations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="username" className="text-white font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Your Digital Identity
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your futuristic name..."
                maxLength={20}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/25" 
              disabled={!username.trim()}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Initialize Connection
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSetup;
