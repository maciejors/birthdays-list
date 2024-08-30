import { startOfToday, isToday, isSameMonth, isSameDay, addDays, addMonths } from 'date-fns';
import { formatMonthYear, formatRelativeDate } from './dateUtils';

interface DateOfBirth {
	name: string;
	day: number;
	month: number;
	year?: number;
}

export interface BirthdayAnniversary {
	name: string;
	date: Date; // this date has the current year (or next year)
	age?: number;
}

export interface BirthdayGroup {
	groupName: string; // refers to some date, e.g. "Tomorrow", or "January 2025"
	birthdays: BirthdayAnniversary[];
}

function getAllFutureBirthdays(): BirthdayAnniversary[] {
	const datesOfBirth: DateOfBirth[] = [
		{ name: 'Konstantyn', day: 30, month: 8, year: 1999 },
		{ name: 'Conor', day: 5, month: 9, year: 2000 },
		{ name: 'Polska', day: 11, month: 11 },
	];
	const today = startOfToday();
	const thisYear = today.getFullYear();
	const result: BirthdayAnniversary[] = datesOfBirth.map((dateOfBirth) => {
		const anniversaryDate = new Date(thisYear, dateOfBirth.month - 1, dateOfBirth.day);
		// birthday is past so now it counts as upcomin in a year
		if (anniversaryDate < today) {
			anniversaryDate.setFullYear(thisYear + 1);
		}
		const birthdayAnniversary: BirthdayAnniversary = {
			name: dateOfBirth.name,
			date: anniversaryDate,
		};
		if (dateOfBirth.year !== undefined) {
			birthdayAnniversary.age = today.getFullYear() - dateOfBirth.year;
		}
		return birthdayAnniversary;
	});
	return result;
}

export function getTodaysBirthdays(): BirthdayAnniversary[] {
	return getAllFutureBirthdays().filter((bday) => isToday(bday.date));
}

/**
 * Get all birthdays within a week from after today
 */
export function getUpcomingBirthdays(): BirthdayGroup[] {
	const result: BirthdayGroup[] = [];
	const allBirthdays = getAllFutureBirthdays();

	const today = startOfToday();
	for (let dayDelta = 1; dayDelta <= 7; dayDelta++) {
		const otherDay = addDays(today, dayDelta);
		const relativeDate = formatRelativeDate(otherDay);
		const birthdays = allBirthdays.filter((bday) => isSameDay(bday.date, otherDay));
		if (birthdays.length > 0) {
			result.push({ groupName: relativeDate, birthdays });
		}
	}
	return result;
}

export function getBirthdaysPerMonth(): BirthdayGroup[] {
	const result: BirthdayGroup[] = [];
	const allBirthdays = getAllFutureBirthdays();

	const today = startOfToday();
	// iterate over 13 months: from this month, to the same month next year
	for (let monthDelta = 0; monthDelta <= 12; monthDelta++) {
		const otherMonth = addMonths(today, monthDelta);
		const monthTag = formatMonthYear(otherMonth);
		const birthdays = allBirthdays.filter((bday) => isSameMonth(bday.date, otherMonth));
		if (birthdays.length > 0) {
			result.push({ groupName: monthTag, birthdays });
		}
	}
	return result;
}
