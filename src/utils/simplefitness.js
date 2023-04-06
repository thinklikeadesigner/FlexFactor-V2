// @ts-nocheck



/* eslint-disable @typescript-eslint/ban-ts-comment */

import stats from './stats.js'

class FitnessLevel {


  /**
   * @param {string} sex
   */
  constructor(sex) {
    if (sex == "female"){
    this.stats = stats.femaleStats;
  } else if (sex == "male"){
    this.stats = stats.maleStats
  } else {
        console.log("invalid sex, using default male")
    this.stats = stats.maleStats
  }}

  // @ts-ignore
  _checkWeightClass(weight) {
    let weightClass;
    if (weight < 125) {
      weightClass = 0;
    } else if (weight >= 125 && weight <= 155) {
      weightClass = 1;
    } else {
      weightClass = 2;
    }
    return weightClass;
  }

   // @ts-ignore
   getLevel(exercise, weight, oneRepMax) {
    let weightClass = this._checkWeightClass(weight)

    // @ts-ignore
    const section = this.stats[weightClass][exercise];
    if (!section) {
      return "invalid exercise";
    }
  
    const level = Object.keys(section).find((level) => {
      const [min, max] = section[level];
      return oneRepMax >= min && oneRepMax <= max;
    });
  
    return level ? level : "invalid weight";
  }

}

class NutritionCalculator {
  /**
 * @param {number} weight - The weight in pounds.
 * @param {number} height - The height in inches.
 * @param {number} age - The age in years.
 * @param {string} sex - The biological sex ('male' or 'female').
 * @returns {number} The BMR in calories per day.
   */

    // DONT CHANGE 
  static calculateBMR(weight, height, age, sex) {
    const weightInKg = weight / 2.20462;
    const heightInCm = height * 2.54;
    let bmr;
    if (sex === 'male') {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
    } else {
      bmr = 10 * 65.77 + 6.25 * 163 - 5 * 29 - 161;
    }
    return bmr.toFixed(2);
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
    const fatMass = weight * bf
    const bmrWithoutBF = this.calculateBMR(weight, height, age, sex);
    const bmrWithBF = bmrWithoutBF * (1 + (0.4 * (bf - 0.25)));
    const adjustedBMR = bmrWithBF + (500 * leanMass / 454);
    return adjustedBMR;
  }

      // Katch-McArdle formula
  //KatchMcArdle
    static calculateBMRWithBF2(weight, bf) {
      const leanMass = weight * (1 - bf);
    const bmr = 370 + (21.6 * (leanMass/2.2));
      return bmr;
    }

  // DONT CHANGE 
  /**
   * @param {number} bmr
   * @param {string | number} activityLevel
   */
  static calculateTDEE(bmr, activityLevel) {
    const activityFactors = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9
    };
    // @ts-ignore
    const tdee = bmr * activityFactors[activityLevel];
    return tdee;
  }

  
  /**
   * @param {number} weight
   * @param {any} height
   * @param {any} age
   * @param {any} sex
   * @param {any} activityLevel
   */
  // @ts-ignore
  static calculateMacronutrients({bmrFunction, weight, height, age, sex, bf = null, activityLevel}) {
let bmr;
console.log({bf})
// most accurate 
if (bmrFunction == 'calculateBMRWithBF1' && bf) {
  console.log('s')
  bmr = this.calculateBMRWithBF1(weight, height, age, sex, bf)
} else if (bmrFunction == 'calculateBMRWithBF2' && bf){
  console.log('a')

  bmr = this.calculateBMRWithBF2(weight, bf)
} else { 
  console.log('f')

  bmr = this.calculateBMR(weight, height, age, sex)
}
    // @ts-ignore
    const tdee = this.calculateTDEE(bmr, activityLevel);

    const l = this.calculateBMRWithBF2(145, 0.22)
    console.log({tdee})

    const protein = Math.round((weight) * 2.2);

    const fat = Math.round(tdee * 0.25 / 9);
    const carb = Math.round((tdee - (protein * 4) - (fat * 9)) / 4);
    const calories = (protein * 4) + (carb * 4) + (fat * 9)
    return { protein, fat, carb, calories };
  }


}

const macros = NutritionCalculator.calculateMacronutrients({bmrFunction: 'calculateBMRWithBF1', weight: 145, height: 64, age: 30,bf: 0.22, sex: 'female',  activityLevel: 'veryActive'});

console.log(macros)

  const female = new FitnessLevel("female")
  const male = new FitnessLevel("male")




//   const { bmr, tdee, fatMass, leanMass } = calculateBMR(145, 64, 29, 'female', 22, 1.4);
// console.log(`BMR: ${bmr} calories`);
// console.log(`TDEE: ${tdee} calories`);
// console.log(`Fat mass: ${fatMass} kg`);
// console.log(`Lean mass: ${leanMass} kg`);
// console.log(female.getLevel("benchPress", 145, 105))


  export {female, male}



