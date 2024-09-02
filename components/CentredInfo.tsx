import { View, StyleSheet } from 'react-native';
import PaddedText from './PaddedText';
import { useTheme } from 'react-native-paper';

type CentredInfoProps = {
	info: string;
	important?: boolean;
};

export default function CentredInfo({ info, important = false }: CentredInfoProps) {
	const theme = useTheme();

	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			paddingVertical: 24,
		},
		text: {
			fontSize: 16,
			color: theme.colors.primary,
			fontWeight: important ? 'bold' : 'normal',
			textAlign: 'center',
		},
	});

	return (
		<View style={styles.container}>
			<PaddedText style={styles.text}>{info}</PaddedText>
		</View>
	);
}
