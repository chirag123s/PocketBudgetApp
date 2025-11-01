import { useTheme } from '@/contexts/ThemeContext';
import { getTheme } from '@/constants/theme';

/**
 * Hook to get the current theme with custom background color applied
 * This replaces direct usage of getTheme(themeMode) pattern
 */
export function useAppTheme() {
  const { theme: themeMode, customBackgroundColor } = useTheme();
  const theme = getTheme(themeMode, customBackgroundColor);

  return theme;
}
