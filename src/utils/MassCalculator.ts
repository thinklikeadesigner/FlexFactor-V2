const PERCENT_TO_DECIMAL = 0.01;


export const calculateFatMass = (weightInLbs: number, bodyFatPercent: number) => {
	return weightInLbs * bodyFatPercent * PERCENT_TO_DECIMAL;
};

export const calculateLeanMass = (weightInLbs: number, bodyFatPercent: number) => {
	return weightInLbs * (1 - bodyFatPercent * PERCENT_TO_DECIMAL);
};

