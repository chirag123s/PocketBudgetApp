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
      const [token, onboardingComplete, guestMode] = await Promise.all([
        storage.getItem('authToken'),
        storage.getItem('onboardingComplete'),
        storage.getItem('guestMode'),
      ]);

      if (guestMode === 'true') {
        setIsGuestMode(true);
        setHasCompletedOnboarding(true); // Guest mode skips onboarding
      } else if (token) {
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
          setHasCompletedOnboarding(true);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
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
