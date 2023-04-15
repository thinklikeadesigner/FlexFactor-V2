class User {
	constructor(
		bmrFunction = 'calculateBMRWithBF1',
		weight = 145,
		height = 64,
		age = 29,
		sex = 'female',
		bf = 0.22,
		activityLevel = 'sedentary'
	) {
		this.bmrFunction = bmrFunction;
		this.weight = weight;
		this.height = height;
		this.age = age;
		this.sex = sex;
		this.bf = bf;
		this.activityLevel = activityLevel;
	}

	log() {
		console.log(
			this.bmrFunction,
			this.weight,
			this.height,
			this.age,
			this.sex,
			this.bf,
			this.activityLevel
		);
	}

	// add any additional methods here
}

export default User;
