import { format, isToday, isTomorrow, isWithinInterval, addDays } from 'date-fns';
import { enIE } from 'date-fns/locale';
/**
 * e.g. "January 2025"
 */
export function formatMonthYear(date: Date): string {
	return format(date, 'MMMM yyyy', { locale: enIE });
}

/**
 * e.g. "30 August"
 */
export function formatDateMonth(date: Date): string {
	return format(date, 'd MMMM', { locale: enIE });
}

/**
 * Formats a given date into a relative string such as "Today",
 * "Tomorrow", the name of the day of the week (e.g., "Sunday"),
 * or a full date format like "6 September" if the date is
 * beyond the next 7 days.
 */
export function formatRelativeDate(date: Date): string {
	const today = new Date();

	if (isToday(date)) {
		return 'Today';
	} else if (isTomorrow(date)) {
		return 'Tomorrow';
	} else if (isWithinInterval(date, { start: today, end: addDays(today, 6) })) {
		// If the date is within the next 7 days, return the day of the week
		return format(date, 'EEEE', { locale: enIE }); // Full day name, e.g., "Sunday"
	} else {
		// If the date is beyond the next 7 days, return "6 September" or similar
		return formatDateMonth(date);
	}
}
