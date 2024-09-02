import { View, StyleSheet, Keyboard } from 'react-native';
import { useState } from 'react';
import { Snackbar, Button } from 'react-native-paper';

import StyledTextInput from '@/components/StyledTextInput';
import MonthPicker from '@/components/MonthPicker';
import { addBirthday, DateOfBirth } from '@/core/birthdays';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1, // this allows the SnackBar to show up at the bottom of the screen
	},
	previewTitle: {
		fontSize: 18,
		fontStyle: 'italic',
		marginTop: 16,
	},
	addButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 8,
		paddingTop: 16,
	},
});

export default function AddBirthday() {
	const [name, setName] = useState('');
	const [dayOfBirth, setDayOfBirth] = useState('');
	const [monthOfBirth, setMonthOfBirth] = useState<string | null>(null);
	const [yearOfBirth, setYearOfBirth] = useState('');

	const [snackbarText, setSnackbarText] = useState('');

	function parseIntDefault(intStr: string | undefined, defaultValue: number): number {
		return parseInt(intStr ? intStr : defaultValue.toString());
	}

	function getDateOfBirth(): DateOfBirth {
		const result: DateOfBirth = {
			id: -1, // dummy ID
			name: name.length > 0 ? name : 'Name',
			day: parseIntDefault(dayOfBirth, 1),
			month: parseIntDefault(monthOfBirth ?? '', 1),
		};
		if (yearOfBirth.length > 0) {
			result.year = parseIntDefault(yearOfBirth, 1970);
		}
		return result;
	}

	async function handleAddBirthday(): Promise<void> {
		const missingFields: string[] = [];
		if (name.length === 0) {
			missingFields.push('Name');
		}
		if (dayOfBirth.length === 0) {
			missingFields.push('Day');
		}
		if (monthOfBirth === null) {
			missingFields.push('Month');
		}
		if (missingFields.length === 0) {
			Keyboard.dismiss();
			const dateOfBirth = getDateOfBirth();
			await addBirthday(dateOfBirth.name, dateOfBirth.day, dateOfBirth.month, dateOfBirth.year);
			setSnackbarText('Birthday added successfully!');
			// reset state
			setName('');
			setDayOfBirth('');
			setYearOfBirth('');
			setMonthOfBirth(null);
		} else {
			setSnackbarText(`Missing the following required fields: ${missingFields.join(', ')}`);
		}
	}

	return (
		<View style={styles.rootContainer}>
			<StyledTextInput value={name} onChangeText={setName} placeholder="Name" />
			<StyledTextInput
				value={dayOfBirth}
				onChangeText={setDayOfBirth}
				placeholder="Day"
				keyboardType="numeric"
			/>
			<MonthPicker onChangeMonth={setMonthOfBirth} selectedMonth={monthOfBirth} />
			<StyledTextInput
				value={yearOfBirth}
				onChangeText={setYearOfBirth}
				placeholder="Year"
				keyboardType="numeric"
			/>
			<View style={styles.addButtonContainer}>
				<Button
					mode="contained"
					onPress={handleAddBirthday}
					accessibilityLabel="Add birthday button"
				>
					Add birthday
				</Button>
			</View>
			<Snackbar
				visible={snackbarText.length > 0}
				onDismiss={() => setSnackbarText('')}
				duration={Snackbar.DURATION_SHORT}
			>
				{snackbarText}
			</Snackbar>
		</View>
	);
}
