import {
	startOfToday,
	isToday,
	isSameMonth,
	isSameDay,
	addDays,
	addMonths,
	compareAsc,
} from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { formatMonthYear, formatRelativeDate } from './dateUtils';
import type { StoredBirthday, BirthdayAnniversary, BirthdayGroup } from './types';

const BIRTHDAYS_STORAGE_KEY = 'birthdays';

/**
 * Reads all stored birthdays
 */
async function readBirthdays(): Promise<StoredBirthday[]> {
	const rawData = await AsyncStorage.getItem(BIRTHDAYS_STORAGE_KEY);
	if (rawData === null) {
		return [];
	}
	return JSON.parse(rawData);
}

/**
 * Overwrites currently stored birthdays with the specified ones
 */
async function storeBirthdays(birthdays: StoredBirthday[]): Promise<void> {
	await AsyncStorage.setItem(BIRTHDAYS_STORAGE_KEY, JSON.stringify(birthdays));
}

export async function addBirthday(
	name: string,
	dateOfBirth: Date,
	ignoreYear: boolean
): Promise<void> {
	const birthdays = await readBirthdays();
	const birthdayWithMaxId = birthdays.reduce((currMax, bday) =>
		bday.id > currMax.id ? bday : currMax
	);
	const newBirthday: StoredBirthday = {
		id: birthdayWithMaxId.id + 1,
		name,
		timestamp: dateOfBirth.getTime(),
		ignoreYear,
	};
	birthdays.push(newBirthday);
	await storeBirthdays(birthdays);
}

export async function deleteBirthday(id: number): Promise<void> {
	let birthdays = await readBirthdays();
	birthdays = birthdays.filter((b) => b.id !== id);
	await storeBirthdays(birthdays);
}

/**
 * Converts StoredBirthday into BirthdayAnniversary
 */
function getBirthdayAnniversary(storedBirthday: StoredBirthday): BirthdayAnniversary {
	const today = startOfToday();
	const thisYear = today.getFullYear();
	const dateOfBirth = new Date(storedBirthday.timestamp);
	const anniversaryDate = new Date(thisYear, dateOfBirth.getMonth(), dateOfBirth.getDate());
	// birthday is past so now it counts as upcoming in a year
	if (anniversaryDate < today) {
		anniversaryDate.setFullYear(thisYear + 1);
	}
	const birthdayAnniversary: BirthdayAnniversary = {
		id: storedBirthday.id,
		name: storedBirthday.name,
		date: anniversaryDate,
	};
	if (!storedBirthday.ignoreYear) {
		birthdayAnniversary.age = anniversaryDate.getFullYear() - dateOfBirth.getFullYear();
	}
	return birthdayAnniversary;
}

async function getAllFutureBirthdays(): Promise<BirthdayAnniversary[]> {
	const datesOfBirth = await readBirthdays();
	let result: BirthdayAnniversary[] = datesOfBirth.map(getBirthdayAnniversary);
	// sort by date - most recent first
	result = result.sort((b1, b2) => compareAsc(b1.date, b2.date));
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
