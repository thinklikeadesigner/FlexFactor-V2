// Muscle gain rates are given as a range. Here, the values in the array represent the lower and upper bounds of that range.
interface MuscleGainRate {
	[sex: string]: {
		[level: string]: number[];
	};
}

const PERCENT_TO_DECIMAL = 0.01;
const ONE_MONTH_IN_WEEKS = 4.345;

const muscleGainRatePercentage: MuscleGainRate = {
	male: {
		beginner: [1, 1.5],
		intermediate: [0.5, 1.0],
		advanced: [0.25, 0.5]
	},

	female: {
		beginner: [0.5, 0.75],
		intermediate: [0.25, 0.5],
		advanced: [0.125, 0.25]
	}
};

const calculateMonthlyGains = (startingWeight: number, gainRate: number) => {
	return startingWeight * gainRate * PERCENT_TO_DECIMAL;
};

export const calculateTimeToGains = (
	sex: string,
	startingWeight: number,
	fitnessLevel: string,
	desiredGains: number
): number[] => {
	const gainRates = muscleGainRatePercentage[sex][fitnessLevel];

	const monthlyGainRates = gainRates.map((rate) => calculateMonthlyGains(startingWeight, rate));
	
	// Time to gains is returned in array in the format [worstCaseScenario, bestCaseScenario]
	const timeToGainsInWeeks = monthlyGainRates.map((monthlyGainRate) => Math.round(desiredGains / monthlyGainRate * ONE_MONTH_IN_WEEKS));
	
	// Returning the array in a more usable format.
	return timeToGainsInWeeks.reverse();
};
