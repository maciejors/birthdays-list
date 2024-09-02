import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Dialog, Portal, Button, useTheme } from 'react-native-paper';

import type { BirthdayAnniversary } from '@/core/birthdays';
import { formatDateMonth } from '@/core/dateUtils';
import Colors from '@/values/Colors';

type BirthdayCardProps = {
	birthday: BirthdayAnniversary;
	onDelete?: (id: number) => any; // if not specified, the birthday cannot be deleted
	todayHighlight?: boolean;
};

export default function BirthdayCard({
	birthday,
	onDelete,
	todayHighlight = false,
}: BirthdayCardProps) {
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

	const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

	function showDeleteDialog() {
		setIsDeleteDialogVisible(true);
	}

	function hideDeleteDialog() {
		setIsDeleteDialogVisible(false);
	}

	async function handleDelete() {
		await Promise.resolve(onDelete!(birthday.id));
		hideDeleteDialog();
	}

	return (
		<TouchableOpacity onPress={showDeleteDialog} disabled={!onDelete}>
			<View style={styles.card}>
				<View style={styles.nameContainer}>
					<Text style={styles.nameText}>{birthday.name}</Text>
					{todayHighlight && <MaterialIcons size={28} name="cake" color="black" />}
				</View>
				{!todayHighlight && <Text style={styles.dateText}>{formatDateMonth(birthday.date)}</Text>}
				{birthday.age !== undefined && <Text style={styles.ageText}>{birthday.age} years old</Text>}
			</View>

			<Portal>
				<Dialog visible={isDeleteDialogVisible} onDismiss={hideDeleteDialog}>
					<Dialog.Title>Delete Birthday</Dialog.Title>
					<Dialog.Content>
						<Text>Are you sure you want to delete {birthday.name}'s birthday?</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDeleteDialog} textColor={Colors.primary}>
							Cancel
						</Button>
						<Button onPress={handleDelete} textColor={Colors.primary}>
							Yes
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</TouchableOpacity>
	);
}
