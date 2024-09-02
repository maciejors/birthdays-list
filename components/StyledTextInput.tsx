import { StyleSheet } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

export default function StyledTextInput({ style, ...rest }: TextInputProps) {
	const styles = StyleSheet.create({
		textInput: {
			margin: 4,
			padding: 4,
			backgroundColor: 'transparent',
		},
	});

	return <TextInput style={[styles.textInput, style]} {...rest} />;
}
