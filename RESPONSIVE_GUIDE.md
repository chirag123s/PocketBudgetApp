# Responsive Design Guide

## Overview

This guide explains how to use the responsive utilities in `constants/responsive.ts` to create layouts that work consistently across all screen sizes (phone, tablet, desktop).

---

## The Problem We're Solving

**Before (Fixed Values):**
```typescript
const styles = StyleSheet.create({
  title: {
    fontSize: 32,  // ❌ Too big on small phones, too small on tablets
    marginBottom: 24,  // ❌ Same spacing everywhere
  },
  icon: {
    width: 48,  // ❌ Gets cut off on small screens
    height: 48,
  },
});
```

**After (Responsive Values):**
```typescript
import { theme } from '@/constants/theme';

const styles = StyleSheet.create({
  title: {
    fontSize: theme.responsive.fontSize.h1,  // ✅ Auto-scales: 32px → 40px → 48px
    marginBottom: theme.responsive.spacing.lg,  // ✅ Scales proportionally
  },
  icon: {
    width: theme.responsive.iconSize.large,  // ✅ Scales with screen
    height: theme.responsive.iconSize.large,
  },
});
```

---

## Available Utilities

### 1. **Scaling Functions**

Use these to scale individual values:

```typescript
import { scale, verticalScale, moderateScale } from '@/constants/responsive';

// scale() - Based on WIDTH (best for fonts, horizontal spacing)
fontSize: scale(16)  // 16px on base, ~21px tablet, ~32px desktop

// verticalScale() - Based on HEIGHT (best for vertical spacing, heights)
marginTop: verticalScale(20)  // Scales with screen height

// moderateScale() - Less aggressive (best for general sizing)
padding: moderateScale(10)  // Scales 50% as much (adjustable)
```

### 2. **Percentage Dimensions**

Use these for flexible widths/heights:

```typescript
import { wp, hp } from '@/constants/responsive';

// wp = Width Percentage
width: wp(90)  // 90% of screen width
width: wp(50)  // 50% of screen width

// hp = Height Percentage
height: hp(30)  // 30% of screen height
minHeight: hp(20)  // 20% of screen height
```

### 3. **Pre-defined Font Sizes**

Use these instead of fixed font sizes:

```typescript
import { theme } from '@/constants/theme';

const styles = StyleSheet.create({
  // Headings
  h1: { fontSize: theme.responsive.fontSize.h1 },  // 32-48px
  h2: { fontSize: theme.responsive.fontSize.h2 },  // 28-40px
  h3: { fontSize: theme.responsive.fontSize.h3 },  // 24-32px
  h4: { fontSize: theme.responsive.fontSize.h4 },  // 20-28px

  // Body text
  large: { fontSize: theme.responsive.fontSize.large },       // 18-24px
  body: { fontSize: theme.responsive.fontSize.body },         // 16-20px
  bodySmall: { fontSize: theme.responsive.fontSize.bodySmall }, // 14-18px

  // UI
  button: { fontSize: theme.responsive.fontSize.button },   // 16-20px
  label: { fontSize: theme.responsive.fontSize.label },     // 14-18px
  caption: { fontSize: theme.responsive.fontSize.caption }, // 12-16px
});
```

### 4. **Pre-defined Spacing**

Use these for consistent spacing:

```typescript
import { theme } from '@/constants/theme';

const styles = StyleSheet.create({
  container: {
    padding: theme.responsive.spacing.md,     // ~16-24px
    marginTop: theme.responsive.spacing.lg,   // ~24-32px
    gap: theme.responsive.spacing.sm,         // ~8-12px
  },
});

// Available spacing:
// xs: ~4-6px
// sm: ~8-12px
// md: ~16-24px
// lg: ~24-32px
// xl: ~32-40px
// xxl: ~48-60px
```

### 5. **Pre-defined Icon Sizes**

Use these for icons:

```typescript
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

// In component:
<Ionicons
  name="home"
  size={theme.responsive.iconSize.medium}  // Auto-scales
  color={theme.colors.primary[600]}
/>

// Available sizes:
// tiny: ~12px
// small: ~16px
// medium: ~24px
// large: ~32px
// xlarge: ~48px
// hero: ~64px
```

### 6. **Breakpoints for Conditional Rendering**

Use these to show/hide content or apply different styles:

```typescript
import { theme } from '@/constants/theme';

const { breakpoints } = theme.responsive;

// Conditional rendering
{breakpoints.phone && <MobileMenu />}
{breakpoints.tablet && <TabletLayout />}
{breakpoints.desktop && <DesktopSidebar />}

// Conditional styling
const styles = StyleSheet.create({
  container: {
    flexDirection: breakpoints.phone ? 'column' : 'row',
    padding: breakpoints.desktop ? 48 : 24,
  },
});

// Available breakpoints:
// breakpoints.isSmall - < 375px
// breakpoints.isMedium - 375-768px
// breakpoints.isLarge - 768-1024px
// breakpoints.isXLarge - >= 1024px
// breakpoints.phone - < 768px
// breakpoints.tablet - 768-1024px
// breakpoints.desktop - >= 1024px
```

### 7. **Helper Functions**

Use these for common responsive patterns:

```typescript
import { theme } from '@/constants/theme';

const {
  getContainerWidth,
  getScreenPadding,
  getGridColumns,
  shouldCenterContent,
} = theme.responsive;

// Get appropriate container width
const styles = StyleSheet.create({
  container: {
    width: getContainerWidth(),  // Full width on mobile, max 1200px on desktop
    paddingHorizontal: getScreenPadding(),  // Adaptive padding
    alignSelf: shouldCenterContent() ? 'center' : 'stretch',
  },
});

// Get column count for grids
const numColumns = getGridColumns();  // 1 on phone, 2-4 on larger screens
```

---

## Common Patterns

### Pattern 1: Responsive Card

```typescript
import { StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

const styles = StyleSheet.create({
  card: {
    width: theme.responsive.wp(90),  // 90% width
    maxWidth: theme.responsive.maxWidth.card,  // Max 600px
    padding: theme.responsive.spacing.lg,  // Scales with screen
    borderRadius: theme.responsive.scale(16),  // Scales with screen
    marginBottom: theme.responsive.spacing.md,
  },
});
```

### Pattern 2: Responsive Typography

```typescript
const styles = StyleSheet.create({
  title: {
    fontSize: theme.responsive.fontSize.h1,
    marginBottom: theme.responsive.spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: theme.responsive.fontSize.body,
    lineHeight: theme.responsive.fontSize.body * 1.5,  // Proportional line height
    color: theme.colors.text.secondary,
  },
});
```

### Pattern 3: Responsive Icon Container

```typescript
const styles = StyleSheet.create({
  iconContainer: {
    width: theme.responsive.iconSize.large,
    height: theme.responsive.iconSize.large,
    borderRadius: theme.responsive.scale(12),
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### Pattern 4: Adaptive Layout (Column on Mobile, Row on Desktop)

```typescript
import { theme } from '@/constants/theme';

const { breakpoints } = theme.responsive;

const styles = StyleSheet.create({
  container: {
    flexDirection: breakpoints.phone ? 'column' : 'row',
    gap: breakpoints.phone
      ? theme.responsive.spacing.md
      : theme.responsive.spacing.xl,
    alignItems: breakpoints.phone ? 'stretch' : 'center',
  },
});
```

### Pattern 5: Responsive Button

```typescript
const styles = StyleSheet.create({
  button: {
    height: theme.responsive.buttonHeight.large,
    paddingHorizontal: theme.responsive.spacing.xl,
    borderRadius: theme.responsive.scale(12),
  },
  buttonText: {
    fontSize: theme.responsive.fontSize.button,
  },
});
```

---

## Before & After Example

### BEFORE (Fixed, Non-Responsive):

```typescript
import { StyleSheet, View, Text } from 'react-native';

const WelcomeScreen = () => (
  <View style={styles.container}>
    <View style={styles.hero}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>$</Text>
      </View>
    </View>
    <Text style={styles.title}>Budget the way you actually get paid</Text>
    <Text style={styles.subtitle}>Built for Australians</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,  // ❌ Same on all screens
  },
  hero: {
    marginTop: 32,
    marginBottom: 32,
  },
  iconCircle: {
    width: 192,  // ❌ Gets cut off on small phones
    height: 192,
    borderRadius: 24,
  },
  icon: {
    fontSize: 96,  // ❌ Too big on small screens
  },
  title: {
    fontSize: 32,  // ❌ Overlaps on small phones
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
  },
});
```

### AFTER (Responsive):

```typescript
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '@/constants/theme';

const WelcomeScreen = () => (
  <View style={styles.container}>
    <View style={styles.hero}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>$</Text>
      </View>
    </View>
    <Text style={styles.title}>Budget the way you actually get paid</Text>
    <Text style={styles.subtitle}>Built for Australians</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: theme.responsive.getScreenPadding(),  // ✅ Adaptive padding
  },
  hero: {
    marginTop: theme.responsive.spacing.xl,  // ✅ Scales
    marginBottom: theme.responsive.spacing.xl,
  },
  iconCircle: {
    width: theme.responsive.moderateScale(192),  // ✅ Scales down on small screens
    height: theme.responsive.moderateScale(192),
    borderRadius: theme.responsive.scale(24),
  },
  icon: {
    fontSize: theme.responsive.moderateScale(96),  // ✅ Scales appropriately
  },
  title: {
    fontSize: theme.responsive.fontSize.h1,  // ✅ Responsive font
    marginBottom: theme.responsive.spacing.sm,
  },
  subtitle: {
    fontSize: theme.responsive.fontSize.body,  // ✅ Responsive font
    marginBottom: theme.responsive.spacing.xxl,
  },
});
```

---

## Best Practices

### ✅ DO:

1. **Use pre-defined sizes when available:**
   ```typescript
   fontSize: theme.responsive.fontSize.h1  // ✅ Good
   ```

2. **Use spacing constants:**
   ```typescript
   padding: theme.responsive.spacing.md  // ✅ Good
   ```

3. **Use moderateScale() for most sizing:**
   ```typescript
   width: theme.responsive.moderateScale(200)  // ✅ Good - won't get too big
   ```

4. **Use percentages for flexible layouts:**
   ```typescript
   width: theme.responsive.wp(90)  // ✅ Good - adapts to screen
   ```

5. **Use breakpoints for different layouts:**
   ```typescript
   flexDirection: breakpoints.phone ? 'column' : 'row'  // ✅ Good
   ```

### ❌ DON'T:

1. **Don't use fixed font sizes:**
   ```typescript
   fontSize: 24  // ❌ Bad - won't scale
   ```

2. **Don't use fixed large dimensions:**
   ```typescript
   width: 300  // ❌ Bad - might be too big on small screens
   ```

3. **Don't use scale() for everything:**
   ```typescript
   width: theme.responsive.scale(200)  // ❌ Too aggressive - gets huge on tablets
   ```

4. **Don't forget max widths on web:**
   ```typescript
   // ❌ Bad - content stretches across entire 1920px screen
   width: '100%'

   // ✅ Good - constrains width
   width: theme.responsive.getContainerWidth()
   ```

---

## Migration Checklist

To make a screen responsive, replace:

- [ ] `fontSize: number` → `fontSize: theme.responsive.fontSize.xxx`
- [ ] `padding/margin: number` → `theme.responsive.spacing.xxx`
- [ ] Icon `size: number` → `theme.responsive.iconSize.xxx`
- [ ] Large `width/height: number` → `theme.responsive.moderateScale(number)`
- [ ] Fixed widths → `theme.responsive.wp(percentage)` or `maxWidth`
- [ ] Add breakpoint conditions for layout changes
- [ ] Test on phone (375px), tablet (768px), desktop (1024px+)

---

## Testing Different Screen Sizes

### In Browser (Web):
1. Open DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Test these sizes:
   - iPhone SE: 375×667 (small)
   - iPhone 12: 390×844 (medium)
   - iPad: 768×1024 (tablet)
   - Desktop: 1440×900 (desktop)

### Expected Behavior:
- **Text**: Should be readable at all sizes, no overlapping
- **Icons**: Should be clearly visible, not cut off
- **Spacing**: Should feel balanced, not cramped or too loose
- **Layout**: Should adapt (column on mobile, row on desktop)

---

## Quick Reference

```typescript
// Import
import { theme } from '@/constants/theme';

// Font sizes (auto-scaling with min/max)
theme.responsive.fontSize.h1     // 32-48px
theme.responsive.fontSize.body   // 16-20px

// Spacing (scales moderately)
theme.responsive.spacing.md      // ~16-24px
theme.responsive.spacing.xl      // ~32-40px

// Icon sizes
theme.responsive.iconSize.medium // ~24px

// Manual scaling
theme.responsive.scale(16)           // Width-based
theme.responsive.verticalScale(20)   // Height-based
theme.responsive.moderateScale(50)   // Moderate scaling

// Percentages
theme.responsive.wp(90)  // 90% width
theme.responsive.hp(50)  // 50% height

// Breakpoints
theme.responsive.breakpoints.phone   // < 768px
theme.responsive.breakpoints.tablet  // 768-1024px
theme.responsive.breakpoints.desktop // >= 1024px

// Helpers
theme.responsive.getContainerWidth()  // Max width with constraints
theme.responsive.getScreenPadding()   // Adaptive padding
```

---

This system ensures your app looks great on **all** devices! 🎨📱💻
