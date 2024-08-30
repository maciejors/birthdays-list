import { Text, View, FlatList } from 'react-native';

import { getTodaysBirthdays, getUpcomingBirthdays } from '@/core/birthdays';
import BirthdaySegmentedList from '@/components/BirthdaySegmentedList';
import BirthdayCard from '@/components/BirthdayCard';

export default function Index() {
	const todaysBirthdays = getTodaysBirthdays();
	const upcomingBirthdays = getUpcomingBirthdays();

	return (
		<View>
			<FlatList
				data={todaysBirthdays}
				renderItem={({ item }) => <BirthdayCard birthday={item} todayHighlight />}
				keyExtractor={(item, index) => index.toString()}
			/>
			<Text>Upcoming birthdays:</Text>
			<BirthdaySegmentedList birthdaysGrouped={upcomingBirthdays} />
		</View>
	);
}
