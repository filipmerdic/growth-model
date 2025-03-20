import { differenceInDays, endOfMonth, format, startOfMonth } from 'date-fns';

export const getCurrentMonthProgress = (): number => {
  const today = new Date();
  const startOfCurrentMonth = startOfMonth(today);
  const endOfCurrentMonth = endOfMonth(today);
  
  const totalDaysInMonth = differenceInDays(endOfCurrentMonth, startOfCurrentMonth) + 1;
  const daysPassed = differenceInDays(today, startOfCurrentMonth) + 1;
  
  return Math.min(Math.round((daysPassed / totalDaysInMonth) * 100), 100);
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM d, yyyy h:mm a');
};

export const calculatePercentage = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
}; 