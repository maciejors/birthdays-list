import { useEffect } from 'react';
import { StatusBar, useColorScheme, SafeAreaView } from 'react-native';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import {
	Provider as PaperProvider,
	DefaultTheme as PaperDefaultTheme,
	adaptNavigationTheme,
} from 'react-native-paper';
import { enGB, registerTranslation as registerDatesTranslation } from 'react-native-paper-dates';
import 'react-native-reanimated';

import { DarkThemeColors, LightThemeColors } from '@/values/Colors';
import { registerForPushNotificationsAsync } from '@/core/notifications';

registerDatesTranslation('en-GB', enGB);

export default function RootLayout() {
	useEffect(() => {
		registerForPushNotificationsAsync();
	});

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
				<SafeAreaView style={{ flex: 1 }}>
					<StatusBar backgroundColor="transparent" translucent />
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					</Stack>
				</SafeAreaView>
			</ThemeProvider>
		</PaperProvider>
	);
}
