import { getBirthdaysPerMonth } from '@/core/birthdays';
import BirthdaySegmentedList from '@/components/BirthdaySegmentedList';

export default function FullList() {
	const birthdaysPerMonth = getBirthdaysPerMonth();

	return <BirthdaySegmentedList birthdaysGrouped={birthdaysPerMonth} />;
}
