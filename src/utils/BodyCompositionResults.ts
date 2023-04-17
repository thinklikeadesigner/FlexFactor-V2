// desiredMuscleGain, totalWeightGain and initialBodyWeight are all calculated in lbs.

const PERCENT_TO_DECIMAL = 0.01;
const DECIMAL_TO_PERCENT = 100;

export interface BodyComposition {
	totalWeightGain: number;
	endingWeight: number;
	fatGained: number;
	endingBodyFatPercent: number;
}

export const fatMass = (weight: number, bf: number) => {
	const result = weight * (bf * 0.01);
	return result.toFixed(2);
};

export const leanMass = (weight: number, bf: number) => {
	const result = weight * ((100 - bf) * 0.01);
	return result.toFixed(2);
};

export const calculateBodyComposition = (
	pRatio: number,
	desiredMuscleGain: number,
	initialBodyWeight: number,
	initialBodyFatPercent: number
): BodyComposition | 0 => {
	if (
		desiredMuscleGain < 0 ||
		desiredMuscleGain > 25 ||
		pRatio < 0 ||
		pRatio > 1 ||
		initialBodyWeight < 80 ||
		initialBodyFatPercent < 0 ||
		initialBodyFatPercent > 50
	) {
		return 0;
	}
	const totalWeightGain = desiredMuscleGain / pRatio;
	const finalWeight = initialBodyWeight + totalWeightGain;
	const startingFatMass = initialBodyWeight * initialBodyFatPercent * PERCENT_TO_DECIMAL;
	const fatMassGained = finalWeight - initialBodyWeight - desiredMuscleGain;
	const endingBodyFatPercent =
		((startingFatMass + fatMassGained) / finalWeight) * DECIMAL_TO_PERCENT;

	return {
		totalWeightGain: Math.round(totalWeightGain * 100) / 100,
		endingWeight: Math.round(finalWeight * 100) / 100,
		fatGained: Math.round(fatMassGained * 100) / 100,
		endingBodyFatPercent: Math.round(endingBodyFatPercent * 100) / 100
	};
};

