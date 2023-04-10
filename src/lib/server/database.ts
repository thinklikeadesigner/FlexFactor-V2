type FitnessLevel = {
	id: number;
	text: string;
	completed: boolean;
};

let fitnessLevels: FitnessLevel[] = [
	{
		id: Date.now(),
		text: 'Learn how forms work',
		completed: false
	}
];

export function getFitnessLevels() {
	return fitnessLevels;
}

export function addFitnessLevel(text: string) {
	const fitnessLevel: FitnessLevel = {
		id: Date.now(),
		text,
		completed: false
	};
	fitnessLevels = [...fitnessLevels, fitnessLevel];
}

export function removeFitnessLevel(id: number) {
	fitnessLevels = fitnessLevels.filter((fitnessLevel) => fitnessLevel.id !== id);
	return fitnessLevels;
}

export function clearFitnessLevels() {
	fitnessLevels = [];
}
