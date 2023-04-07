 class NutritionCalculator {

	// DONT CHANGE
	/**
	 * @param {number} weight
	 * @param {number} height
	 * @param {number} age
	 * @param {string} sex
	 */
	static calculateBMR(weight, height, age, sex) {
		const weightInKg = weight / 2.20462;
		const heightInCm = height * 2.54;
		let bmr;
		if (sex === 'male') {
			bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
		} else {
			bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
		}
		return Number(bmr.toFixed(2));
	}
	// DONT CHANGE
	/**
	 * Calculates BMR (Basal Metabolic Rate) using the Mifflin-St Jeor equation, adjusted for body fat percentage.This function uses the Mifflin-St Jeor equation to calculate the BMR without taking into account body fat percentage, and then adjusts the BMR based on the individual's body fat percentage and lean body mass. The adjusted BMR is then further increased by adding 500 calories per day for every pound of lean body mass.
	 * @param {number} weight - The weight in pounds.
	 * @param {number} height - The height in inches.
	 * @param {number} age - The age in years.
	 * @param {string} sex - The biological sex ('male' or 'female').
	 * @param {number} bf - The body fat percentage (as a decimal).
	 * @returns {number} The BMR in calories per day.
	 */
	static calculateBMRWithBF1(weight, height, age, sex, bf) {
		const leanMass = weight * (1 - bf);
		const bmrWithoutBF = this.calculateBMR(weight, height, age, sex);
		const bmrWithBF = bmrWithoutBF * (1 + 0.4 * (bf - 0.25));
		const adjustedBMR = bmrWithBF + (500 * leanMass) / 454;
		return adjustedBMR;
	}

	/**Katch-McArdle formula
	 * @param {number} weight - The weight in pounds.
	 * @param {number} bf - The body fat percentage (as a decimal).
	 * @returns {number} The BMR in calories per day.
	 */
	static calculateBMRWithBF2(weight, bf) {
		const leanMass = weight * (1 - bf);
		const bmr = 370 + 21.6 * (leanMass / 2.2);
		return bmr;
	}

	// DONT CHANGE
	/**
	 * @param {number} bmr
	 * @param { string} activityLevel
	 */
	static calculateTDEE(bmr, activityLevel) {
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
		console.error('input invalid need bmr and/or activity level');
		return false;
	}

	/**
	 * notes: 0.7 - 1.4 g protein per lb bodyweight
	 */

	/**
	 *
	 * @param {number} weight - The weight in pounds.
	 * @param {number} height - The height in inches.
	 * @param {number} age - The age in years.
	 * @param {string} sex - The biological sex ('male' or 'female').
	 * @param {number | null} bf - The body fat percentage (as a decimal).
	 * @param {string } activityLevel
	 * @returns {object} macros -  protein, fat, carb, calories
	 */
	static calculateMacronutrients(
		bmrType = 'calculateBMRWithBF1',
		weight = 145,
		height = 64,
		age = 29,
		sex = 'female',
		bf = 0.12,
		activityLevel = 'sedentary'
	) {
		let bmr;
		// most accurate
		if (bmrType == 'calculateBMRWithBF1' && bf) {
			bmr = this.calculateBMRWithBF1(weight, height, age, sex, bf);
		} else if (bmrType == 'calculateBMRWithBF2' && bf) {
			bmr = this.calculateBMRWithBF2(weight, bf);
		} else {
			bmr = this.calculateBMR(weight, height, age, sex);
		}
		
		// tdee = calculate total daily calorie needs
		const tdee = Number(this.calculateTDEE(bmr, activityLevel));

		// macro calcculations from tdee
		const protein = Math.round(weight);

		const fat = Math.round((tdee * 0.25) / 9);
		const carb = Math.round((tdee - protein * 4 - fat * 9) / 4);
		const calories = protein * 4 + carb * 4 + fat * 9;
		return { protein, fat, carb, calories };
	}


}



export { NutritionCalculator};
