const calculateBMR = (weight: number, height: number, age: number, sex: string): number => {
	const weightInKg = weight / 2.20462;
	const heightInCm = height * 2.54;
	let bmr;
	if (sex === 'male') {
		bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
	} else {
		bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
	}
	return Number(bmr.toFixed(2));
};

const calculateBMRWithBF1 = (
	weight: number,
	height: number,
	age: number,
	sex: string,
	bf: number
): number => {
	bf = bf * 0.01;
	const leanMass = weight * (1 - bf);
	const bmrWithoutBF = calculateBMR(weight, height, age, sex);
	const bmrWithBF = bmrWithoutBF * (1 + 0.4 * (bf - 0.25));
	const adjustedBMR = bmrWithBF + (500 * leanMass) / 454;
	return adjustedBMR;
};

const calculateTDEE = (bmr: number, activityLevel: string): number | false => {
	if (bmr && activityLevel) {
		const activityFactors = new Map([
			['sedentary', 1.2],
			['lightlyActive', 1.375],
			['moderatelyActive', 1.55],
			['veryActive', 1.725],
			['extraActive', 1.9]
		]);
		const level = activityFactors.get(activityLevel);
		if (level) {
			const tdee = bmr * level;
			return tdee;
		}
	}
	console.log('input invalid need bmr and/or activity level');
	return false;
};

const calculateMacronutrients = (
	weight = 145,
	height = 64,
	age = 29,
	sex = 'female',
	bf = 0.22,
	activityLevel = 'sedentary'
): {
	protein: number;
	fat: number;
	carb: number;
	calories: number;
} => {
	const bmr = calculateBMRWithBF1(weight, height, age, sex, bf);
	const tdee = Number(calculateTDEE(bmr, activityLevel));

	const protein = Math.round(weight);

	const fat = Math.round((tdee * 0.25) / 9);
	const carb = Math.round((tdee - protein * 4 - fat * 9) / 4);
	const calories = protein * 4 + carb * 4 + fat * 9;
	console.log(bmr);
	return { protein, fat, carb, calories };
};

export { calculateMacronutrients, calculateTDEE, calculateBMR, calculateBMRWithBF1 };
