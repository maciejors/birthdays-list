import { View, FlatList, StyleSheet } from 'react-native';

import { getTodaysBirthdays, getUpcomingBirthdays } from '@/core/birthdays';
import BirthdaySegmentedList from '@/components/BirthdaySegmentedList';
import BirthdayCard from '@/components/BirthdayCard';
import Spacer from '@/components/Spacer';
import PaddedText from '@/components/PaddedText';
import CentredInfo from '@/components/CentredInfo';

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
	},
});

export default function Index() {
	const todaysBirthdays = getTodaysBirthdays();
	const upcomingBirthdays = getUpcomingBirthdays();

	return (
		<View>
			{todaysBirthdays.length === 0 ? (
				<View>
					<CentredInfo info="No birthdays today" important />
				</View>
			) : (
				<FlatList
					data={todaysBirthdays}
					renderItem={({ item }) => <BirthdayCard birthday={item} todayHighlight />}
					keyExtractor={(item, index) => index.toString()}
					ListFooterComponent={<Spacer />}
					ListHeaderComponent={<PaddedText style={styles.title}>Today's birthdays:</PaddedText>}
				/>
			)}
			{upcomingBirthdays.length > 0 && (
				<View>
					<PaddedText style={styles.title}>Upcoming birthdays:</PaddedText>
					<BirthdaySegmentedList birthdaysGrouped={upcomingBirthdays} />
				</View>
			)}
		</View>
	);
}
