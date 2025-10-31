# Settings Typography Guide

## Overview

All settings screens use a unified typography system defined in `app/settings/typography.ts`. This ensures consistent font sizes, weights, and text styles across all settings screens.

## Quick Start

### Import the Typography

```typescript
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';
```

### Basic Usage

#### Option 1: Font Size Only
```typescript
<Text style={{ fontSize: settingsTypography.sectionHeading }}>
  Section Title
</Text>
```

#### Option 2: Complete Text Style (Recommended)
```typescript
<Text style={settingsTextStyles.sectionHeading}>
  Section Title
</Text>
```

#### Option 3: Custom Combination
```typescript
<Text style={{
  fontSize: settingsTypography.primary,
  fontWeight: settingsFontWeights.bold,
  color: colors.primary
}}>
  Custom Text
</Text>
```

## Typography Scale

### Headings

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| `pageHeading` | h2 (32px) | bold | Main page title at top of screen |
| `sectionHeading` | lg (18px) | bold | Major section dividers |
| `subsectionHeading` | md (16px) | semibold | Subsection titles within sections |

**Examples:**
```typescript
// Page title
<Text style={settingsTextStyles.pageHeading}>
  Edit Profile
</Text>

// Section title
<Text style={settingsTextStyles.sectionHeading}>
  Personal Information
</Text>

// Subsection title
<Text style={settingsTextStyles.subsectionHeading}>
  Contact Details
</Text>
```

### Body Text

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| `primary` | md (16px) | medium | Main content, list titles, button text |
| `secondary` | sm (12px) | regular | Descriptions, subtitles, helper text |
| `tertiary` | xs (10px) | regular | Captions, labels, footnotes |

**Examples:**
```typescript
// Primary text
<Text style={settingsTextStyles.primaryText}>
  Main content goes here
</Text>

// Secondary text
<Text style={settingsTextStyles.secondaryText}>
  Additional information or description
</Text>

// Tertiary text
<Text style={settingsTextStyles.tertiaryText}>
  Small caption or footnote
</Text>
```

### List Items

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| `listItemTitle` | md (16px) | semibold | Main text in list rows |
| `listItemSubtitle` | sm (12px) | regular | Secondary text in list rows |
| `listItemValue` | md (16px) | medium | Right-aligned values |
| `listItemCaption` | xs (10px) | regular | Small metadata text |

**Example:**
```typescript
<View style={styles.listItem}>
  <View style={styles.listItemLeft}>
    <Text style={settingsTextStyles.listItemTitle}>
      Notification
    </Text>
    <Text style={settingsTextStyles.listItemSubtitle}>
      Enable push notifications
    </Text>
  </View>
  <Text style={settingsTextStyles.listItemValue}>
    On
  </Text>
</View>
```

### Form Elements

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| `input` | md (16px) | regular | Text input fields |
| `inputLabel` | sm (12px) | medium | Form field labels |
| `inputPlaceholder` | base (14px) | regular | Placeholder text |
| `inputError` | xs (10px) | medium | Error messages |
| `inputHint` | xs (10px) | regular | Helper text below inputs |

**Example:**
```typescript
<View style={styles.formField}>
  <Text style={{
    fontSize: settingsTypography.inputLabel,
    fontWeight: settingsFontWeights.medium,
    color: colors.neutralDark,
  }}>
    Email Address
  </Text>
  <TextInput
    style={{
      fontSize: settingsTypography.input,
      fontWeight: settingsFontWeights.regular,
    }}
    placeholder="Enter your email"
    placeholderTextColor={colors.neutralMedium}
  />
  <Text style={{
    fontSize: settingsTypography.inputHint,
    color: colors.neutralMedium,
  }}>
    We'll never share your email
  </Text>
</View>
```

### Cards

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| `cardTitle` | md (16px) | semibold | Card heading |
| `cardBody` | sm (12px) | regular | Card content |
| `cardCaption` | xs (10px) | regular | Card footer/metadata |

**Example:**
```typescript
<View style={styles.card}>
  <Text style={settingsTextStyles.cardTitle}>
    Subscription Plan
  </Text>
  <Text style={settingsTextStyles.cardBody}>
    Enjoy unlimited features with Premium
  </Text>
  <Text style={settingsTextStyles.cardCaption}>
    Renews on Dec 31, 2025
  </Text>
</View>
```

### Interactive Elements

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| `button` | md (16px) | semibold | Button labels |
| `link` | sm (12px) | medium | Hyperlinks |
| `tab` | sm (12px) | medium | Tab labels |
| `chip` | sm (12px) | medium | Chip/tag labels |
| `badge` | xs (10px) | semibold | Small badges |

**Example:**
```typescript
// Button
<TouchableOpacity style={styles.button}>
  <Text style={settingsTextStyles.buttonText}>
    Save Changes
  </Text>
</TouchableOpacity>

// Link
<TouchableOpacity>
  <Text style={[settingsTextStyles.linkText, { color: colors.primary }]}>
    Learn More
  </Text>
</TouchableOpacity>

// Badge
<View style={styles.badge}>
  <Text style={{
    fontSize: settingsTypography.badge,
    fontWeight: settingsFontWeights.semibold,
    color: colors.neutralWhite,
  }}>
    NEW
  </Text>
</View>
```

### Special Elements

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| `hero` | h1 (36px) | bold | Large display text (profile name) |
| `mega` | display (40px) | bold | Extra large (subscription price) |
| `avatarInitial` | lg (18px) | semibold | Letter in avatar |
| `modalTitle` | xl (20px) | bold | Modal headings |
| `modalBody` | base (14px) | regular | Modal content |
| `alert` | sm (12px) | medium | Alert text |
| `timestamp` | xs (10px) | regular | Date/time |
| `version` | xs (10px) | regular | Version numbers |
| `copyright` | xs (10px) | regular | Legal text |

**Example:**
```typescript
// Hero text (profile screen)
<Text style={settingsTextStyles.hero}>
  Alex Johnson
</Text>

// Mega text (subscription screen)
<Text style={[settingsTextStyles.hero, { fontSize: settingsTypography.mega }]}>
  $6.99
</Text>

// Modal title
<Text style={{
  fontSize: settingsTypography.modalTitle,
  fontWeight: settingsFontWeights.bold,
}}>
  Confirm Action
</Text>

// Version
<Text style={{
  fontSize: settingsTypography.version,
  color: colors.neutralMedium,
}}>
  v1.0.0 (Build 42)
</Text>
```

## Migration Guide

### Before (Old Way)
```typescript
<Text style={{
  fontSize: responsive.fontSize.md,
  fontWeight: '600',
  color: colors.neutralDarkest,
}}>
  Section Title
</Text>
```

### After (New Way)
```typescript
<Text style={[
  settingsTextStyles.subsectionHeading,
  { color: colors.neutralDarkest }
]}>
  Section Title
</Text>
```

## Font Weights Reference

```typescript
settingsFontWeights.regular    // '400' - Body text
settingsFontWeights.medium     // '500' - Emphasized text
settingsFontWeights.semibold   // '600' - Subheadings
settingsFontWeights.bold       // '700' - Headings
settingsFontWeights.extrabold  // '800' - Hero text
```

## Best Practices

### ✅ DO

1. **Use semantic names**
   ```typescript
   // Good - semantic and clear
   <Text style={settingsTextStyles.listItemTitle}>Title</Text>
   ```

2. **Combine with color styles**
   ```typescript
   // Good - typography + color
   <Text style={[settingsTextStyles.primaryText, { color: colors.primary }]}>
     Text
   </Text>
   ```

3. **Use text style presets when possible**
   ```typescript
   // Good - use preset
   <Text style={settingsTextStyles.sectionHeading}>Section</Text>
   ```

4. **Override specific properties when needed**
   ```typescript
   // Good - override only what's needed
   <Text style={[settingsTextStyles.cardTitle, { color: colors.functionalError }]}>
     Error Card
   </Text>
   ```

### ❌ DON'T

1. **Don't hardcode font sizes**
   ```typescript
   // Bad - hardcoded
   <Text style={{ fontSize: 16 }}>Text</Text>

   // Good - use typography
   <Text style={{ fontSize: settingsTypography.primary }}>Text</Text>
   ```

2. **Don't use random font weights**
   ```typescript
   // Bad - random string
   <Text style={{ fontWeight: '650' }}>Text</Text>

   // Good - use defined weights
   <Text style={{ fontWeight: settingsFontWeights.semibold }}>Text</Text>
   ```

3. **Don't create custom sizes**
   ```typescript
   // Bad - custom size
   <Text style={{ fontSize: responsive.fontSize.md * 1.2 }}>Text</Text>

   // Good - use predefined size
   <Text style={{ fontSize: settingsTypography.subsectionHeading }}>Text</Text>
   ```

## Common Patterns

### Section with Title and Description
```typescript
<View style={styles.section}>
  <Text style={settingsTextStyles.sectionHeading}>
    Security Settings
  </Text>
  <Text style={[settingsTextStyles.secondaryText, { marginTop: 8 }]}>
    Manage your account security and privacy
  </Text>
</View>
```

### List Row with Title and Chevron
```typescript
<TouchableOpacity style={styles.listRow}>
  <Text style={settingsTextStyles.listItemTitle}>
    Change Password
  </Text>
  <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
</TouchableOpacity>
```

### Info Card
```typescript
<View style={styles.infoCard}>
  <Ionicons name="information-circle" size={24} color={colors.primary} />
  <View style={{ flex: 1 }}>
    <Text style={settingsTextStyles.cardTitle}>
      Did you know?
    </Text>
    <Text style={settingsTextStyles.cardBody}>
      You can export your data anytime from settings
    </Text>
  </View>
</View>
```

### Toggle Setting with Description
```typescript
<View style={styles.toggleRow}>
  <View style={{ flex: 1 }}>
    <Text style={settingsTextStyles.listItemTitle}>
      Enable Notifications
    </Text>
    <Text style={settingsTextStyles.listItemSubtitle}>
      Receive alerts about your spending
    </Text>
  </View>
  <Switch value={enabled} onValueChange={setEnabled} />
</View>
```

## Responsive Behavior

All typography automatically scales based on:

1. **Device size**: Smaller devices get slightly smaller text
2. **System font settings**: Respects user's accessibility settings (Large Text)
3. **Screen density**: Maintains visual consistency across different DPI screens

### Testing Different Font Scales

To test your settings screens with different system font sizes:

**iOS:**
Settings → Display & Brightness → Text Size

**Android:**
Settings → Display → Font size

Your text should remain readable and layouts should not break at these scales:
- Normal (1.0x)
- Large (1.3x)
- Extra Large (1.5x)
- Largest (2.0x)

## TypeScript Support

The typography file includes full TypeScript support:

```typescript
import type { SettingsTypography, SettingsFontWeight, SettingsTextStyle } from './typography';

// Type-safe access to typography values
const fontSize: SettingsTypography[keyof SettingsTypography] = settingsTypography.primary;

// Type-safe font weights
const weight: SettingsFontWeight[keyof SettingsFontWeight] = settingsFontWeights.bold;
```

## Summary

- ✅ Import from `./typography` in all settings screens
- ✅ Use semantic names (`sectionHeading`, not `fontSize18`)
- ✅ Prefer text style presets (`settingsTextStyles`) for common patterns
- ✅ Use individual typography values (`settingsTypography`) for custom styling
- ✅ Combine with colors and other styles using array syntax
- ✅ Test with different system font sizes for accessibility
- ❌ Never hardcode font sizes or weights

## Questions?

If you need a new typography style that doesn't exist:
1. Check if an existing style can work
2. If not, add it to `typography.ts` with a semantic name
3. Update this guide with examples
4. Share with the team so everyone uses it
