# Debugging Guide

This app includes comprehensive debugging tools to help identify and fix errors quickly.

## 🛡️ Error Boundary

The app is wrapped in a global Error Boundary that catches React errors and displays them in a user-friendly format.

### What it does:
- Catches all React component errors
- Displays error message, stack trace, and component stack
- Logs detailed error information to console
- Provides "Try Again" button to reset error state

### Error Display:
When an error occurs, you'll see:
- ⚠️ Error message
- Stack trace (scrollable)
- Component stack (shows which components were rendering)
- Console logs with detailed error information

### Console Output Format:
```
╔══════════════════════════════════════════════════════════╗
║                   ERROR CAUGHT                           ║
╚══════════════════════════════════════════════════════════╝

ERROR MESSAGE: java.lang.String cannot be cast to java.lang.Boolean

ERROR STACK: [full stack trace]

COMPONENT STACK: [component hierarchy]

═══════════════════════════════════════════════════════════
```

## 📍 Navigation Logging

The app logs every navigation change with detailed information.

### Console Output Format:
```
═══════════════════════════════════════════════════════════
📍 NAVIGATION: auth/login
   Auth: false | Guest: false | Loading: false
═══════════════════════════════════════════════════════════
```

### What it shows:
- **Current route** - The active screen path (e.g., `auth/login`, `tabs/budget`)
- **Auth state** - Whether user is authenticated
- **Guest mode** - Whether user is in guest mode
- **Loading state** - Whether auth is still loading

### Usage:
Navigation is logged automatically. Just watch the console when navigating between screens.

## 🔍 Screen Tracker

Track when specific screens mount and unmount to identify which screen is causing errors.

### Usage in screens:

```tsx
import { useScreenTracker } from '@/utils/screenTracker';

export default function MyScreen() {
  useScreenTracker('MyScreen');

  // Rest of component
  return <View>...</View>;
}
```

### Console Output:
```
🟢 SCREEN MOUNTED: LoginScreen
🔴 SCREEN UNMOUNTED: LoginScreen
```

### Already tracked screens:
- ✅ LoginScreen
- ✅ SignUpScreen

### Add to more screens:
To track additional screens, add the hook at the top of the component:

```tsx
export default function TransactionDetail() {
  useScreenTracker('TransactionDetail');
  // ...
}
```

## 🐛 Additional Debugging Utilities

### Log Screen Render
Log when a screen renders with custom data:

```tsx
import { logScreenRender } from '@/utils/screenTracker';

export default function MyScreen() {
  logScreenRender('MyScreen', { userId: 123, mode: 'edit' });
  // ...
}
```

### Log Component Lifecycle
Track component lifecycle events:

```tsx
import { logLifecycle } from '@/utils/screenTracker';

useEffect(() => {
  logLifecycle('MyComponent', 'mount');
  return () => logLifecycle('MyComponent', 'unmount');
}, []);
```

### Track Prop Changes
Monitor prop changes that might cause re-renders:

```tsx
import { usePropsTracker } from '@/utils/screenTracker';

export default function MyComponent(props) {
  usePropsTracker('MyComponent', props);
  // ...
}
```

### Log Component Errors
Log errors at component level (useful for try-catch blocks):

```tsx
import { logComponentError } from '@/utils/screenTracker';

try {
  // Some risky operation
} catch (error) {
  logComponentError('MyComponent', error, 'parsing user data');
}
```

## 🔧 Debugging the Android Error

### Current Error:
```
java.lang.String cannot be cast to java.lang.Boolean
```

### Debugging Steps:

1. **Watch the Navigation Logs**
   - See which screen is being navigated to when error occurs
   - Example: `📍 NAVIGATION: auth/login`

2. **Check Screen Mount Logs**
   - See which screen component is mounting
   - Example: `🟢 SCREEN MOUNTED: LoginScreen`

3. **View Error Boundary Details**
   - Error boundary will catch the error and show:
     - Exact error message
     - Stack trace showing where error occurred
     - Component stack showing which components were rendering

4. **Check Console Logs**
   - All three systems log to console:
     - Navigation changes
     - Screen mounts/unmounts
     - Full error details with stack traces

### Example Debugging Session:

```
═══════════════════════════════════════════════════════════
📍 NAVIGATION: auth/login
   Auth: false | Guest: false | Loading: false
═══════════════════════════════════════════════════════════

🟢 SCREEN MOUNTED: LoginScreen

╔══════════════════════════════════════════════════════════╗
║                   ERROR CAUGHT                           ║
╚══════════════════════════════════════════════════════════╝

ERROR MESSAGE: java.lang.String cannot be cast to java.lang.Boolean
ERROR STACK: at View.render (Button.tsx:76)
COMPONENT STACK:
    in Button
    in LoginScreen
    in Screen
```

From this, you can identify:
- ✅ Screen: LoginScreen
- ✅ Component: Button
- ✅ Line: Button.tsx:76

## 🎯 Quick Reference

| Feature | When to Use | Console Output |
|---------|-------------|----------------|
| Error Boundary | Automatic | `ERROR CAUGHT:` |
| Navigation Logging | Automatic | `📍 NAVIGATION:` |
| Screen Tracker | Add to screens | `🟢 SCREEN MOUNTED:` |
| Screen Render | Custom logging | `📱 SCREEN RENDER:` |
| Lifecycle | Track mount/unmount | `🟢/🔴/🔵` |
| Props Tracker | Debug re-renders | `🔍 props updated:` |
| Component Error | Try-catch blocks | `❌ ERROR in` |

## 📝 Best Practices

1. **Add screen tracker to all major screens**
   - Helps identify which screen causes errors
   - Minimal performance impact

2. **Check console logs first**
   - Navigation logs show where you are
   - Error boundary shows what went wrong

3. **Use component error logging in risky code**
   - Wrap API calls in try-catch with logging
   - Wrap data parsing in try-catch with logging

4. **Don't remove these tools in production**
   - Error boundary provides better UX than crashes
   - Logs can be filtered out in production builds

## 🚀 Next Steps

To add screen tracking to all screens:

```bash
# Add to all auth screens
app/auth/*.tsx

# Add to all tab screens
app/tabs/*.tsx

# Add to all transaction screens
app/transaction/*.tsx

# Add to all other screens
app/**/*.tsx
```

Just add this line at the top of each screen component:
```tsx
useScreenTracker('ScreenName');
```
