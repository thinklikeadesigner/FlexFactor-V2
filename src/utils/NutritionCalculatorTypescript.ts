export default class NutritionCalculator {
	static calculateMacronutrients(
		arg0: string,
		arg1: number,
		arg2: number,
		arg3: number,
		arg4: string,
		arg5: number,
		arg6: string
	) {
		throw new Error('Method not implemented.');
	}
	static calculateBMR(weight: number, height: number, age: number, sex: string): number {
		const weightInKg = weight / 2.20462;
		const heightInCm = height * 2.54;
		let bmr;
		if (sex === 'male') {
			bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
		} else {
			bmr = 10 * 65.77 + 6.25 * 163 - 5 * 29 - 161;
		}
		return Number(bmr.toFixed(2));
	}

	static calculateBMRWithBF1(
		weight: number,
		height: number,
		age: number,
		sex: string,
		bf: number
	): number {
		const leanMass = weight * (1 - bf);
		const fatMass = weight * bf;
		const bmrWithoutBF = NutritionCalculator.calculateBMR(weight, height, age, sex);
		const bmrWithBF = bmrWithoutBF * (1 + 0.4 * (bf - 0.25));
		const adjustedBMR = bmrWithBF + (500 * leanMass) / 454;
		return adjustedBMR;
	}

	static calculateBMRWithBF2(weight: number, bf: number): number {
		const leanMass = weight * (1 - bf);
		const bmr = 370 + 21.6 * (leanMass / 2.2);
		return bmr;
	}

	static calculateTDEE(bmr: number, activityLevel: string): number | false {
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
	}

	public calculateMacronutrients(
		bmrType = 'calculateBMRWithBF1',
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
	} {
		let bmr;
		console.log({ bf });
		if (bmrType == 'calculateBMRWithBF1' && bf) {
			console.log('s');
			bmr = NutritionCalculator.calculateBMRWithBF1(weight, height, age, sex, bf);
		} else if (bmrType == 'calculateBMRWithBF2' && bf) {
			console.log('a');
			bmr = NutritionCalculator.calculateBMRWithBF2(weight, bf);
		} else {
			console.log('f');
			bmr = NutritionCalculator.calculateBMR(weight, height, age, sex);
		}

		const tdee = Number(NutritionCalculator.calculateTDEE(bmr, activityLevel));

		const l = NutritionCalculator.calculateBMRWithBF2(145, 0.22);
		console.log({ tdee });

		const protein = Math.round(weight);

		const fat = Math.round((tdee * 0.25) / 9);
		const carb = Math.round((tdee - protein * 4 - fat * 9) / 4);
		const calories = protein * 4 + carb * 4 + fat * 9;
		return { protein, fat, carb, calories };
	}
}

const t = new NutritionCalculator();
console.log(t.calculateMacronutrients());
