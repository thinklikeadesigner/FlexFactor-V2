
    function NutritionCalculator() {
    }
    NutritionCalculator.calculateMacronutrients = function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        throw new Error('Method not implemented.');
    };
    NutritionCalculator.calculateBMR = function (weight, height, age, sex) {
        var weightInKg = weight / 2.20462;
        var heightInCm = height * 2.54;
        var bmr;
        if (sex === 'male') {
            bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
        }
        else {
            bmr = 10 * 65.77 + 6.25 * 163 - 5 * 29 - 161;
        }
        return Number(bmr.toFixed(2));
    };
    NutritionCalculator.calculateBMRWithBF1 = function (weight, height, age, sex, bf) {
        var leanMass = weight * (1 - bf);
        var fatMass = weight * bf;
        var bmrWithoutBF = NutritionCalculator.calculateBMR(weight, height, age, sex);
        var bmrWithBF = bmrWithoutBF * (1 + 0.4 * (bf - 0.25));
        var adjustedBMR = bmrWithBF + (500 * leanMass) / 454;
        return adjustedBMR;
    };
    NutritionCalculator.calculateBMRWithBF2 = function (weight, bf) {
        var leanMass = weight * (1 - bf);
        var bmr = 370 + 21.6 * (leanMass / 2.2);
        return bmr;
    };
    NutritionCalculator.calculateTDEE = function (bmr, activityLevel) {
        if (bmr && activityLevel) {
            var activityFactors = new Map([
                ['sedentary', 1.2],
                ['lightlyActive', 1.375],
                ['moderatelyActive', 1.55],
                ['veryActive', 1.725],
                ['extraActive', 1.9]
            ]);
            var level = activityFactors.get(activityLevel);
            if (level) {
                var tdee = bmr * level;
                return tdee;
            }
        }
        console.log('input invalid need bmr and/or activity level');
        return false;
    };
    NutritionCalculator.prototype.calculateMacronutrients = function (bmrType, weight, height, age, sex, bf, activityLevel) {
        if (bmrType === void 0) { bmrType = 'calculateBMRWithBF1'; }
        if (weight === void 0) { weight = 145; }
        if (height === void 0) { height = 64; }
        if (age === void 0) { age = 29; }
        if (sex === void 0) { sex = 'female'; }
        if (bf === void 0) { bf = 0.22; }
        if (activityLevel === void 0) { activityLevel = 'sedentary'; }
        var bmr;
        console.log({ bf: bf });
        if (bmrType == 'calculateBMRWithBF1' && bf) {
            console.log('s');
            bmr = NutritionCalculator.calculateBMRWithBF1(weight, height, age, sex, bf);
        }
        else if (bmrType == 'calculateBMRWithBF2' && bf) {
            console.log('a');
            bmr = NutritionCalculator.calculateBMRWithBF2(weight, bf);
        }
        else {
            console.log('f');
            bmr = NutritionCalculator.calculateBMR(weight, height, age, sex);
        }
        var tdee = Number(NutritionCalculator.calculateTDEE(bmr, activityLevel));
        var l = NutritionCalculator.calculateBMRWithBF2(145, 0.22);
        console.log({ tdee: tdee });
        var protein = Math.round(weight);
        var fat = Math.round((tdee * 0.25) / 9);
        var carb = Math.round((tdee - protein * 4 - fat * 9) / 4);
        var calories = protein * 4 + carb * 4 + fat * 9;
        return { protein: protein, fat: fat, carb: carb, calories: calories };
    };

var t = new NutritionCalculator();
console.log(t.calculateMacronutrients());
