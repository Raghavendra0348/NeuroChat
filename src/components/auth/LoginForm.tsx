
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider, facebookProvider } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, Chrome, Github, Facebook, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onToggleMode: () => void;
}

const LoginForm = ({ onToggleMode }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to your account.",
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleSocialLogin = async (provider: any, providerName: string) => {
    setLoading(true);
    
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Welcome!",
        description: `Successfully logged in with ${providerName}.`,
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md backdrop-blur-2xl bg-white/5 dark:bg-black/20 border border-white/10 shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-gray-300 dark:text-gray-400">
          Enter the quantum realm of conversations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white dark:text-gray-200 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="bg-white/10 dark:bg-black/20 border-white/20 text-white dark:text-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white dark:text-gray-200 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
                required
                className="bg-white/10 dark:bg-black/20 border-white/20 text-white dark:text-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-400 pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            {loading ? "Logging in..." : "Enter the Matrix"}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-gray-400">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin(googleProvider, 'Google')}
            disabled={loading}
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-200"
          >
            <Chrome className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin(githubProvider, 'GitHub')}
            disabled={loading}
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-200"
          >
            <Github className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin(facebookProvider, 'Facebook')}
            disabled={loading}
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-200"
          >
            <Facebook className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Button
              variant="link"
              onClick={onToggleMode}
              className="text-cyan-400 hover:text-cyan-300 p-0 h-auto font-semibold"
            >
              Create one now
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
