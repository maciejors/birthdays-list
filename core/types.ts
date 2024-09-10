export interface StoredBirthday {
	id: number;
	name: string;
	timestamp: number;
	ignoreYear: boolean;
	scheduledNotificationYear?: number;
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

export interface BirthdayNotification {
	birthdayId: number;
	notificationId: string;
	scheduledYear: number;
}
