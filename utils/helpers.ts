/**
 * Get initials from a full name
 * @param name - Full name (e.g., "Alex Johnson")
 * @returns Initials (e.g., "AJ")
 */
export const getInitials = (name: string): string => {
  if (!name || !name.trim()) return 'U'; // U for User

  const parts = name.trim().split(' ');

  if (parts.length >= 2) {
    // First letter of first name + first letter of last name
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // Single name - return first 2 letters
  return name.substring(0, 2).toUpperCase();
};

/**
 * Format currency in AUD
 * @param amount - Amount to format
 * @returns Formatted currency string (e.g., "$42,831.50")
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Get greeting based on time of day
 * @returns Greeting string (e.g., "Good morning", "Good afternoon", "Good evening")
 */
export const getTimeGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good morning';
  } else if (hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};
