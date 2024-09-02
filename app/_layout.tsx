import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import {
	Provider as PaperProvider,
	DefaultTheme as PaperDefaultTheme,
	adaptNavigationTheme,
} from 'react-native-paper';
import 'react-native-reanimated';

import { DarkThemeColors, LightThemeColors } from '@/values/Colors';

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const theme = {
		...PaperDefaultTheme,
		colors: colorScheme === 'dark' ? DarkThemeColors : LightThemeColors,
	};
	const { LightTheme, DarkTheme } = adaptNavigationTheme({
		reactNavigationLight: DefaultTheme,
		reactNavigationDark: DefaultTheme,
	});

	return (
		<PaperProvider theme={theme}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
				<StatusBar backgroundColor="transparent" translucent />
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</ThemeProvider>
		</PaperProvider>
	);
}
