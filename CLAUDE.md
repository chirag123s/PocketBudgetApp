# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Server Management

**DO NOT start, run, or restart the development server.** The user will manage the server themselves.

- Do NOT use `npm start`, `npm run web`, `npx expo start`, or any server commands
- Do NOT use the Bash tool to start the dev server
- Do NOT kill or restart existing servers
- Focus only on reading, editing, and creating files
- The user will manually refresh the browser to see changes

## Development Commands

```bash
# Start the development server
npm start

# Run on specific platforms
npm run android  # Android emulator/device
npm run ios      # iOS simulator (macOS only)
npm run web      # Web browser

# Install dependencies
npm install

# Install Expo-compatible packages
npx expo install <package-name>
```

## Architecture Overview

### Design System Architecture

This app uses a **centralized theme system** located in `constants/`. All styling must reference this system to maintain consistency across the 50+ screens being built.

**Theme Structure:**
- `constants/theme.ts` - Main entry point that re-exports all design tokens
- `constants/colors.ts` - Color palette (primary green, semantic colors, transaction colors)
- `constants/typography.ts` - Font system with predefined text styles (h1-h4, body, button, etc.)
- `constants/spacing.ts` - 4px base unit spacing scale, border radius, layout constants

**Critical:** Always import from `@/constants/theme` to access the unified theme object:
```typescript
import { theme } from '@/constants/theme';

// Use theme properties
theme.colors.primary[500]
theme.typography.styles.h2
theme.spacing[4]
theme.shadows.base
```

### Component Architecture

Components are organized by purpose:

**UI Components (`components/ui/`):**
- Base reusable components (Button, Input, Card, ProgressBar, EmptyState)
- All components accept theme-compatible style props
- Use composition pattern with `children` and style overrides

**Layout Components (`components/layout/`):**
- `Screen.tsx` - Wrapper for all screens with SafeArea, KeyboardAvoidingView, ScrollView
- Always wrap screen content with `<Screen>` component

**Component Pattern Example:**
```typescript
// Button usage with theme
<Button
  variant="primary"  // Uses theme.colors.primary[500]
  size="medium"      // Uses theme.layout.buttonHeight
  fullWidth
  onPress={handlePress}
>
  Continue
</Button>

// Screen wrapper pattern
<Screen scrollable noPadding={false}>
  {/* Screen content */}
</Screen>
```

### Screen Organization (Expo Router)

Screens are organized using **route groups** in the `app/` directory:
- `app/(auth)/` - Authentication flow (welcome, signup, login)
- `app/(tabs)/` - Main app with bottom tabs (dashboard, budget, transactions, charts, settings)
- `app/(bank)/` - Bank connection flow
- `app/(budget)/` - Budget setup wizard
- `app/(transaction)/` - Transaction screens
- `app/(settings)/` - Settings screens

Route groups (parentheses) create navigation hierarchies without affecting URL structure.

### State Management Pattern

Uses **React Context API** for global state:

**AuthContext Pattern (`contexts/AuthContext.tsx`):**
```typescript
// Provider wraps app root
<AuthProvider>
  <App />
</AuthProvider>

// Hook usage in components
const { user, isAuthenticated, login, logout } = useAuth();
```

**Storage Strategy:**
- `expo-secure-store` - Sensitive data (auth tokens, API keys)
- `@react-native-async-storage/async-storage` - Non-sensitive app data

Create new contexts following this pattern for Budget, Transaction, and Theme state.

### TypeScript Patterns

**Path Aliases:**
- `@/` resolves to project root (configured in `tsconfig.json`)
- Always use path aliases for imports: `@/components/ui/Button` not `../../components/ui/Button`

**Type Definitions (`types/models.ts`):**
All data models are defined here: User, BankAccount, Transaction, Budget, BudgetCategory, RecurringTransaction

**Type Usage:**
```typescript
import { User, Transaction, Budget } from '@/types/models';
```

### Utility Functions

**Currency Utilities (`utils/currency.ts`):**
- `formatCurrency(amount)` - Format as AUD with $ symbol
- `formatCurrencyCompact(amount)` - Format as $1.2K, $1.5M
- `calculatePercentage(spent, budget)` - Budget percentage
- `getBudgetStatusColor(percentage)` - Returns 'success' | 'warning' | 'danger'

**Date Utilities (`utils/date.ts`):**
- `formatTransactionDate(date)` - Returns "Today", "Yesterday", or formatted date
- `formatBudgetPeriod(startDate, endDate)` - Returns "Jan 1 - Jan 31, 2025"
- `getDaysRemaining(endDate)` - Calculate days left in period

### Form Handling Pattern

Uses **React Hook Form + Yup** for validation:

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
});
```

Form components should be created in `components/forms/` (FormInput, FormSelect, CurrencyInput, DatePicker).

### API Integration Pattern

API services go in `services/api/`:
- `services/api/client.ts` - Axios instance configuration
- `services/api/basiq.ts` - Basiq Open Banking integration
- `services/api/auth.ts` - Authentication endpoints
- `services/api/transactions.ts` - Transaction endpoints

**Environment Variables:**
```
EXPO_PUBLIC_API_URL - Backend API URL
EXPO_PUBLIC_BASIQ_API_KEY - Basiq API key
```

Access via `process.env.EXPO_PUBLIC_*` or use `constants/config.ts`.

## Australian-Specific Features

This app is designed for **Australian users**:
- Currency formatting uses AUD ($)
- Default categories include Australian-specific items:
  - HECS/HELP (student loan repayments)
  - Private Health Insurance
  - Rego & CTP (vehicle registration)
- Basiq API integration for Australian open banking
- Date/currency locale set to 'en-AU'

When creating categories or features, consider Australian financial context.

## Screen Development Workflow

When creating new screens:

1. **Import Screen wrapper and theme:**
```typescript
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
```

2. **Use existing UI components** from `components/ui/` before creating new ones

3. **Follow naming conventions:**
   - Screens: PascalCase (e.g., `BudgetWizard.tsx`)
   - Components: PascalCase (e.g., `CategoryCard.tsx`)
   - Utilities: camelCase (e.g., `formatCurrency.ts`)

4. **Access context data** via custom hooks:
```typescript
const { user, isAuthenticated } = useAuth();
```

5. **Style using theme system:**
```typescript
<View style={{ padding: theme.spacing[4], gap: theme.spacing[2] }}>
  <Text style={theme.typography.styles.h2}>Title</Text>
</View>
```

## Free Tier vs Premium

Configuration in `constants/config.ts`:

**Free Tier Limits:**
- Max 2 bank accounts
- Max 10 categories
- 3 months transaction history
- No credit card cycle budgets

**Premium ($6.99/month, $69/year):**
- Unlimited accounts
- Unlimited categories
- Full history
- Credit card cycle budgets
- 7-day free trial

Implement feature gating based on `user.isPremium` from AuthContext.

## Important Implementation Notes

### Budget Progress Colors
Budget progress bars change color based on spending percentage:
- 0-79%: Green (success)
- 80-99%: Yellow (warning)
- 100%+: Red (danger)

Use `getBudgetStatusColor()` from `utils/currency.ts`.

### Category System
14 default categories defined in `constants/categories.ts` with:
- Unique ID
- Display name
- Emoji icon
- Brand color
- Type (essential, lifestyle, financial, australian)

### Navigation Structure
Will use React Navigation v6 with:
- Bottom tabs for main app (`(tabs)` route group)
- Stack navigation for flows (auth, bank, budget wizards)
- Modal presentation for transaction details, settings

### Transaction Types
Three transaction types in system:
- `expense` - Red color, negative amount
- `income` - Green color, positive amount
- `transfer` - Blue color, neutral

## Testing Strategy

No test files exist yet. When implementing tests:
- Unit tests for utilities (`utils/`)
- Component tests for UI components
- Integration tests for context providers
- E2E tests for critical flows (auth, budget creation)

## Next Development Phase

Current status: **Foundation complete, screen development needed**

Priority order:
1. Set up Expo Router with route groups
2. Build authentication screens (`app/(auth)/`)
3. Create budget setup wizard (`app/(budget)/`)
4. Implement main dashboard (`app/(tabs)/index.tsx`)
5. Add bank connection flow (`app/(bank)/`)
6. Build form components (`components/forms/`)
7. Create budget-specific components (`components/budget/`)
8. Implement API services (`services/api/`)

Refer to `SETUP_COMPLETE.md` for detailed component inventory and status.
