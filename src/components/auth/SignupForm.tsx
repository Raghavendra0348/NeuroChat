
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider, githubProvider, facebookProvider } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, Chrome, Github, Facebook, Sparkles, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SignupFormProps {
  onToggleMode: () => void;
}

const SignupForm = ({ onToggleMode }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const passwordStrength = {
    hasLength: formData.password.length >= 8,
    hasNumber: /\d/.test(formData.password),
    hasUpper: /[A-Z]/.test(formData.password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  };

  const isPasswordStrong = Object.values(passwordStrength).every(Boolean);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordStrong) {
      toast({
        title: "Weak Password",
        description: "Please meet all password requirements.",
        variant: "destructive",
      });
      return;
    }

    if (!passwordsMatch) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(user, { displayName: formData.name });
      
      toast({
        title: "Welcome to the Future!",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Signup Failed",
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
        description: `Successfully signed up with ${providerName}.`,
      });
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-green-400' : 'text-gray-400'}`}>
      {met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      <span>{text}</span>
    </div>
  );

  return (
    <Card className="w-full max-w-md backdrop-blur-2xl bg-white/5 dark:bg-black/20 border border-white/10 shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
          Join the Future
        </CardTitle>
        <CardDescription className="text-gray-300 dark:text-gray-400">
          Create your digital identity
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white dark:text-gray-200 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name..."
              required
              className="bg-white/10 dark:bg-black/20 border-white/20 text-white dark:text-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white dark:text-gray-200 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email..."
              required
              className="bg-white/10 dark:bg-black/20 border-white/20 text-white dark:text-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-400"
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
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a strong password..."
                required
                className="bg-white/10 dark:bg-black/20 border-white/20 text-white dark:text-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-400 pr-12"
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
            
            {formData.password && (
              <div className="space-y-1 p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-gray-300 font-medium">Password Requirements:</p>
                <PasswordRequirement met={passwordStrength.hasLength} text="At least 8 characters" />
                <PasswordRequirement met={passwordStrength.hasNumber} text="Contains a number" />
                <PasswordRequirement met={passwordStrength.hasUpper} text="Contains uppercase letter" />
                <PasswordRequirement met={passwordStrength.hasSpecial} text="Contains special character" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white dark:text-gray-200 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password..."
                required
                className={`bg-white/10 dark:bg-black/20 border-white/20 text-white dark:text-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-400 pr-12 ${
                  formData.confirmPassword && !passwordsMatch ? 'border-red-400' : ''
                }`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            {formData.confirmPassword && !passwordsMatch && (
              <p className="text-xs text-red-400">Passwords do not match</p>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={loading || !isPasswordStrong || !passwordsMatch}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Initialize Your Future"}
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
            Already have an account?{" "}
            <Button
              variant="link"
              onClick={onToggleMode}
              className="text-purple-400 hover:text-purple-300 p-0 h-auto font-semibold"
            >
              Sign in here
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
