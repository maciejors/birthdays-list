import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { deleteBirthday, getBirthdaysPerMonth } from '@/core/birthdays';
import type { BirthdayGroup } from '@/core/types';
import BirthdaySegmentedList from '@/components/BirthdaySegmentedList';

export default function FullList() {
	const [birthdaysPerMonth, setBirthdaysPerMonth] = useState<BirthdayGroup[] | undefined>();

	useFocusEffect(
		useCallback(() => {
			async function loadBirthdays() {
				setBirthdaysPerMonth(await getBirthdaysPerMonth());
			}
			loadBirthdays();
		}, [])
	);

	async function handleDelete(id: number) {
		await deleteBirthday(id);
		setBirthdaysPerMonth(await getBirthdaysPerMonth());
	}

	return (
		birthdaysPerMonth !== undefined && (
			<BirthdaySegmentedList birthdaysGrouped={birthdaysPerMonth} onDelete={handleDelete} />
		)
	);
}
