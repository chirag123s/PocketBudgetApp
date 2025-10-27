import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/models';
import { storage } from '@/utils/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isGuestMode: boolean;
  hasCompletedOnboarding: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
  enableGuestMode: () => Promise<void>;
  clearAllData: () => Promise<void>; // For testing/debugging
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check for stored auth token on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 AuthContext: Checking stored auth data...');
      const [token, onboardingComplete, guestMode] = await Promise.all([
        storage.getItem('authToken'),
        storage.getItem('onboardingComplete'),
        storage.getItem('guestMode'),
      ]);

      console.log('🔍 AuthContext: Retrieved data:', {
        token: token ? `${token.substring(0, 20)}...` : null,
        onboardingComplete,
        guestMode,
      });

      if (guestMode === 'true') {
        console.log('✅ AuthContext: Guest mode detected - setting up guest session');
        setIsGuestMode(true);
        setHasCompletedOnboarding(true); // Guest mode skips onboarding
      } else if (token) {
        console.log('✅ AuthContext: Auth token found - auto-logging in user');
        // Fetch user data with token
        // For now, create a mock user
        const mockUser: User = {
          id: '1',
          email: 'john@email.com',
          firstName: 'John',
          lastName: 'Smith',
          isPremium: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUser(mockUser);

        if (onboardingComplete === 'true') {
          console.log('✅ AuthContext: Onboarding complete - user is fully set up');
          setHasCompletedOnboarding(true);
        } else {
          console.log('⚠️ AuthContext: User needs to complete onboarding');
        }
      } else {
        console.log('ℹ️ AuthContext: No stored auth data - user needs to login');
      }
    } catch (error) {
      console.error('❌ AuthContext: Auth check failed:', error);
    } finally {
      console.log('✅ AuthContext: Auth check complete - setting isLoading to false');
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement actual API login
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Smith',
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await storage.setItem('authToken', 'mock-token-' + Date.now());
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        storage.deleteItem('authToken'),
        storage.deleteItem('onboardingComplete'),
        storage.deleteItem('guestMode'),
      ]);
      setUser(null);
      setIsGuestMode(false);
      setHasCompletedOnboarding(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const enableGuestMode = async () => {
    try {
      await storage.setItem('guestMode', 'true');
      setIsGuestMode(true);
      setHasCompletedOnboarding(true); // Guest mode skips onboarding
    } catch (error) {
      console.error('Enable guest mode error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // TODO: Implement actual API signup
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        firstName,
        lastName,
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await storage.setItem('authToken', 'mock-token-' + Date.now());
      setUser(mockUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const completeOnboarding = async () => {
    try {
      await storage.setItem('onboardingComplete', 'true');
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Complete onboarding error:', error);
      throw error;
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    try {
      if (!user) throw new Error('No user to update');
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      // TODO: Save to API
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const clearAllData = async () => {
    try {
      console.log('🗑️ AuthContext: Clearing all stored data...');
      await Promise.all([
        storage.deleteItem('authToken'),
        storage.deleteItem('onboardingComplete'),
        storage.deleteItem('guestMode'),
      ]);
      setUser(null);
      setIsGuestMode(false);
      setHasCompletedOnboarding(false);
      console.log('✅ AuthContext: All data cleared');
    } catch (error) {
      console.error('❌ Clear data error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isGuestMode,
        hasCompletedOnboarding,
        login,
        logout,
        signup,
        completeOnboarding,
        updateUser,
        enableGuestMode,
        clearAllData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
