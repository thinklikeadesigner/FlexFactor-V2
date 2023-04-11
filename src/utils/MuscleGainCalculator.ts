// Muscle gain rates are given as a range. Here, the values in the array represent the lower and upper bounds of that range.
interface MuscleGainRate {
	[sex: string]: {
		[level: string]: number[];
	};
}

const muscleGainRates: MuscleGainRate = {
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
	return startingWeight * gainRate;
};

export const calculateTimeToGains = (
	sex: string,
	startingWeight: number,
	fitnessLevel: string,
	desiredGains: number
): number[] => {
	const gainRates = muscleGainRates[sex][fitnessLevel];

	const monthlyGainRates = gainRates.map((rate) => calculateMonthlyGains(startingWeight, rate));

	const timeToGains = monthlyGainRates.map((monthlyGainRate) => desiredGains / monthlyGainRate);

	return timeToGains;
};
