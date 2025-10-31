import { ComponentType } from 'react';
import { WidgetContainer, WidgetContainerProps } from './WidgetContainer';
import { BudgetOverviewWidget, BudgetOverviewWidgetProps } from './BudgetOverviewWidget';
import { SpendingSummaryWidget, SpendingSummaryWidgetProps } from './SpendingSummaryWidget';
import { RecentTransactionsWidget, RecentTransactionsWidgetProps } from './RecentTransactionsWidget';
import { CategoryBreakdownWidget, CategoryBreakdownWidgetProps } from './CategoryBreakdownWidget';
import { BankAccountsWidget, BankAccountsWidgetProps } from './BankAccountsWidget';
import { UpcomingBillsWidget, UpcomingBillsWidgetProps } from './UpcomingBillsWidget';
import { SavingsGoalWidget, SavingsGoalWidgetProps } from './SavingsGoalWidget';
import { CardCycleWidget, CardCycleWidgetProps } from './CardCycleWidget';

/**
 * Widget Registry
 * Central registry for all dashboard widgets with configuration
 */

export type WidgetId =
  | 'budget-overview'
  | 'spending-summary'
  | 'recent-transactions'
  | 'category-breakdown'
  | 'bank-accounts'
  | 'upcoming-bills'
  | 'savings-goal'
  | 'card-cycle';

export interface WidgetConfig {
  [key: string]: any;
}

export interface WidgetDefinition {
  id: WidgetId;
  name: string;
  description: string;
  icon: string;
  component: ComponentType<any>;
  defaultConfig: WidgetConfig;
  minHeight?: number;
  isPremium?: boolean;
}

export const WIDGET_REGISTRY: Record<WidgetId, WidgetDefinition> = {
  'budget-overview': {
    id: 'budget-overview',
    name: 'Budget Overview',
    description: 'See your budget progress and top spending categories',
    icon: '💰',
    component: BudgetOverviewWidget,
    defaultConfig: {
      showCategories: 3,
      showProgress: true,
    },
    minHeight: 250,
  },
  'spending-summary': {
    id: 'spending-summary',
    name: 'Spending Summary',
    description: 'Track your spending trends and comparisons',
    icon: '📊',
    component: SpendingSummaryWidget,
    defaultConfig: {
      period: 'monthly',
      showChart: false,
    },
    minHeight: 200,
  },
  'recent-transactions': {
    id: 'recent-transactions',
    name: 'Recent Transactions',
    description: 'View your latest transactions at a glance',
    icon: '📝',
    component: RecentTransactionsWidget,
    defaultConfig: {
      maxTransactions: 5,
    },
    minHeight: 280,
  },
  'category-breakdown': {
    id: 'category-breakdown',
    name: 'Category Breakdown',
    description: 'See spending breakdown by category with progress',
    icon: '📈',
    component: CategoryBreakdownWidget,
    defaultConfig: {
      maxCategories: 5,
      showProgress: true,
    },
    minHeight: 300,
    isPremium: false,
  },
  'bank-accounts': {
    id: 'bank-accounts',
    name: 'Bank Accounts',
    description: 'View all your connected bank accounts and balances',
    icon: '🏦',
    component: BankAccountsWidget,
    defaultConfig: {
      maxAccounts: 4,
    },
    minHeight: 200,
    isPremium: false,
  },
  'upcoming-bills': {
    id: 'upcoming-bills',
    name: 'Upcoming Bills',
    description: 'Timeline view of your upcoming bills and due dates',
    icon: '📅',
    component: UpcomingBillsWidget,
    defaultConfig: {
      maxBills: 10,
    },
    minHeight: 250,
    isPremium: false,
  },
  'savings-goal': {
    id: 'savings-goal',
    name: 'Savings Goal',
    description: 'Track progress towards your savings goals',
    icon: '🎯',
    component: SavingsGoalWidget,
    defaultConfig: {},
    minHeight: 180,
    isPremium: false,
  },
  'card-cycle': {
    id: 'card-cycle',
    name: 'Card Cycle',
    description: 'Monitor credit card spending and payment due dates',
    icon: '💳',
    component: CardCycleWidget,
    defaultConfig: {},
    minHeight: 200,
    isPremium: false,
  },
};

// Default widget order for new users
export const DEFAULT_WIDGET_ORDER: WidgetId[] = [
  'bank-accounts',
  'card-cycle',
  'savings-goal',
  'upcoming-bills',
  'budget-overview',
  'spending-summary',
  'recent-transactions',
  'category-breakdown',
];

// Default enabled widgets for new users (empty - users add from settings)
export const DEFAULT_ENABLED_WIDGETS: WidgetId[] = [];

// Export all widgets
export { BudgetOverviewWidget } from './BudgetOverviewWidget';
export { SpendingSummaryWidget } from './SpendingSummaryWidget';
export { RecentTransactionsWidget } from './RecentTransactionsWidget';
export { CategoryBreakdownWidget } from './CategoryBreakdownWidget';
export { BankAccountsWidget } from './BankAccountsWidget';
export { UpcomingBillsWidget } from './UpcomingBillsWidget';
export { SavingsGoalWidget } from './SavingsGoalWidget';
export { CardCycleWidget } from './CardCycleWidget';
export { WidgetContainer } from './WidgetContainer';

// Export types
export type {
  BudgetOverviewWidgetProps,
  SpendingSummaryWidgetProps,
  RecentTransactionsWidgetProps,
  CategoryBreakdownWidgetProps,
  BankAccountsWidgetProps,
  UpcomingBillsWidgetProps,
  SavingsGoalWidgetProps,
  CardCycleWidgetProps,
  WidgetContainerProps,
};

// Re-export types from individual widgets
export type { BudgetItem } from './BudgetOverviewWidget';
export type { Transaction } from './RecentTransactionsWidget';
export type { CategoryData } from './CategoryBreakdownWidget';
export type { BankAccount } from './BankAccountsWidget';
export type { Bill } from './UpcomingBillsWidget';
export type { SavingsGoal } from './SavingsGoalWidget';
export type { CardCycle } from './CardCycleWidget';
