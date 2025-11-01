import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  customBackgroundColor: string | null;
  setCustomBackgroundColor: (color: string | null) => void;
  customCardColor: string | null;
  setCustomCardColor: (color: string | null) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  themeMode: 'system',
  setThemeMode: () => {},
  customBackgroundColor: null,
  setCustomBackgroundColor: () => {},
  customCardColor: null,
  setCustomCardColor: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme() as Theme;
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [customBackgroundColor, setCustomBackgroundColorState] = useState<string | null>(null);
  const [customCardColor, setCustomCardColorState] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Load saved theme preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const [savedTheme, savedBgColor, savedCardColor] = await Promise.all([
        AsyncStorage.getItem('themeMode'),
        AsyncStorage.getItem('customBackgroundColor'),
        AsyncStorage.getItem('customCardColor'),
      ]);

      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
        setThemeModeState(savedTheme as ThemeMode);
      }

      if (savedBgColor) {
        setCustomBackgroundColorState(savedBgColor);
      }

      if (savedCardColor) {
        setCustomCardColorState(savedCardColor);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsReady(true);
    }
  };

  // Computed theme based on mode
  const theme: Theme = themeMode === 'system'
    ? (systemTheme || 'light')
    : themeMode;

  // Update theme mode and persist to storage
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Update custom background color and persist to storage
  const setCustomBackgroundColor = async (color: string | null) => {
    try {
      if (color) {
        await AsyncStorage.setItem('customBackgroundColor', color);
      } else {
        await AsyncStorage.removeItem('customBackgroundColor');
      }
      setCustomBackgroundColorState(color);
    } catch (error) {
      console.error('Error saving custom background color:', error);
    }
  };

  // Update custom card color and persist to storage
  const setCustomCardColor = async (color: string | null) => {
    try {
      if (color) {
        await AsyncStorage.setItem('customCardColor', color);
      } else {
        await AsyncStorage.removeItem('customCardColor');
      }
      setCustomCardColorState(color);
    } catch (error) {
      console.error('Error saving custom card color:', error);
    }
  };

  // Don't render until theme is loaded
  if (!isReady) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, customBackgroundColor, setCustomBackgroundColor, customCardColor, setCustomCardColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
