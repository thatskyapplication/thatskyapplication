export const EventId = {
	// 2019.
	HalloweenOfficeEvent2019: 0,
	DaysOfGiving2019: 1,
	DaysOfFeast2019: 2,

	// 2020.
	LunarNewYear2020: 3,
	DaysOfLove2020: 4,
	DaysOfSpring2020: 5,
	DaysOfNature2020: 6,
	DaysOfHealing2020: 7,
	DaysOfRainbow2020: 8,
	SkyAnniversary2020: 9,
	DaysOfSummerLights2020: 10,
	DaysOfMischief2020: 11,
	DaysOfGiving2020: 12,
	DaysOfFeast2020: 13,

	// 2021.
	DaysOfFortune2021: 14,
	DaysOfLove2021: 15,
	DaysOfBloom2021: 16,
	DaysOfNature2021: 17,
	ChildrensDay2021: 18,
	DaysOfRainbow2021: 19,
	SkyAnniversary2021: 20,
	DaysOfSummer2021: 21,
	DaysOfSummerLights2021: 22,
	DaysOfGiving2021: 23,
	DaysOfMischief2021: 24,
	DaysOfFeast2021: 25,

	// 2022.
	DaysOfFortune2022: 26,
	DaysOfLove2022: 27,
	KizunaAI2022: 28,
	DaysOfBloom2022: 29,
	DaysOfNature2022: 30,
	HarmonyHallGrandOpening2022: 31,
	DaysOfRainbow2022: 32,
	SkyAnniversary2022: 33,
	DaysOfSunlight2022: 34,
	LazyDays2022: 35,
	DaysOfMischief2022: 36,
	DaysOfGiving2022: 37,
	DaysOfFeast2022: 38,

	// 2023.
	DaysOfFortune2023: 39,
	DaysOfLove2023: 40,
	DaysOfBloom2023: 41,
	DaysOfNature2023: 42,
	DaysOfColour2023: 43,
	DaysOfMusic2023: 44,
	SkyAnniversary2023: 45,
	AURORAEncoreConcerts2023: 46,
	DaysOfSunlight2023: 47,
	DaysOfStyle2023: 48,
	DaysOfMischief2023: 49,
	DaysOfGiving2023: 50,
	AviarysFireworkFestival2023: 51,
	DaysOfFeast2023: 52,

	// 2024.
	DaysOfFortune2024: 53,
	DaysOfLove2024: 54,
	SpringCamping2024: 55,
	DaysOfBloom2024: 56,
	SkyXCinnamorollPopUpCafe2024: 57,
	DaysOfNature2024: 58,
	DaysOfColour2024: 59,
	SkyFest2024: 60,
	TournamentOfTriumph2024: 61,
	DaysOfSunlight2024: 62,
	DaysOfMoonlight2024: 63,
	DaysOfStyle2024: 64,
	DaysOfMischief2024: 65,
	DaysOfMusic2024: 66,
	DaysOfGiving2024: 67,
	SkyXAlicesWonderlandCafe2024: 68,

	// 2025.
	DaysOfFortune2025: 69,
	DaysOfLove2025: 70,
	DaysOfTreasure2025: 71,
	DaysOfBloom2025: 72,
	DaysOfNature2025: 73,
	DaysOfColour2025: 74,
	AURORAHomecoming2025: 75,
	WorkshopShowAndTell2025: 76,
	SkyAnniversary2025: 77,
	DaysOfSunlight2025: 78,
	DaysOfMoonlight2025: 79,
	RadianceEvent2025: 80,
	DaysOfMischief2025: 81,
	DaysOfGiving2025: 82,
} as const satisfies Readonly<Record<string, number>>;

const EVENT_ID_VALUES = Object.values(EventId);
export type EventIds = (typeof EVENT_ID_VALUES)[number];

export function isEventId(eventId: number): eventId is EventIds {
	return EVENT_ID_VALUES.includes(eventId as EventIds);
}
