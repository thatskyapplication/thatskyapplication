import {
	type Emoji,
	EventId,
	type EventIds,
	type ItemCost,
	SeasonId,
	type SeasonIds,
	resolveCurrencyEmoji,
} from "@thatskyapplication/utility";
import {
	EVENT_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
} from "./emojis.js";

export const NO_FRIENDSHIP_TREE_TEXT = "This spirit does not have a friendship tree." as const;
export const NO_FRIENDSHIP_TREE_YET_TEXT = "This spirit does not yet have an infographic." as const;

export const GUIDE_SPIRIT_IN_PROGRESS_TEXT =
	"This spirit's friendship tree has not been fully revealed." as const;

export const NO_EVENT_OFFER_TEXT = "There are no cosmetics for this event." as const;
export const NO_EVENT_INFOGRAPHIC_YET = "This event does not yet have an infographic." as const;

const SeasonIdToSeasonalHeartEmoji = {
	[SeasonId.Belonging]: SEASON_EMOJIS.BelongingHeart,
	[SeasonId.Rhythm]: SEASON_EMOJIS.RhythmHeart,
	[SeasonId.Enchantment]: SEASON_EMOJIS.EnchantmentHeart,
	[SeasonId.Sanctuary]: SEASON_EMOJIS.SanctuaryHeart,
	[SeasonId.Prophecy]: SEASON_EMOJIS.ProphecyHeart,
	[SeasonId.Dreams]: SEASON_EMOJIS.DreamsHeart,
	[SeasonId.Assembly]: SEASON_EMOJIS.AssemblyHeart,
	[SeasonId.LittlePrince]: SEASON_EMOJIS.LittlePrinceHeart,
	[SeasonId.Flight]: SEASON_EMOJIS.FlightHeart,
	[SeasonId.Abyss]: SEASON_EMOJIS.AbyssHeart,
	[SeasonId.Performance]: SEASON_EMOJIS.PerformanceHeart,
	[SeasonId.Shattering]: SEASON_EMOJIS.ShatteringHeart,
	[SeasonId.AURORA]: SEASON_EMOJIS.AuroraHeart,
	[SeasonId.Remembrance]: SEASON_EMOJIS.RemembranceHeart,
	[SeasonId.Passage]: SEASON_EMOJIS.PassageHeart,
	[SeasonId.Moments]: SEASON_EMOJIS.MomentsHeart,
	[SeasonId.Revival]: SEASON_EMOJIS.RevivalHeart,
	[SeasonId.NineColouredDeer]: SEASON_EMOJIS.NineColouredDeerHeart,
	[SeasonId.Nesting]: SEASON_EMOJIS.NestingHeart,
	[SeasonId.Duets]: SEASON_EMOJIS.DuetsHeart,
	[SeasonId.Moomin]: SEASON_EMOJIS.MoominHeart,
	[SeasonId.Radiance]: SEASON_EMOJIS.RadianceHeart,
} as const satisfies Readonly<
	Record<Exclude<SeasonIds, typeof SeasonId.Gratitude | typeof SeasonId.Lightseekers>, Emoji>
>;

export const EventIdToEventTicketEmoji = {
	// 2019.
	[EventId.HalloweenOfficeEvent2019]: null,
	[EventId.DaysOfGiving2019]: null,
	[EventId.DaysOfFeast2019]: null,

	// 2020.
	[EventId.LunarNewYear2020]: null,
	[EventId.DaysOfLove2020]: null,
	[EventId.DaysOfSpring2020]: null,
	[EventId.DaysOfNature2020]: null,
	[EventId.DaysOfHealing2020]: null,
	[EventId.DaysOfRainbow2020]: null,
	[EventId.SkyAnniversary2020]: null,
	[EventId.DaysOfSummerLights2020]: null,
	[EventId.DaysOfMischief2020]: null,
	[EventId.DaysOfGiving2020]: null,
	[EventId.DaysOfFeast2020]: null,

	// 2021.
	[EventId.DaysOfFortune2021]: null,
	[EventId.DaysOfLove2021]: null,
	[EventId.DaysOfBloom2021]: null,
	[EventId.DaysOfNature2021]: null,
	[EventId.ChildrensDay2021]: null,
	[EventId.DaysOfRainbow2021]: null,
	[EventId.SkyAnniversary2021]: null,
	[EventId.DaysOfSummer2021]: null,
	[EventId.DaysOfSummerLights2021]: null,
	[EventId.DaysOfGiving2021]: null,
	[EventId.DaysOfMischief2021]: null,
	[EventId.DaysOfFeast2021]: null,

	// 2022.
	[EventId.DaysOfFortune2022]: null,
	[EventId.DaysOfLove2022]: null,
	[EventId.KizunaAI2022]: null,
	[EventId.DaysOfBloom2022]: null,
	[EventId.DaysOfNature2022]: null,
	[EventId.HarmonyHallGrandOpening2022]: null,
	[EventId.DaysOfRainbow2022]: null,
	[EventId.SkyAnniversary2022]: null,
	[EventId.DaysOfSunlight2022]: null,
	[EventId.LazyDays2022]: null,
	[EventId.DaysOfMischief2022]: null,
	[EventId.DaysOfGiving2022]: null,
	[EventId.DaysOfFeast2022]: null,

	// 2023.
	[EventId.DaysOfFortune2023]: null,
	[EventId.DaysOfLove2023]: null,
	[EventId.DaysOfBloom2023]: null,
	[EventId.DaysOfNature2023]: null,
	[EventId.DaysOfColour2023]: EVENT_EMOJIS.Colour,
	[EventId.DaysOfMusic2023]: EVENT_EMOJIS.Music,
	[EventId.SkyAnniversary2023]: EVENT_EMOJIS.SkyAnniversary,
	[EventId.AURORAEncoreConcerts2023]: EVENT_EMOJIS.AURORAEncore,
	[EventId.DaysOfSunlight2023]: EVENT_EMOJIS.Sunlight,
	[EventId.DaysOfStyle2023]: EVENT_EMOJIS.Style,
	[EventId.DaysOfMischief2023]: EVENT_EMOJIS.Mischief,
	[EventId.DaysOfGiving2023]: null,
	[EventId.AviarysFireworkFestival2023]: EVENT_EMOJIS.AviarysFireworkFestival,
	[EventId.DaysOfFeast2023]: EVENT_EMOJIS.Feast,

	// 2024.
	[EventId.DaysOfFortune2024]: EVENT_EMOJIS.Fortune,
	[EventId.DaysOfLove2024]: EVENT_EMOJIS.Love,
	[EventId.SpringCamping2024]: null,
	[EventId.DaysOfBloom2024]: EVENT_EMOJIS.Bloom,
	[EventId.SkyXCinnamorollPopUpCafe2024]: EVENT_EMOJIS.SkyXCinnamorollPopUpCafe,
	[EventId.DaysOfNature2024]: EVENT_EMOJIS.Nature,
	[EventId.DaysOfColour2024]: EVENT_EMOJIS.Colour,
	[EventId.SkyFest2024]: EVENT_EMOJIS.SkyFest,
	[EventId.TournamentOfTriumph2024]: EVENT_EMOJIS.TournamentOfTriumph,
	[EventId.DaysOfSunlight2024]: EVENT_EMOJIS.Sunlight,
	[EventId.DaysOfMoonlight2024]: EVENT_EMOJIS.Moonlight,
	[EventId.DaysOfStyle2024]: EVENT_EMOJIS.Style,
	[EventId.DaysOfMischief2024]: EVENT_EMOJIS.Mischief,
	[EventId.DaysOfMusic2024]: EVENT_EMOJIS.Music,
	[EventId.DaysOfGiving2024]: null,
	[EventId.SkyXAlicesWonderlandCafe2024]: EVENT_EMOJIS.Feast,

	// 2025.
	[EventId.DaysOfFortune2025]: EVENT_EMOJIS.Fortune,
	[EventId.DaysOfLove2025]: EVENT_EMOJIS.Love,
	[EventId.DaysOfTreasure2025]: EVENT_EMOJIS.Treasure,
	[EventId.DaysOfBloom2025]: EVENT_EMOJIS.Bloom,
} as const satisfies Readonly<Record<EventIds, Emoji | null>>;

export function resolveCostToString(cost: ItemCost) {
	const totalCost = [];

	if (cost.money) {
		totalCost.push(`$${cost.money} `);
	}

	if (cost.candles) {
		totalCost.push(
			resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Candle, number: cost.candles }),
		);
	}

	if (cost.hearts) {
		totalCost.push(
			resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: cost.hearts }),
		);
	}

	if (cost.ascendedCandles) {
		totalCost.push(
			resolveCurrencyEmoji({
				emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
				number: cost.ascendedCandles,
			}),
		);
	}

	if (cost.seasonalCandles) {
		for (const seasonalCandles of cost.seasonalCandles) {
			totalCost.push(
				resolveCurrencyEmoji({
					emoji: SeasonIdToSeasonalCandleEmoji[seasonalCandles.seasonId],
					number: seasonalCandles.cost,
				}),
			);
		}
	}

	if (cost.seasonalHearts) {
		for (const seasonalHearts of cost.seasonalHearts) {
			const { seasonId } = seasonalHearts;

			totalCost.push(
				resolveCurrencyEmoji({
					emoji:
						seasonId !== SeasonId.Gratitude && seasonId !== SeasonId.Lightseekers
							? SeasonIdToSeasonalHeartEmoji[seasonId]
							: MISCELLANEOUS_EMOJIS.SeasonalHeart,
					number: seasonalHearts.cost,
				}),
			);
		}
	}

	if (cost.eventTickets) {
		for (const event of cost.eventTickets) {
			totalCost.push(
				resolveCurrencyEmoji({
					emoji: EventIdToEventTicketEmoji[event.eventId] ?? MISCELLANEOUS_EMOJIS.EventTicket,
					number: event.cost,
				}),
			);
		}
	}

	return totalCost;
}

export const enum CatalogueType {
	StandardSpirits = 0,
	Elders = 1,
	SeasonalSpirits = 2,
	Events = 3,
	StarterPacks = 4,
	SecretArea = 5,
	PermanentEventStore = 6,
	NestingWorkshop = 7,
}
