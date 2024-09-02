import { useState } from 'react';
import { View, Pressable, Keyboard } from 'react-native';
import { Menu } from 'react-native-paper';
import { getMonthName } from '@/core/dateUtils';
import StyledTextInput from './StyledTextInput';

interface Month {
	no: string; // from "1" to "12"
	name: string;
}

const months: Month[] = [
	...Array.from(Array(12).keys()).map((i) => ({
		no: (i + 1).toString(),
		name: getMonthName(i + 1),
	})),
];

type MonthPickerProps = {
	onChangeMonth: (month: string | null) => void;
	selectedMonth: string | null;
};

export default function MonthPicker({ onChangeMonth, selectedMonth }: MonthPickerProps) {
	const [visible, setVisible] = useState(false);

	function showMenu() {
		setVisible(true);
		Keyboard.dismiss();
	}
	const hideMenu = () => setVisible(false);

	const handleSelectMonth = (value: string) => {
		onChangeMonth(value === null ? null : value);
		hideMenu();
	};

	const selectedMonthName = selectedMonth
		? getMonthName(parseInt(selectedMonth))
		: 'Select a month';

	return (
		<Menu
			visible={visible}
			onDismiss={hideMenu}
			anchor={
				<Pressable onPress={showMenu}>
					<View pointerEvents="none">
						<StyledTextInput
							value={selectedMonthName}
							editable={false} // Make it non-editable - it is there just for styling
						/>
					</View>
				</Pressable>
			}
		>
			{months.map((month) => (
				<Menu.Item key={month.no} onPress={() => handleSelectMonth(month.no)} title={month.name} />
			))}
		</Menu>
	);
}
