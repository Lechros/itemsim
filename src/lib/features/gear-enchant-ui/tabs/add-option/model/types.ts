import type { AddOptionGrade, AddOptionType } from '@malib/gear';

export type AddOptionTypeOrEmpty = AddOptionType | '';
export type AddOptionGradeOrEmpty = AddOptionGrade | 0;

export type SelectedOption = {
	type: AddOptionTypeOrEmpty;
	grade: AddOptionGradeOrEmpty;
};
