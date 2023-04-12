// total weight gained in lbs
// inputs: starting body weight, desired muscle gained in lbs, starting bf%
// p-ratio = Change in fat-free mass / change in total body mass
// outputs: desired muscle gains, ending body weight, fat gained, ending bf%

// const calculateEndingWeight = (totalWeightGain: number, initialBodyWeight: number) => {
// 	return totalWeightGain + initialBodyWeight;
// };

export const calculateFatGained = (
	desiredMuscleGain: number,
	totalWeightGain: number,
	initialBodyWeight: number,
	intialBodyFatPercent: number
) => {
	const endingWeight = initialBodyWeight + totalWeightGain;
	const startingFat = initialBodyWeight * intialBodyFatPercent;
	const fatGained = endingWeight - initialBodyWeight - desiredMuscleGain;
	const endingBodyFatPercent = (startingFat + fatGained) / endingWeight;

	return {
		desiredMuscleGain,
		endingWeight,
		fatGained,
		endingBodyFatPercent
	};
};
