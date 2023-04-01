// @ts-nocheck
/* eslint-disable @typescript-eslint/ban-ts-comment */
// FEMALE TRAINING STATUS CALCULATOR

/*
under 125lbs -> beginner(40 - 80lbs), intermediate(81-120), advanced(121-180)

125 - 155 -> beginner(50 - 90), intermediate(91 - 140), advanced(141-190)

155+ -> beginner(60 - 105), intermediate(106 - 160), advanced(161 - 200)


*/

import stats from './stats.js'

const {femaleStats, maleStats} = stats
class Fitness {
  constructor(stats) {
    this.stats = stats;

  }

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

    const section = this.stats[weightClass][exercise];
    if (!section) {
      return "invalid body part";
    }
  
    const level = Object.keys(section).find((level) => {
      const [min, max] = section[level];
      return oneRepMax >= min && oneRepMax <= max;
    });
  
    return level ? level : "invalid weight";
  }

}

const rebecca = new Fitness(femaleStats);

const john = new Fitness(maleStats);
console.log(rebecca.getLevel("benchPress", 145, 105)) // intermediate
console.log(rebecca.getLevel("barbellSquat", 145, 155)) // intermediate

console.log(john.getLevel("benchPress", 145, 60)) // beginner
console.log(john.getLevel("barbellSquat", 145, 100)) // beginner

function calculateBMR(weight, height, age, gender, bf, activityLevel = 1.2) {
    const weightInKg = weight / 2.20462;
    const heightInCm = height * 2.54;
    const fatMass = weightInKg * bf / 100;
    const leanMass = weightInKg - fatMass;
    
    let bmr;
    if (gender === 'male') {
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

function calculateMacronutrients(weight, height, age, gender, activityLevel) {
    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, activityLevel);
    const protein = Math.round(weight * 2.2);
    const fat = Math.round(tdee * 0.25 / 9);
    const carb = Math.round((tdee - (protein * 4) - (fat * 9)) / 4);
    return { protein, fat, carb };
  }
  
//   function calculateBMR(weight, height, age, gender) {
//     const heightInCm = height * 2.54;
//     const weightInKg = weight / 2.205;
//     const bmr = gender === 'male'
//       ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age)
//       : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
//     return bmr;
//   }
  
  function calculateTDEE(bmr, activityLevel) {
    const activityFactors = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9
    };
    const tdee = bmr * activityFactors[activityLevel];
    return tdee;
  }