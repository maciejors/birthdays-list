import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import type { BirthdayAnniversary } from '@/core/birthdays';
import { formatDateMonth } from '@/core/dateUtils';

type BirthdayCardProps = {
	birthday: BirthdayAnniversary;
	todayHighlight?: boolean;
};

export default function BirthdayCard({ birthday, todayHighlight = false }: BirthdayCardProps) {
	const styles = StyleSheet.create({
		card: {
			backgroundColor: 'white',
			borderRadius: 8,
			padding: 8,
			// Shadow properties for iOS
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			// Elevation for Android
			elevation: 5,
			margin: 4,
		},
		nameContainer: {
			flexDirection: 'row',
			gap: 4,
		},
		nameText: {
			fontSize: 20,
			fontWeight: todayHighlight ? 'bold' : 'normal',
		},
		dateText: {
			fontWeight: 'bold',
		},
		ageText: {
			color: 'gray',
			fontWeight: todayHighlight ? 'bold' : 'normal',
		},
	});

	return (
		<View style={styles.card}>
			<View style={styles.nameContainer}>
				<Text style={styles.nameText}>{birthday.name}</Text>
				{todayHighlight && <MaterialIcons size={28} name="cake" color="black" />}
			</View>
			{!todayHighlight && <Text style={styles.dateText}>{formatDateMonth(birthday.date)}</Text>}
			{birthday.age !== undefined && <Text style={styles.ageText}>{birthday.age} years old</Text>}
		</View>
	);
}
