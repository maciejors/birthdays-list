import { SectionList, StyleSheet } from 'react-native';

import BirthdayCard from './BirthdayCard';
import { BirthdayGroup, deleteBirthday } from '@/core/birthdays';
import Spacer from './Spacer';
import PaddedText from './PaddedText';
import CentredInfo from './CentredInfo';

const styles = StyleSheet.create({
	sectionHeader: {
		fontSize: 16,
		fontStyle: 'italic',
		color: 'grey',
	},
});

type BirthdaySegmentedListProps = {
	birthdaysGrouped: BirthdayGroup[];
	onDelete?: (id: number) => any;
};

export default function BirthdaySegmentedList({
	birthdaysGrouped,
	onDelete = undefined,
}: BirthdaySegmentedListProps) {
	const sectionListData = birthdaysGrouped.map(({ groupName, birthdays }) => ({
		title: groupName,
		data: birthdays,
	}));

	return (
		<SectionList
			sections={sectionListData}
			renderItem={({ item }) => <BirthdayCard birthday={item} onDelete={onDelete} />}
			renderSectionHeader={({ section }) => (
				<PaddedText style={styles.sectionHeader}>{section.title}</PaddedText>
			)}
			keyExtractor={(item, index) => index.toString()}
			stickySectionHeadersEnabled
			ListFooterComponent={<Spacer />}
			ListEmptyComponent={<CentredInfo info="No birthdays available" />}
		/>
	);
}
