import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Dialog, Portal, Button, useTheme, Text, Card } from 'react-native-paper';

import type { BirthdayAnniversary } from '@/core/types';
import { formatDateMonth } from '@/core/dateUtils';

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
	const theme = useTheme();

	const styles = StyleSheet.create({
		card: {
			padding: 8,
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
		<>
			<Card style={styles.card} onPress={showDeleteDialog} disabled={!onDelete}>
				<View style={styles.nameContainer}>
					<Text style={styles.nameText}>{birthday.name}</Text>
					{todayHighlight && <MaterialIcons size={28} name="cake" color="black" />}
				</View>
				{!todayHighlight && <Text style={styles.dateText}>{formatDateMonth(birthday.date)}</Text>}
				{birthday.age !== undefined && <Text style={styles.ageText}>{birthday.age} years old</Text>}
			</Card>

			<Portal>
				<Dialog visible={isDeleteDialogVisible} onDismiss={hideDeleteDialog}>
					<Dialog.Title>Delete Birthday</Dialog.Title>
					<Dialog.Content>
						<Text>Are you sure you want to delete {birthday.name}'s birthday?</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDeleteDialog}>Cancel</Button>
						<Button onPress={handleDelete}>Yes</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</>
	);
}
