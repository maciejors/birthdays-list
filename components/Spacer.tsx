import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	spacer: {
		margin: 5,
	},
});

/**
 * Useful to put as the list footer when padding needed
 */
export default function Spacer() {
	return <View style={styles.spacer} />;
}
