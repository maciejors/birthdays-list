import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import 'react-native-reanimated';

export default function RootLayout() {
	return (
		<PaperProvider theme={MD3LightTheme}>
			<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</PaperProvider>
	);
}
