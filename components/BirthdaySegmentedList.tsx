import { SectionList, StyleSheet } from 'react-native';

import BirthdayCard from './BirthdayCard';
import { BirthdayGroup } from '@/core/birthdays';
import Spacer from './Spacer';
import PaddedText from './PaddedText';
import CentredInfo from './CentredInfo';
import { useTheme } from '@react-navigation/native';

type BirthdaySegmentedListProps = {
	birthdaysGrouped: BirthdayGroup[];
	onDelete?: (id: number) => any;
};

export default function BirthdaySegmentedList({
	birthdaysGrouped,
	onDelete = undefined,
}: BirthdaySegmentedListProps) {
	const theme = useTheme();

	const styles = StyleSheet.create({
		sectionHeader: {
			fontSize: 16,
			fontStyle: 'italic',
			color: 'grey',
			backgroundColor: theme.colors.background,
		},
	});

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
			keyExtractor={(item, index) => item.id.toString()}
			stickySectionHeadersEnabled
			ListFooterComponent={<Spacer />}
			ListEmptyComponent={<CentredInfo info="No birthdays available" />}
		/>
	);
}
