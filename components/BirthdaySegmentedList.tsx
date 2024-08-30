import { Text, SectionList } from 'react-native';
import React from 'react';

import BirthdayCard from './BirthdayCard';
import { BirthdayGroup } from '@/core/birthdays';

type BirthdaySegmentedListProps = {
	birthdaysGrouped: BirthdayGroup[];
};

export default function BirthdaySegmentedList({ birthdaysGrouped }: BirthdaySegmentedListProps) {
	const sectionListData = birthdaysGrouped.map(({ groupName, birthdays }) => ({
		title: groupName,
		data: birthdays,
	}));

	return (
		<SectionList
			sections={sectionListData}
			renderItem={({ item }) => <BirthdayCard birthday={item} />}
			renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
			keyExtractor={(item, index) => index.toString()}
			stickySectionHeadersEnabled
		/>
	);
}
