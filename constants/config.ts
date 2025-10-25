/**
 * App Configuration
 * Environment variables and settings
 */

export const config = {
  // App info
  appName: 'PocketBudget',
  appVersion: '1.0.0',

  // API endpoints
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  basiqApiUrl: 'https://au-api.basiq.io',

  // API keys (use environment variables in production)
  basiqApiKey: process.env.EXPO_PUBLIC_BASIQ_API_KEY || '',

  // Features flags
  features: {
    biometricAuth: true,
    darkMode: false, // Coming soon
    exportData: true,
    premiumFeatures: true,
  },

  // Free tier limits
  freeTier: {
    maxBankAccounts: 2,
    maxCategories: 10,
    historyMonths: 3,
    allowCreditCardCycle: false,
  },

  // Premium pricing
  premium: {
    monthlyPrice: 6.99,
    annualPrice: 69.0,
    trialDays: 7,
  },

  // Australian specific
  currency: {
    code: 'AUD',
    symbol: '$',
    locale: 'en-AU',
  },

  // Support
  supportEmail: 'support@pocketbudget.com.au',
  websiteUrl: 'https://pocketbudget.com.au',
};
