# PocketBudget - Australian Budget Tracking App

A modern, feature-rich budget tracking mobile application built with React Native and Expo, designed specifically for Australians.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run android  # Android
npm run ios      # iOS (macOS required)
npm run web      # Web browser
```

## 📱 Features (Planned)

- **Open Banking Integration** - Connect Australian banks via Basiq API
- **Budget Management** - Multiple budget periods (monthly, fortnightly, credit card cycle)
- **Transaction Tracking** - Automatic categorization and tracking
- **Analytics & Insights** - Visual charts and spending trends
- **Recurring Transactions** - Detect and manage subscriptions
- **Australian-Specific** - HECS/HELP, Private Health, Rego & CTP categories
- **Premium Features** - Unlimited accounts, categories, and history

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54 + TypeScript
- **UI**: React Native + Custom Design System
- **Navigation**: React Navigation v6
- **Styling**: NativeWind + Tailwind CSS
- **Forms**: React Hook Form + Yup
- **State**: React Context API
- **Storage**: Expo SecureStore + AsyncStorage
- **Banking**: Basiq Open Banking API

## 📁 Project Structure

```
PocketBudgetApp/
├── app/              # Screens organized by feature
├── components/       # Reusable UI components
├── constants/        # Design system & configuration
├── contexts/         # React Context providers
├── hooks/            # Custom React hooks
├── services/         # API & business logic
├── types/            # TypeScript definitions
└── utils/            # Helper functions
```

## 🎨 Design System

The app includes a complete design system with:
- **Color Palette** - Primary green theme with semantic colors
- **Typography** - System fonts with predefined text styles
- **Spacing** - 4px base unit with consistent scale
- **Components** - Buttons, Inputs, Cards, Progress bars, etc.

See `SETUP_COMPLETE.md` for full details.

## 📝 Development Status

✅ Foundation complete (design system, components, utilities)
🚧 Screen development in progress
⏳ API integration pending
⏳ Testing & deployment pending

## 🔐 Environment Variables

Create a `.env` file:

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_BASIQ_API_KEY=your_basiq_api_key_here
```

## 📄 License

Private project - All rights reserved

## 👨‍💻 Author

Built based on InitPlan.txt specifications
