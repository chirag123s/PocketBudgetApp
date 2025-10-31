# Settings Typography - Quick Reference

## Import
```typescript
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';
```

## Font Sizes (Quick Lookup)

```typescript
// HEADINGS
settingsTypography.pageHeading        // h2 (32px) - Page title
settingsTypography.sectionHeading     // lg (18px) - Section title
settingsTypography.subsectionHeading  // md (16px) - Subsection title

// BODY
settingsTypography.primary            // md (16px) - Main content
settingsTypography.secondary          // sm (12px) - Descriptions
settingsTypography.tertiary           // xs (10px) - Captions

// LIST ITEMS
settingsTypography.listItemTitle      // md (16px) - List row title
settingsTypography.listItemSubtitle   // sm (12px) - List row subtitle
settingsTypography.listItemValue      // md (16px) - List row value
settingsTypography.listItemCaption    // xs (10px) - List row caption

// FORM ELEMENTS
settingsTypography.input              // md (16px) - Input fields
settingsTypography.inputLabel         // sm (12px) - Field labels
settingsTypography.inputError         // xs (10px) - Error messages
settingsTypography.inputHint          // xs (10px) - Helper text

// CARDS
settingsTypography.cardTitle          // md (16px) - Card heading
settingsTypography.cardBody           // sm (12px) - Card content
settingsTypography.cardCaption        // xs (10px) - Card footer

// INTERACTIVE
settingsTypography.button             // md (16px) - Buttons
settingsTypography.link               // sm (12px) - Links
settingsTypography.chip               // sm (12px) - Chips/tags
settingsTypography.badge              // xs (10px) - Badges

// SPECIAL
settingsTypography.hero               // h1 (36px) - Hero text
settingsTypography.mega               // display (40px) - Extra large
settingsTypography.modalTitle         // xl (20px) - Modal titles
settingsTypography.avatarInitial      // lg (18px) - Avatar letters
```

## Font Weights

```typescript
settingsFontWeights.regular    // '400'
settingsFontWeights.medium     // '500'
settingsFontWeights.semibold   // '600'
settingsFontWeights.bold       // '700'
settingsFontWeights.extrabold  // '800'
```

## Preset Text Styles (Use These!)

```typescript
// Headings (size + weight combined)
settingsTextStyles.pageHeading         // 32px + bold
settingsTextStyles.sectionHeading      // 18px + bold
settingsTextStyles.subsectionHeading   // 16px + semibold

// Body
settingsTextStyles.primaryText         // 16px + medium
settingsTextStyles.secondaryText       // 12px + regular
settingsTextStyles.tertiaryText        // 10px + regular

// Interactive
settingsTextStyles.buttonText          // 16px + semibold
settingsTextStyles.linkText            // 12px + medium

// Forms
settingsTextStyles.inputText           // 16px + regular
settingsTextStyles.inputLabel          // 12px + medium
settingsTextStyles.inputError          // 10px + medium

// Lists
settingsTextStyles.listItemTitle       // 16px + semibold
settingsTextStyles.listItemSubtitle    // 12px + regular
settingsTextStyles.listItemValue       // 16px + medium

// Cards
settingsTextStyles.cardTitle           // 16px + semibold
settingsTextStyles.cardBody            // 12px + regular

// Special
settingsTextStyles.hero                // 36px + bold
settingsTextStyles.badge               // 10px + semibold
```

## Common Patterns

### Page Header
```typescript
<Text style={settingsTextStyles.pageHeading}>
  Edit Profile
</Text>
```

### Section Header
```typescript
<Text style={settingsTextStyles.sectionHeading}>
  Personal Information
</Text>
```

### List Item
```typescript
<View style={styles.listItem}>
  <View style={{ flex: 1 }}>
    <Text style={settingsTextStyles.listItemTitle}>
      Email
    </Text>
    <Text style={settingsTextStyles.listItemSubtitle}>
      alex@email.com
    </Text>
  </View>
  <Ionicons name="chevron-forward" size={20} />
</View>
```

### Card
```typescript
<View style={styles.card}>
  <Text style={settingsTextStyles.cardTitle}>
    Premium Plan
  </Text>
  <Text style={settingsTextStyles.cardBody}>
    Unlimited features
  </Text>
</View>
```

### Form Field
```typescript
<View>
  <Text style={{
    fontSize: settingsTypography.inputLabel,
    fontWeight: settingsFontWeights.medium,
    color: colors.neutralDark,
  }}>
    Full Name
  </Text>
  <TextInput
    style={{
      fontSize: settingsTypography.input,
      fontWeight: settingsFontWeights.regular,
    }}
  />
</View>
```

### Button
```typescript
<TouchableOpacity style={styles.button}>
  <Text style={settingsTextStyles.buttonText}>
    Save Changes
  </Text>
</TouchableOpacity>
```

### Combining with Colors
```typescript
<Text style={[
  settingsTextStyles.primaryText,
  { color: colors.functionalError }
]}>
  Error Text
</Text>
```

## Migration Cheat Sheet

| Old | New |
|-----|-----|
| `responsive.fontSize.h2` | `settingsTypography.pageHeading` |
| `responsive.fontSize.lg` | `settingsTypography.sectionHeading` |
| `responsive.fontSize.md` | `settingsTypography.primary` |
| `responsive.fontSize.sm` | `settingsTypography.secondary` |
| `responsive.fontSize.xs` | `settingsTypography.tertiary` |
| `fontWeight: '600'` | `fontWeight: settingsFontWeights.semibold` |
| `fontWeight: '700'` | `fontWeight: settingsFontWeights.bold` |

## Rules of Thumb

1. **Use presets first**: `settingsTextStyles.sectionHeading`
2. **Combine when needed**: `[settingsTextStyles.primaryText, { color: red }]`
3. **Never hardcode**: ❌ `fontSize: 16` ✅ `fontSize: settingsTypography.primary`
4. **Semantic names**: ✅ `listItemTitle` ❌ `fontSize16Bold`

## File Location
`app/settings/typography.ts`
