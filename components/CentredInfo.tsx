import { View, StyleSheet } from 'react-native';
import PaddedText from './PaddedText';

type CentredInfoProps = {
	info: string;
	important?: boolean;
};

export default function CentredInfo({ info, important = false }: CentredInfoProps) {
	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			paddingVertical: 24,
		},
		text: {
			fontSize: 16,
			color: 'grey',
			fontWeight: important ? 'bold' : 'normal',
		},
	});

	return (
		<View style={styles.container}>
			<PaddedText style={styles.text}>{info}</PaddedText>
		</View>
	);
}
