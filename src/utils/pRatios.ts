
interface Ratios {
	[sex: string]: {
		[level: string]: {
			[surplus: string]: {
				[range: string]: number;
			};
		};
	}[];
}

export const pRatios: Ratios = {
	female: [
		{
			beginner: {
				surplus25: {
					bf12to19: 0.15,
					bf20to24: 0.229,
					bf25to31: 0.15,
					bf32to40: 0.1
				},
				surplus15: {
					bf12to19: 0.3,
					bf20to24: 0.381,
					bf25to31: 0.3,
					bf32to40: 0.25
				},
				surplus10: {
					bf12to19: 0.48,
					bf20to24: 0.58,
					bf25to31: 0.48,
					bf32to40: 0.4
				},
				surplus5: {
					bf12to19: 0.9,
					bf20to24: 0.95,
					bf25to31: 0.9,
					bf32to40: 0.8
				},
				surplus2: {
					bf12to19: 0.97,
					bf20to24: 0.97,
					bf25to31: 0.97,
					bf32to40: 0.97
				}
			}
		},
		{
			intermediate: {
				surplus25: {
					bf12to19: 0.07,
					bf20to24: 0.102,
					bf25to31: 0.07,
					bf32to40: 0.05
				},
				surplus15: {
					bf12to19: 0.12,
					bf20to24: 0.17,
					bf25to31: 0.12,
					bf32to40: 0.08
				},
				surplus10: {
					bf12to19: 0.25,
					bf20to24: 0.3,
					bf25to31: 0.25,
					bf32to40: 0.18
				},
				surplus5: {
					bf12to19: 0.45,
					bf20to24: 0.55,
					bf25to31: 0.45,
					bf32to40: 0.35
				},
				surplus2: {
					bf12to19: 0.5,
					bf20to24: 0.6,
					bf25to31: 0.5,
					bf32to40: 0.4
				}
			}
		},
		{
			advanced: {
				surplus25: {
					bf12to19: 0.03,
					bf20to24: 0.05,
					bf25to31: 0.03,
					bf32to40: 0.01
				},
				surplus15: {
					bf12to19: 0.05,
					bf20to24: 0.1,
					bf25to31: 0.07,
					bf32to40: 0.05
				},
				surplus10: {
					bf12to19: 0.12,
					bf20to24: 0.18,
					bf25to31: 0.12,
					bf32to40: 0.09
				},
				surplus5: {
					bf12to19: 0.22,
					bf20to24: 0.3,
					bf25to31: 0.22,
					bf32to40: 0.17
				},
				surplus2: {
					bf12to19: 0.3,
					bf20to24: 0.4,
					bf25to31: 0.3,
					bf32to40: 0.25
				}
			}
		}
	],
	male: [
		{
			beginner: {
				surplus25: {
					bf6to8: 0.15,
					bf9to12: 0.229,
					bf13to17: 0.15,
					bf18to22: 0.1
				},
				surplus15: {
					bf6to8: 0.3,
					bf9to12: 0.381,
					bf13to17: 0.3,
					bf18to22: 0.25
				},
				surplus10: {
					bf6to8: 0.48,
					bf9to12: 0.58,
					bf13to17: 0.48,
					bf18to22: 0.4
				},
				surplus5: {
					bf6to8: 0.9,
					bf9to12: 0.95,
					bf13to17: 0.9,
					bf18to22: 0.8
				},
				surplus2: {
					bf6to8: 0.97,
					bf9to12: 0.97,
					bf13to17: 0.97,
					bf18to22: 0.97
				}
			}
		},
		{
			intermediate: {
				surplus25: {
					bf6to8: 0.07,
					bf9to12: 0.102,
					bf13to17: 0.07,
					bf18to22: 0.05
				},
				surplus15: {
					bf6to8: 0.12,
					bf9to12: 0.17,
					bf13to17: 0.12,
					bf18to22: 0.08
				},
				surplus10: {
					bf6to8: 0.25,
					bf9to12: 0.3,
					bf13to17: 0.25,
					bf18to22: 0.18
				},
				surplus5: {
					bf6to8: 0.45,
					bf9to12: 0.55,
					bf13to17: 0.45,
					bf18to22: 0.35
				},
				surplus2: {
					bf6to8: 0.5,
					bf9to12: 0.6,
					bf13to17: 0.5,
					bf18to22: 0.4
				}
			}
		},
		{
			advanced: {
				surplus25: {
					bf6to8: 0.03,
					bf9to12: 0.05,
					bf13to17: 0.03,
					bf18to22: 0.01
				},
				surplus15: {
					bf6to8: 0.05,
					bf9to12: 0.1,
					bf13to17: 0.07,
					bf18to22: 0.05
				},
				surplus10: {
					bf6to8: 0.12,
					bf9to12: 0.18,
					bf13to17: 0.12,
					bf18to22: 0.09
				},
				surplus5: {
					bf6to8: 0.22,
					bf9to12: 0.3,
					bf13to17: 0.22,
					bf18to22: 0.17
				},
				surplus2: {
					bf6to8: 0.3,
					bf9to12: 0.4,
					bf13to17: 0.3,
					bf18to22: 0.25
				}
			}
		}
	]
};
