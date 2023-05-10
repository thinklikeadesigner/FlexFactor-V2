const ONE_INCH_IN_CM = 2.54;
const ONE_POUND_IN_KG = 2.205;

const convertInchestoCm = (heightInInches: number) => {
	return Math.round(heightInInches * ONE_INCH_IN_CM);
};

const convertKgtoLbs = (weightInKg: number) => {
	return Math.round(weightInKg * ONE_POUND_IN_KG * 10) / 10;
};

const convertLbstoKg = (weightInLbs: number) => {
	return Math.round((weightInLbs / ONE_POUND_IN_KG) * 10) / 10;
};

export { convertInchestoCm, convertKgtoLbs, convertLbstoKg };
