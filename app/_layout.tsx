import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

export default function RootLayout() {
	return (
		<PaperProvider>
			<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</PaperProvider>
	);
}
