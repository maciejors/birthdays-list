import { View, StyleSheet, Keyboard } from 'react-native';
import { useState } from 'react';
import { DatePickerInput } from 'react-native-paper-dates';
import { Snackbar, Button, Switch, TouchableRipple, TextInput } from 'react-native-paper';

import { addBirthday } from '@/core/birthdays';
import PaddedText from '@/components/PaddedText';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1, // this allows the SnackBar to show up at the bottom of the screen
	},
	textInput: {
		backgroundColor: 'transparent',
	},
	datePickerInputContainer: {
		paddingVertical: 28,
	},
	touchableSwitchContainer: {
		// marginVertical: 8,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	switchLayout: {
		flexDirection: 'row',
		// justifyContent: 'space-between',
		alignItems: 'center',
		gap: 4,
	},
	switchText: {
		fontSize: 16,
	},
	addButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 8,
	},
});

export default function AddBirthday() {
	const [name, setName] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
	const [ignoreYear, setIgnoreYear] = useState(false);

	const [snackbarText, setSnackbarText] = useState('');

	function switchIgnoreYear() {
		setIgnoreYear(!ignoreYear);
	}

	async function handleAddBirthday(): Promise<void> {
		const missingFields: string[] = [];
		if (name.length === 0) {
			missingFields.push('Name');
		}
		if (dateOfBirth === undefined) {
			missingFields.push('Date of birth');
		}
		if (missingFields.length === 0) {
			Keyboard.dismiss();
			await addBirthday(name.trim(), dateOfBirth!, ignoreYear);
			setSnackbarText('Birthday added successfully!');
			// reset state
			setName('');
			setDateOfBirth(undefined);
			setIgnoreYear(false);
		} else {
			setSnackbarText(`Missing the following required fields: ${missingFields.join(', ')}`);
		}
	}

	return (
		<View style={styles.rootContainer}>
			<TextInput style={styles.textInput} value={name} onChangeText={setName} label="Name" />
			<View style={styles.datePickerInputContainer}>
				<DatePickerInput
					style={styles.textInput}
					locale="en-GB"
					startWeekOnMonday
					label="Birthdate"
					value={dateOfBirth}
					onChange={(d) => setDateOfBirth(d)}
					inputMode="start"
				/>
			</View>
			<TouchableRipple style={styles.touchableSwitchContainer} onPress={switchIgnoreYear}>
				<View style={styles.switchLayout}>
					<PaddedText style={styles.switchText}>Unknown year</PaddedText>
					<Switch value={ignoreYear} onValueChange={switchIgnoreYear} />
				</View>
			</TouchableRipple>
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
