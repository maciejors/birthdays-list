import { View, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';

import { getTodaysBirthdays, getUpcomingBirthdays } from '@/core/birthdays';
import type { BirthdayAnniversary, BirthdayGroup } from '@/core/types';
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
	const [todaysBirthdays, setTodaysBirthdays] = useState<BirthdayAnniversary[] | undefined>();
	const [upcomingBirthdays, setUpcomingBirthdays] = useState<BirthdayGroup[] | undefined>();

	useFocusEffect(
		useCallback(() => {
			async function loadBirthdays() {
				setTodaysBirthdays(await getTodaysBirthdays());
				setUpcomingBirthdays(await getUpcomingBirthdays());
			}
			loadBirthdays();
		}, [])
	);

	function getInfoText(): string {
		if (todaysBirthdays!.length > 0) {
			// No info anyway when birthdays today
			return '';
		}
		if (upcomingBirthdays!.length > 0) {
			// no birthdays today but some upcoming
			return 'No birthdays today';
		}
		// no birthdays today nor upcoming
		return 'No birthdays today or in the near future';
	}

	return (
		todaysBirthdays !== undefined &&
		upcomingBirthdays !== undefined && (
			<View>
				{todaysBirthdays.length === 0 ? (
					<View>
						<CentredInfo info={getInfoText()} important />
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
		)
	);
}
