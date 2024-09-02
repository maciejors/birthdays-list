import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

const styles = StyleSheet.create({
	paddedText: {
		paddingVertical: 8,
		paddingHorizontal: 4,
	},
});

export default function PaddedText({ style, children, ...rest }: TextProps<React.ComponentType>) {
	return (
		<Text style={[styles.paddedText, style]} {...rest}>
			{children}
		</Text>
	);
}
