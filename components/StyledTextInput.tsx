import { useState } from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

import Colors from '@/values/Colors';

export default function StyledTextInput({ style, ...rest }: TextInputProps) {
	const [active, setActive] = useState(false);

	const styles = StyleSheet.create({
		textInput: {
			margin: 4,
			padding: 4,
			borderBottomWidth: 1,
			borderBottomColor: active ? Colors.primary : 'lightgray',
		},
	});

	return (
		<TextInput
			style={[styles.textInput, style]}
			onFocus={() => setActive(true)}
			onBlur={() => setActive(false)}
			{...rest}
		/>
	);
}
