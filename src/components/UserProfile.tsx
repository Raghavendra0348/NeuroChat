
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LogOut, Settings, User, Mail, Calendar, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile = ({ onClose }: UserProfileProps) => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setLoading(false);
  };

  const getProviderInfo = () => {
    if (!user?.providerData?.length) return { provider: 'Email', color: 'bg-blue-500' };
    
    const provider = user.providerData[0].providerId;
    switch (provider) {
      case 'google.com':
        return { provider: 'Google', color: 'bg-red-500' };
      case 'github.com':
        return { provider: 'GitHub', color: 'bg-gray-800' };
      case 'facebook.com':
        return { provider: 'Facebook', color: 'bg-blue-600' };
      default:
        return { provider: 'Email', color: 'bg-blue-500' };
    }
  };

  const { provider, color } = getProviderInfo();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <Avatar className="w-20 h-20 mx-auto ring-4 ring-white/20">
            <AvatarImage src={user?.photoURL || undefined} />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-cyan-400 to-purple-500 text-white">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl text-white">
              {user?.displayName || 'Anonymous User'}
            </CardTitle>
            <CardDescription className="text-gray-300">
              Digital Identity Profile
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <Mail className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{user?.email || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <Shield className="w-5 h-5 text-purple-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Login Method</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${color} text-white text-xs`}>
                    {provider}
                  </Badge>
                  {user?.emailVerified && (
                    <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <Calendar className="w-5 h-5 text-pink-400" />
              <div>
                <p className="text-sm text-gray-400">Member Since</p>
                <p className="text-white">
                  {user?.metadata?.creationTime ? 
                    new Date(user.metadata.creationTime).toLocaleDateString() : 
                    'Unknown'
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={loading}
              className="flex-1 bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {loading ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
          
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-gray-400 hover:text-white hover:bg-white/10"
          >
            Close Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
