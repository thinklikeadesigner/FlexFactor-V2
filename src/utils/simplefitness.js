


/* eslint-disable @typescript-eslint/ban-ts-comment */

import stats from './stats.js'

class Fitness {


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
  checkWeightClass(weight) {
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
    let weightClass = this.checkWeightClass(weight)

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


/**
 * @param {number} weight
 * @param {number} height
 * @param {number} age
 * @param {string} sex
 * @param {number | undefined} [bf]
 */
function calculateBMR(weight, height, age, sex, bf, activityLevel = 1.2) {
    const weightInKg = weight / 2.20462;
    const heightInCm = height * 2.54;
    // @ts-ignore
    const fatMass = weightInKg * bf / 100;
    const leanMass = weightInKg - fatMass;
    
    let bmr;
    if (sex === 'male') {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
    }
    
    const tdee = bmr * activityLevel;
    
    return {
      bmr: bmr.toFixed(2),
      tdee: tdee.toFixed(2),
      fatMass: fatMass.toFixed(2),
      leanMass: leanMass.toFixed(2),
    };
  }

  const { bmr, tdee, fatMass, leanMass } = calculateBMR(145, 64, 29, 'female', 22, 1.4);

console.log(`BMR: ${bmr} calories`);
console.log(`TDEE: ${tdee} calories`);
console.log(`Fat mass: ${fatMass} kg`);
console.log(`Lean mass: ${leanMass} kg`);

/**
 * @param {number} weight
 * @param {any} height
 * @param {any} age
 * @param {any} sex
 * @param {any} activityLevel
 */
// @ts-ignore
function calculateMacronutrients(weight, height, age, sex, activityLevel) {
    const bmr = calculateBMR(weight, height, age, sex);
    // @ts-ignore
    const tdee = calculateTDEE(bmr, activityLevel);
    const protein = Math.round(weight * 2.2);
    const fat = Math.round(tdee * 0.25 / 9);
    const carb = Math.round((tdee - (protein * 4) - (fat * 9)) / 4);
    return { protein, fat, carb };
  }
  
//   function calculateBMR(weight, height, age, sex) {
//     const heightInCm = height * 2.54;
//     const weightInKg = weight / 2.205;
//     const bmr = sex === 'male'
//       ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age)
//       : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
//     return bmr;
//   }
  
  /**
 * @param {number} bmr
 * @param {string | number} activityLevel
 */
  function calculateTDEE(bmr, activityLevel) {
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

  const female = new Fitness("female")
  const male = new Fitness("male")

  console.log(female.getLevel("benchPress", 145, 105))

  export {female, male}