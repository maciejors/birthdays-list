import { startOfToday, isToday, isSameMonth, isSameDay, addDays, addMonths } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { formatMonthYear, formatRelativeDate } from './dateUtils';

const BIRTHDAYS_STORAGE_KEY = 'birthdays';

export interface DateOfBirth {
	id: number;
	name: string;
	day: number;
	month: number;
	year?: number;
}

export interface BirthdayAnniversary {
	id: number;
	name: string;
	date: Date; // this date has the current year (or next year)
	age?: number;
}

export interface BirthdayGroup {
	groupName: string; // refers to some date, e.g. "Tomorrow", or "January 2025"
	birthdays: BirthdayAnniversary[];
}

async function getAllDatesOfBirth(): Promise<DateOfBirth[]> {
	const rawData = await AsyncStorage.getItem(BIRTHDAYS_STORAGE_KEY);
	if (rawData === null) {
		return [];
	}
	return JSON.parse(rawData);
}

export async function addBirthday(
	name: string,
	day: number,
	month: number,
	year?: number
): Promise<void> {
	const birthdays = await getAllDatesOfBirth();
	const dateOfBirth = {
		id: birthdays.length,
		name,
		day,
		month,
		year,
	};
	birthdays.push(dateOfBirth);
	await AsyncStorage.setItem(BIRTHDAYS_STORAGE_KEY, JSON.stringify(birthdays));
}

export function getBirthdayAnniversary(dateOfBirth: DateOfBirth): BirthdayAnniversary {
	const today = startOfToday();
	const thisYear = today.getFullYear();
	const anniversaryDate = new Date(thisYear, dateOfBirth.month - 1, dateOfBirth.day);
	// birthday is past so now it counts as upcomin in a year
	if (anniversaryDate < today) {
		anniversaryDate.setFullYear(thisYear + 1);
	}
	const birthdayAnniversary: BirthdayAnniversary = {
		id: dateOfBirth.id,
		name: dateOfBirth.name,
		date: anniversaryDate,
	};
	if (dateOfBirth.year !== undefined) {
		birthdayAnniversary.age = today.getFullYear() - dateOfBirth.year;
	}
	return birthdayAnniversary;
}

async function getAllFutureBirthdays(): Promise<BirthdayAnniversary[]> {
	const datesOfBirth = await getAllDatesOfBirth();
	const result: BirthdayAnniversary[] = datesOfBirth.map(getBirthdayAnniversary);
	return result;
}

export async function getTodaysBirthdays(): Promise<BirthdayAnniversary[]> {
	const allBirthdays = await getAllFutureBirthdays();
	return allBirthdays.filter((bday) => isToday(bday.date));
}

/**
 * Get all birthdays within a week from after today
 */
export async function getUpcomingBirthdays(): Promise<BirthdayGroup[]> {
	const result: BirthdayGroup[] = [];
	const allBirthdays = await getAllFutureBirthdays();

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

export async function getBirthdaysPerMonth(): Promise<BirthdayGroup[]> {
	const result: BirthdayGroup[] = [];
	const allBirthdays = await getAllFutureBirthdays();

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
