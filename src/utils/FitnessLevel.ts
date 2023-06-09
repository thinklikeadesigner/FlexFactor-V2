import stats, { type Section } from './stats';



const checkWeightClass = (weight: number): number => {
	let weightClass;
	if (weight < 125) {
		weightClass = 0;
	} else if (weight >= 125 && weight <= 155) {
		weightClass = 1;
	} else {
		weightClass = 2;
	}
	return weightClass;
};

const checkExercise = (exerciseName: string): string => {
	const regexbenchPress = /bench\s*press/i;
	const regexSquat = /squat|barbell\s*squat|back\s*squat|front\s*squat/i;
	const regexPullups = /pull\s*-?\s*ups?/i;
	const regexHipThrust = /hip\s*thrust/i;

	switch (true) {
		case regexbenchPress.test(exerciseName):
			return 'benchPress';
		case regexSquat.test(exerciseName):
			return 'barbellSquat';
		case regexPullups.test(exerciseName):
			return 'pullups';
		case regexHipThrust.test(exerciseName):
			return 'hipThrust';
		default:
			return 'The string does not contain any of the specified exercises.';
	}
};

const getFitnessLevel = (
	sex: string,
	exercise: string,
	weight: number,
	oneRepMax: number
): string => {
	const levelStats = sex === 'female' ? stats.femaleStats : stats.maleStats;
	const weightClass = checkWeightClass(weight);
	const validatedExercise = checkExercise(exercise);
	const section = levelStats[weightClass][validatedExercise];
	if (!section) {
		return 'invalid exercise';
	}

	const fitnessLevel = Object.keys(section).find((level) => {
		const [min, max]: number[] = section[level as keyof Section];
		if (min === null || max === null || min === undefined || max === undefined) {
			console.error('no min or max');
		} else {
			return oneRepMax >= min && oneRepMax <= max;
		}
		console.error('unkown error calculating level');
	});

	return fitnessLevel ? fitnessLevel : 'invalid weight';
};

export { getFitnessLevel };
