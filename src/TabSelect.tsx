import { Divider, MenuItem, MenuList } from '@mui/material';
import _ from 'lodash';
import { useMemo, useState } from 'react';
import { StyledCheckbox, StyledPopover } from './TabSelect.style';

const GRADES = ['國一', '國二', '國三'];
const SUBJECTS = ['國文', '英文', '數學', '自然', '社會'];

const getRandom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const LIST = Array.from({ length: 25 }, () => ({
	grade: getRandom(GRADES),
	subject: getRandom(SUBJECTS),
	selected: false,
}));

const TabSelect = () => {
	const [currentGrade, setCurrentGrade] = useState<string | null>(null);
	const [list, setList] = useState(LIST);
	const groupedList = useMemo(
		() =>
			_.chain(list)
				.groupBy('grade')
				.mapValues((arr) => _.chain(arr).groupBy('subject').value())
				.value(),
		list
	);

	const handleGradeChecked = (checked: boolean, grade: string) => {
		setList((prev) =>
			prev.map((item) =>
				item.grade === grade ? { ...item, selected: checked } : item
			)
		);
	};

	const handleSubjectChecked = (checked: boolean, subject: string) => {
		setList((prev) =>
			prev.map((item) =>
				item.grade === currentGrade && item.subject === subject
					? { ...item, selected: checked }
					: item
			)
		);
	};

	return (
		<StyledPopover
			open={true}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
		>
			<MenuList>
				{Object.keys(groupedList).map((grade) => {
					const currentGradeList = list.filter((item) => item.grade === grade);

					const selectedCurrentGradeList = currentGradeList.filter(
						({ selected }) => selected
					);
					return (
						<MenuItem key={grade} onClick={() => setCurrentGrade(grade)}>
							<StyledCheckbox
								indeterminate={
									selectedCurrentGradeList.length > 0 &&
									selectedCurrentGradeList.length < currentGradeList.length
								}
								checked={currentGradeList.every(({ selected }) => selected)}
								onChange={(__, checked) => {
									handleGradeChecked(checked, grade);
								}}
							/>
							{grade}
						</MenuItem>
					);
				})}
			</MenuList>
			<Divider orientation="vertical" flexItem />
			<MenuList>
				{currentGrade &&
					Object.entries(groupedList[currentGrade]).map(([subject, items]) => (
						<MenuItem key={subject}>
							<StyledCheckbox
								checked={list
									.filter(
										(item) =>
											item.grade === currentGrade && item.subject === subject
									)
									.every(({ selected }) => selected)}
								onChange={(__, checked) => {
									handleSubjectChecked(checked, subject);
								}}
							/>
							{subject} ({items.length})
						</MenuItem>
					))}
			</MenuList>
		</StyledPopover>
	);
};

export default TabSelect;
