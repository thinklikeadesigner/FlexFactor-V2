interface Exercise {
	[exerciseName: string]: Section;
}

interface Stats {
	[sex: string]: Exercise[];
}

export interface Section {
	beginner: number[];
	intermediate: number[];
	advanced: number[];
}

const stats: Stats = {
	femaleStats: [
		{
			benchPress: {
				beginner: [40, 80],
				intermediate: [81, 120],
				advanced: [121, Infinity]
			},
			pullups: {
				beginner: [0, 3],
				intermediate: [4, 10],
				advanced: [11, Infinity]
			},
			barbellSquat: {
				beginner: [50, 120],
				intermediate: [121, 180],
				advanced: [181, Infinity]
			},
			hipThrust: {
				beginner: [45, 155],
				intermediate: [156, 205],
				advanced: [206, Infinity]
			}
		},
		{
			benchPress: {
				beginner: [50, 90],
				intermediate: [91, 140],
				advanced: [141, Infinity]
			},
			pullups: {
				beginner: [0, 3],
				intermediate: [4, 10],
				advanced: [11, Infinity]
			},
			barbellSquat: {
				beginner: [60, 140],
				intermediate: [141, 205],
				advanced: [206, Infinity]
			},
			hipThrust: {
				beginner: [45, 180],
				intermediate: [181, 240],
				advanced: [241, Infinity]
			}
		},
		{
			benchPress: {
				beginner: [60, 105],
				intermediate: [106, 160],
				advanced: [161, Infinity]
			},
			pullups: {
				beginner: [0, 3],
				intermediate: [4, 10],
				advanced: [11, Infinity]
			},
			barbellSquat: {
				beginner: [60, 160],
				intermediate: [161, 230],
				advanced: [231, Infinity]
			},
			hipThrust: {
				beginner: [45, 210],
				intermediate: [211, 270],
				advanced: [271, Infinity]
			}
		}
	],
	maleStats: [
		{
			benchPress: {
				beginner: [100, 175],
				intermediate: [176, 210],
				advanced: [121, Infinity]
			},
			pullups: {
				beginner: [0, 45],
				intermediate: [46, 100],
				advanced: [101, Infinity]
			},
			barbellSquat: {
				beginner: [120, 195],
				intermediate: [196, 290],
				advanced: [291, Infinity]
			},
			hipThrust: {
				beginner: [85, 215],
				intermediate: [216, 305],
				advanced: [306, Infinity]
			}
		},
		{
			benchPress: {
				beginner: [100, 205],
				intermediate: [206, 240],
				advanced: [241, Infinity]
			},
			pullups: {
				beginner: [0, 45],
				intermediate: [46, 100],
				advanced: [101, Infinity]
			},
			barbellSquat: {
				beginner: [130, 225],
				intermediate: [226, 335],
				advanced: [336, Infinity]
			},
			hipThrust: {
				beginner: [95, 250],
				intermediate: [251, 350],
				advanced: [351, Infinity]
			}
		},
		{
			benchPress: {
				beginner: [100, 230],
				intermediate: [231, 275],
				advanced: [276, Infinity]
			},
			pullups: {
				beginner: [0, 45],
				intermediate: [46, 100],
				advanced: [101, Infinity]
			},
			barbellSquat: {
				beginner: [140, 250],
				intermediate: [251, 375],
				advanced: [376, Infinity]
			},
			hipThrust: {
				beginner: [110, 280],
				intermediate: [281, 400],
				advanced: [401, Infinity]
			}
		}
	]
};

export default stats;
