// desiredMuscleGain, totalWeightGain and initialBodyWeight are all calculated in lbs.

const PERCENT_TO_DECIMAL = 0.01;
const DECIMAL_TO_PERCENT = 100;

export const calculateBodyComposition = (
	desiredMuscleGain: number,
	totalWeightGain: number,
	initialBodyWeight: number,
	initialBodyFatPercent: number
) => {

    if (
    desiredMuscleGain < 0 ||
    desiredMuscleGain > 25 ||
    totalWeightGain < 0 ||
    totalWeightGain > 100 ||
    initialBodyWeight < 80 ||
    initialBodyFatPercent < 0 ||
    initialBodyFatPercent > 50 ||
    desiredMuscleGain > totalWeightGain
  ) {
    throw new Error(
      "Invalid input values"
    );
  }
	const finalWeight = initialBodyWeight + totalWeightGain;
	const startingFatMass = initialBodyWeight * initialBodyFatPercent * PERCENT_TO_DECIMAL;
	const fatMassGained = finalWeight - initialBodyWeight - desiredMuscleGain;
	const endingBodyFatPercent = (startingFatMass + fatMassGained) / finalWeight * DECIMAL_TO_PERCENT;

	return {

		endingWeight: Math.round(finalWeight * 100) / 100,
    fatGained: Math.round(fatMassGained * 100) / 100,
    endingBodyFatPercent: Math.round(endingBodyFatPercent * 100) / 100,
	};
};

