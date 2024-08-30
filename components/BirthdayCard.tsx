import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import type { BirthdayAnniversary } from '@/core/birthdays';
import { formatDateMonth } from '@/core/dateUtils';

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		borderRadius: 16,
	},
});

type BirthdayCardProps = {
	birthday: BirthdayAnniversary;
	todayHighlight?: boolean;
};

export default function BirthdayCard({ birthday, todayHighlight = false }: BirthdayCardProps) {
	return (
		<View style={styles.card}>
			<Text>{birthday.name}</Text>
			{!todayHighlight && <Text>{formatDateMonth(birthday.date)}</Text>}
			{birthday.age !== undefined && <Text>{birthday.age} years old</Text>}
		</View>
	);
}
