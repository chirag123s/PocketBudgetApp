/**
 * Data Models
 * TypeScript interfaces for all app entities
 */

// User
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  isPremium: boolean;
}

// Bank Account
export interface BankAccount {
  id: string;
  userId: string;
  bankName: string;
  accountName: string;
  accountNumber: string; // Masked: **** 1234
  accountType: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
  isConnected: boolean;
  lastSynced?: Date;
}

// Transaction
export interface Transaction {
  id: string;
  accountId: string;
  userId: string;
  amount: number;
  description: string;
  merchant?: string;
  category: string;
  date: Date;
  type: 'expense' | 'income' | 'transfer';
  status: 'pending' | 'cleared';
  notes?: string;
  tags?: string[];
  receiptUrl?: string;
  isRecurring?: boolean;
}

// Budget
export interface Budget {
  id: string;
  userId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  periodType: 'monthly' | 'fortnightly' | 'weekly' | 'credit-card' | 'custom';
  income: number;
  categories: BudgetCategory[];
  createdAt: Date;
  isActive: boolean;
}

// Budget Category
export interface BudgetCategory {
  id: string;
  budgetId: string;
  name: string;
  icon: string;
  color: string;
  allocatedAmount: number;
  spentAmount: number;
  type: 'essential' | 'lifestyle' | 'financial';
}

// Recurring Transaction
export interface RecurringTransaction {
  id: string;
  userId: string;
  merchant: string;
  amount: number;
  category: string;
  frequency: 'weekly' | 'fortnightly' | 'monthly' | 'quarterly' | 'yearly';
  nextDate: Date;
  isActive: boolean;
}
