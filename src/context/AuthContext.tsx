import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  isAuthenticated: boolean;
  email: string | null;
  user: User | null;
  isLoading: boolean;
  profileCompleted: boolean;
  setAuthenticated: (email: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);

  useEffect(() => {
    // Fresh session policy: clear all persisted state on every page load
    // Exception: if this is an auth redirect (magic link callback)
    const isAuthRedirect = window.location.hash.includes('access_token') || 
                           window.location.search.includes('code=');
    
    const initSession = async () => {
      if (!isAuthRedirect) {
        // Clear any persisted session and storage for fresh start
        await supabase.auth.signOut();
        localStorage.removeItem('smart_bazaar_cart');
        localStorage.removeItem('smart_bazaar_cart_auth_pending');
        setUser(null);
        setEmail(null);
        setIsAuthenticated(false);
        setProfileCompleted(false);
        setIsLoading(false);
        return;
      }
      
      // Handle auth redirect - get the session
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          setEmail(session.user.email || null);
          setIsAuthenticated(true);
          
          // Check if profile is completed
          const { data: profile } = await supabase
            .from('customer_profiles')
            .select('profile_completed')
            .eq('user_id', session.user.id)
            .single();
          
          setProfileCompleted(profile?.profile_completed || false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setEmail(session.user.email || null);
        setIsAuthenticated(true);
        
        // Check if profile is completed
        const { data: profile } = await supabase
          .from('customer_profiles')
          .select('profile_completed')
          .eq('user_id', session.user.id)
          .single();
        
        setProfileCompleted(profile?.profile_completed || false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setEmail(null);
        setIsAuthenticated(false);
        setProfileCompleted(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const setAuthenticated = (userEmail: string) => {
    setEmail(userEmail);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setEmail(null);
    setIsAuthenticated(false);
    setProfileCompleted(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      email, 
      user, 
      isLoading, 
      profileCompleted, 
      setAuthenticated, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
