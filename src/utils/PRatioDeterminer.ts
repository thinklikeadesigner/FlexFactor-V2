import { pRatios } from './pRatios';

interface SurplusHash {
	[key: number]: string;
}

const surplusTable: SurplusHash = {
	2.5: 'surplus2',
	5: 'surplus5',
	10: 'surplus10',
	15: 'surplus15',
	25: 'surplus25'
};

const getBodyFatRange = (sex: string, bodyFat: number): string => {
	let bodyFatrange = '';
	if (sex === 'female') {
		if (bodyFat > 10 && bodyFat <= 19) bodyFatrange = 'bf12to19';
		if (bodyFat > 20 && bodyFat <= 24) bodyFatrange = 'bf20to24';
		if (bodyFat > 25 && bodyFat <= 31) bodyFatrange = 'bf25to35';
		if (bodyFat > 32) bodyFatrange = 'bf32to40';
	}

	if (sex === 'male') {
		if (bodyFat > 4 && bodyFat <= 8) bodyFatrange = 'bf6to8';
		if (bodyFat > 9 && bodyFat <= 19) bodyFatrange = 'bf9to12';
		if (bodyFat > 13 && bodyFat <= 17) bodyFatrange = 'bf13to17';
		if (bodyFat > 18) bodyFatrange = 'bf18to22';
	}

	return bodyFatrange;
};

export const determinePRatio = (
	sex: string,
	calorieSurplus: number,
	bodyFat: number,
	fitnessLevel: string
): number => {
	const surplusClass = surplusTable[calorieSurplus];
	const bodyFatrange = getBodyFatRange(sex, bodyFat);

	return pRatios[sex][fitnessLevel][surplusClass][bodyFatrange];
};
