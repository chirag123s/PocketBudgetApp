import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '@/constants/theme';

// Avatar Color Presets
export const avatarColors = [
  { id: 'blue', name: 'Ocean Blue', gradient: [theme.colors.info.main, theme.colors.info.dark] },
  { id: 'green', name: 'Forest Green', gradient: ['#10B981', '#059669'] },
  { id: 'purple', name: 'Purple Sunset', gradient: ['#8B5CF6', '#7C3AED'] },
  { id: 'coral', name: 'Warm Coral', gradient: ['#FF6B6B', '#EE5A52'] },
  { id: 'gold', name: 'Golden Hour', gradient: ['#F59E0B', '#D97706'] },
  { id: 'teal', name: 'Teal Wave', gradient: ['#14B8A6', '#0D9488'] },
  { id: 'pink', name: 'Rose Pink', gradient: ['#EC4899', '#DB2777'] },
  { id: 'indigo', name: 'Deep Indigo', gradient: ['#6366F1', '#4F46E5'] },
];

// Get avatar gradient colors based on saved preference
export const getAvatarGradient = async (): Promise<string[]> => {
  try {
    const savedColor = await AsyncStorage.getItem('avatarColor');
    if (savedColor) {
      const color = avatarColors.find(c => c.id === savedColor);
      return color ? color.gradient : avatarColors[0].gradient;
    }
    return avatarColors[0].gradient; // Default to blue
  } catch (error) {
    console.log('Error loading avatar color:', error);
    return avatarColors[0].gradient;
  }
};

// Get avatar gradient synchronously (for use with useState)
export const getAvatarGradientSync = (colorId: string): string[] => {
  const color = avatarColors.find(c => c.id === colorId);
  return color ? color.gradient : avatarColors[0].gradient;
};

// Save avatar color
export const saveAvatarColor = async (colorId: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('avatarColor', colorId);
  } catch (error) {
    console.log('Error saving avatar color:', error);
  }
};

// Load avatar color
export const loadAvatarColor = async (): Promise<string> => {
  try {
    const savedColor = await AsyncStorage.getItem('avatarColor');
    return savedColor || 'blue';
  } catch (error) {
    console.log('Error loading avatar color:', error);
    return 'blue';
  }
};
