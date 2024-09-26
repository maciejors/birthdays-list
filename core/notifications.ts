import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import { readObject, storeObject } from './storage';
import { BirthdayAnniversary, BirthdayNotification } from './types';

const NOTIFICATIONS_STORAGE_KEY = 'notifications';

async function readScheduledNotifications(): Promise<BirthdayNotification[]> {
	return await readObject<BirthdayNotification[]>(NOTIFICATIONS_STORAGE_KEY, []);
}

async function storeScheduledNotifications(
	scheduledNotifications: BirthdayNotification[]
): Promise<void> {
	return await storeObject(NOTIFICATIONS_STORAGE_KEY, scheduledNotifications);
}

async function scheduleNotificationForBirthday(birthday: BirthdayAnniversary): Promise<string> {
	const trigger = new Date(birthday.date.getTime());
	trigger.setHours(8);
	const notificationId = await Notifications.scheduleNotificationAsync({
		content: {
			title: 'Birthday!',
			body: `It's ${birthday.name}'s birthday today!`,
		},
		trigger,
	});
	return notificationId;
}

/**
 * Schedule notification for each birthday if it is not scheduled yet
 *
 * @param birthdays Birthdays to schedule notification for
 */
export async function handleScheduleNotifications(birthdays: BirthdayAnniversary[]) {
	let scheduledNotificationsData = await readScheduledNotifications();
	// the below list is there because it might happen that the notification has failed
	// to schedule but its data was saved. In that case we want to re-schedule.
	// For that purpose we filter the scheduledNotificationsData to only those which
	// are actually registered.
	const actualScheduledNotificationsIds = (
		await Notifications.getAllScheduledNotificationsAsync()
	).map((notif) => notif.identifier);
	scheduledNotificationsData = scheduledNotificationsData.filter((notifData) =>
		actualScheduledNotificationsIds.includes(notifData.notificationId)
	);

	// convert to map for faster access
	const scheduledBirthdaysMap = new Map<number, BirthdayNotification>();
	for (const notification of scheduledNotificationsData) {
		scheduledBirthdaysMap.set(notification.birthdayId, notification);
	}

	// schedule notifications
	for (const bday of birthdays) {
		const scheduledNotifData = scheduledBirthdaysMap.get(bday.id);
		const birthdayYear = bday.date.getFullYear();
		// notification already scheduled - skip
		if (scheduledNotifData?.scheduledYear === birthdayYear) {
			continue;
		}
		// schedule
		const notificationId = await scheduleNotificationForBirthday(bday);
		// update stored data
		if (scheduledNotifData !== undefined) {
			scheduledNotifData.scheduledYear = birthdayYear;
		} else {
			scheduledNotificationsData.push({
				birthdayId: bday.id,
				notificationId,
				scheduledYear: birthdayYear,
			});
		}
	}
	// update scheduled notifications data
	await storeScheduledNotifications(scheduledNotificationsData);
}

/**
 * Cancel scheduled notification for a birthday if it was registered
 */
export async function cancelNotification(birthdayId: number): Promise<void> {
	const allScheduledNotifications = await readScheduledNotifications();
	const filteredForThisBday = allScheduledNotifications.filter(
		(notif) => notif.birthdayId === birthdayId
	);
	if (filteredForThisBday.length === 0) {
		return;
	}
	const notificationId = filteredForThisBday[0].notificationId;
	await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export async function registerForPushNotificationsAsync(): Promise<void> {
	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: true,
		}),
	});

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get permission for push notifications');
			return;
		}
	}
}
