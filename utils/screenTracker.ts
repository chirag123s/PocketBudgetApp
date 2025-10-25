/**
 * Screen Tracker Utility
 *
 * Use this to track screen renders and identify which screen is causing errors
 *
 * Usage in any screen component:
 *
 * import { useScreenTracker } from '@/utils/screenTracker';
 *
 * export default function MyScreen() {
 *   useScreenTracker('MyScreen');
 *   // rest of component
 * }
 */

import { useEffect } from 'react';

/**
 * Track when a screen component mounts and unmounts
 */
export function useScreenTracker(screenName: string) {
  useEffect(() => {
    console.log(`🟢 SCREEN MOUNTED: ${screenName}`);

    return () => {
      console.log(`🔴 SCREEN UNMOUNTED: ${screenName}`);
    };
  }, [screenName]);
}

/**
 * Log a screen render with additional data
 */
export function logScreenRender(screenName: string, data?: any) {
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log(`║  📱 SCREEN RENDER: ${screenName.padEnd(32)} ║`);
  console.log('╚═══════════════════════════════════════════════════════╝');

  if (data) {
    console.log('Data:', data);
  }

  console.log('');
}

/**
 * Log component lifecycle events
 */
export function logLifecycle(componentName: string, event: 'mount' | 'unmount' | 'update', data?: any) {
  const emoji = event === 'mount' ? '🟢' : event === 'unmount' ? '🔴' : '🔵';
  console.log(`${emoji} ${componentName} - ${event.toUpperCase()}`);

  if (data) {
    console.log('  └─', data);
  }
}

/**
 * Track prop changes that might cause re-renders
 */
export function usePropsTracker(componentName: string, props: any) {
  useEffect(() => {
    console.log(`🔍 ${componentName} props updated:`, props);
  }, [componentName, props]);
}

/**
 * Log errors at component level (useful for try-catch blocks)
 */
export function logComponentError(componentName: string, error: Error, context?: string) {
  console.error('╔═══════════════════════════════════════════════════════╗');
  console.error(`║  ❌ ERROR in ${componentName.padEnd(37)} ║`);
  console.error('╚═══════════════════════════════════════════════════════╝');

  if (context) {
    console.error('Context:', context);
  }

  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
  console.error('');
}
