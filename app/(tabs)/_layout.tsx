import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
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
		</Tabs>
	);
}
