import { writable } from 'svelte/store';

const UserStore = writable({
	height: 64,
	weight: 145,
	sex: 'female',
	age: 29,
	bf: 0.22,
	activityLevel: 'sedentary',
	fitnessLevel: 'intermediate',
	surplus: 5
});

export default UserStore;
