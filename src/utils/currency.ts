/**
 * Format a number as currency in FCFA (Franc CFA)
 * @param amount - The amount to format
 * @returns Formatted string with FCFA currency
 */
export const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(2)} FCFA`;
};

/**
 * Format a number as currency in FCFA without decimals if it's a whole number
 * @param amount - The amount to format
 * @returns Formatted string with FCFA currency
 */
export const formatCurrencyCompact = (amount: number): string => {
  if (amount % 1 === 0) {
    return `${amount.toFixed(0)} FCFA`;
  }
  return `${amount.toFixed(2)} FCFA`;
};

