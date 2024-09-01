import React, { useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';

import { getMonthName } from '@/core/dateUtils';

interface Month {
	value: string; // from "1" to "12", plus "0" for not selected
	label: string;
}

const months: Month[] = [
	...Array.from(Array(12).keys()).map((i) => ({
		value: (i + 1).toString(),
		label: getMonthName(i + 1),
	})),
];
const placeholder = { value: null, label: 'Select a month' };

type MonthPickerProps = {
	onChangeMonth: (month: string | null) => void;
	selectedMonth: string | null;
};

export default function MonthPicker({ onChangeMonth, selectedMonth }: MonthPickerProps) {
	function onValueChange(itemValue: string | null) {
		onChangeMonth(itemValue);
	}

	return (
		<RNPickerSelect
			onValueChange={onValueChange}
			items={months}
			placeholder={placeholder}
			value={selectedMonth} // Controlled value
		/>
	);
}
