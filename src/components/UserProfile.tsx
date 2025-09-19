import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Settings } from 'lucide-react';

export function UserProfile() {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full bg-slate-800/50 border border-white/20 hover:bg-slate-700/50 transition-all duration-300"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || 'User'} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-medium">
              {getInitials(currentUser.displayName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-900/95 backdrop-blur-xl border-white/20 shadow-2xl" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">
              {currentUser.displayName || 'User'}
            </p>
            <p className="text-xs leading-none text-blue-200/70">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem className="text-white hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer">
          <User className="mr-2 h-4 w-4 text-blue-300" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer">
          <Settings className="mr-2 h-4 w-4 text-blue-300" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={loading}
          className="text-red-300 hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{loading ? 'Signing out...' : 'Sign out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
