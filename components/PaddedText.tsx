import { Text, StyleSheet, TextProps } from 'react-native';

const styles = StyleSheet.create({
	paddedText: {
		paddingVertical: 8,
		paddingHorizontal: 4,
	},
});

export default function PaddedText({ style, children, ...rest }: TextProps) {
	return (
		<Text style={[styles.paddedText, style]} {...rest}>
			{children}
		</Text>
	);
}
