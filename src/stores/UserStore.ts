import { persisted } from 'svelte-local-storage-store';

// First param `UserStore` is the local storage key.
// Second param is the initial value.
export const UserStore = persisted('UserStore', {
	currentWeight: 145,
	finalWeight: 149,
	sex: 'female',
	age: 29,
	initialBodyFatPercent: 22,
	activityLevel: 'sedentary',
	fitnessLevel: 'intermediate',
	calorieSurplus: 5,
	exerciseName: 'benchPress',
	heightInInches: 64,
	oneRepMax: 105,
	desiredGains: 5,
	pratio: 0.55,
	initialLeanMass: 0,
	initialFatMass: 0,
	finalLeanMass: 0,
	finalFatMass: 0,
	protein: 101,
	fat: 32,
	carb: 130,
	calories: 1700,
	dailySurplus: 200
});

export default UserStore;
