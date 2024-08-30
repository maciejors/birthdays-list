import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</>
	);
}
