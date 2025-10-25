/**
 * Default Budget Categories
 * Matches the categories from the screen designs
 */

export interface CategoryDefinition {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'essential' | 'lifestyle' | 'financial' | 'australian';
}

export const defaultCategories: CategoryDefinition[] = [
  // Essential
  {
    id: 'housing',
    name: 'Housing',
    icon: '🏠',
    color: '#EF4444',
    type: 'essential',
  },
  {
    id: 'groceries',
    name: 'Groceries',
    icon: '🛒',
    color: '#10B981',
    type: 'essential',
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: '🚗',
    color: '#3B82F6',
    type: 'essential',
  },
  {
    id: 'bills',
    name: 'Bills & Utilities',
    icon: '💡',
    color: '#F59E0B',
    type: 'essential',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    color: '#EC4899',
    type: 'essential',
  },

  // Lifestyle
  {
    id: 'dining',
    name: 'Dining Out',
    icon: '🍽️',
    color: '#F59E0B',
    type: 'lifestyle',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    color: '#8B5CF6',
    type: 'lifestyle',
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: '🛍️',
    color: '#A855F7',
    type: 'lifestyle',
  },
  {
    id: 'phone',
    name: 'Phone & Internet',
    icon: '📱',
    color: '#06B6D4',
    type: 'lifestyle',
  },

  // Financial
  {
    id: 'savings',
    name: 'Savings',
    icon: '💰',
    color: '#10B981',
    type: 'financial',
  },
  {
    id: 'debt',
    name: 'Debt Payments',
    icon: '💳',
    color: '#EF4444',
    type: 'financial',
  },

  // Australian Specific
  {
    id: 'hecs',
    name: 'HECS/HELP',
    icon: '🎓',
    color: '#3B82F6',
    type: 'australian',
  },
  {
    id: 'private-health',
    name: 'Private Health',
    icon: '🏥',
    color: '#EC4899',
    type: 'australian',
  },
  {
    id: 'rego',
    name: 'Rego & CTP',
    icon: '🚗',
    color: '#F97316',
    type: 'australian',
  },
];
