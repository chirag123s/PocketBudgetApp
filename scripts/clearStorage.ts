/**
 * Storage Clearing Utility
 *
 * This script helps clear AsyncStorage for testing authentication flows.
 * Useful for testing first-time user experience.
 *
 * Usage in app:
 * import { clearAllStorage } from '@/scripts/clearStorage';
 * await clearAllStorage();
 */

import { storage } from '@/utils/storage';

/**
 * Clear all authentication-related storage
 */
export async function clearAllStorage(): Promise<void> {
  try {
    console.log('🗑️ Clearing all storage...');

    await Promise.all([
      storage.deleteItem('authToken'),
      storage.deleteItem('guestMode'),
      storage.deleteItem('onboardingComplete'),
      // Add any other storage keys your app uses
    ]);

    console.log('✅ All storage cleared successfully');
    console.log('💡 App should now behave as first-time launch');
    console.log('💡 Please reload the app to see changes');
  } catch (error) {
    console.error('❌ Failed to clear storage:', error);
    throw error;
  }
}

/**
 * Clear only guest mode (useful for testing guest → authenticated flow)
 */
export async function clearGuestMode(): Promise<void> {
  try {
    console.log('🗑️ Clearing guest mode...');
    await storage.deleteItem('guestMode');
    console.log('✅ Guest mode cleared');
  } catch (error) {
    console.error('❌ Failed to clear guest mode:', error);
    throw error;
  }
}

/**
 * Clear only auth token (useful for testing logout)
 */
export async function clearAuthToken(): Promise<void> {
  try {
    console.log('🗑️ Clearing auth token...');
    await storage.deleteItem('authToken');
    console.log('✅ Auth token cleared');
  } catch (error) {
    console.error('❌ Failed to clear auth token:', error);
    throw error;
  }
}

/**
 * Check current storage state (for debugging)
 */
export async function checkStorageState(): Promise<void> {
  try {
    const [authToken, guestMode, onboardingComplete] = await Promise.all([
      storage.getItem('authToken'),
      storage.getItem('guestMode'),
      storage.getItem('onboardingComplete'),
    ]);

    console.log('═══════════════════════════════════════');
    console.log('📦 CURRENT STORAGE STATE:');
    console.log('   authToken:', authToken ? `${authToken.substring(0, 20)}...` : 'null');
    console.log('   guestMode:', guestMode);
    console.log('   onboardingComplete:', onboardingComplete);
    console.log('═══════════════════════════════════════');

    return {
      authToken: authToken || null,
      guestMode: guestMode || null,
      onboardingComplete: onboardingComplete || null,
    } as any;
  } catch (error) {
    console.error('❌ Failed to check storage state:', error);
    throw error;
  }
}
