import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { BirthdayGroup, getBirthdaysPerMonth } from '@/core/birthdays';
import BirthdaySegmentedList from '@/components/BirthdaySegmentedList';

export default function FullList() {
	const [birthdaysPerMonth, setBirthdaysPerMonth] = useState<BirthdayGroup[] | undefined>();

	async function loadBirthdays() {
		setBirthdaysPerMonth(await getBirthdaysPerMonth());
	}

	useFocusEffect(
		useCallback(() => {
			async function loadBirthdays() {
				setBirthdaysPerMonth(await getBirthdaysPerMonth());
			}
			loadBirthdays();
		}, [])
	);

	return (
		birthdaysPerMonth !== undefined && (
			<BirthdaySegmentedList birthdaysGrouped={birthdaysPerMonth} />
		)
	);
}
