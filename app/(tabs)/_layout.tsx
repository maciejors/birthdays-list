import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
	const theme = useTheme();

	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.primary }}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Today',
					tabBarIcon: ({ color }) => <MaterialIcons size={28} name="cake" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="full-list"
				options={{
					title: 'All birthdays',
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={28} name="format-list-bulleted" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="add-birthday"
				options={{
					title: 'Add a birthday',
					tabBarIcon: ({ color }) => <MaterialIcons size={28} name="add-circle" color={color} />,
				}}
			/>
		</Tabs>
	);
}
