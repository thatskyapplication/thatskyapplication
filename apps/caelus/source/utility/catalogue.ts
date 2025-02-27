import {
	type Emoji,
	EventId,
	type EventIds,
	type ItemCost,
	SeasonId,
	type SeasonIds,
	resolveCurrencyEmoji,
} from "@thatskyapplication/utility";
import { EVENT_EMOJIS, MISCELLANEOUS_EMOJIS, SEASON_EMOJIS } from "./emojis.js";

export type RotationNumber = 1 | 2 | 3;
export const SEASONAL_CANDLES_PER_DAY = 5 as const;
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const SEASON_PASS_SEASONAL_CANDLES_BONUS = 30 as const;
export const NO_FRIENDSHIP_TREE_TEXT = "This spirit does not have a friendship tree." as const;
export const NO_FRIENDSHIP_TREE_YET_TEXT = "This spirit does not yet have an infographic." as const;

export const GUIDE_SPIRIT_IN_PROGRESS_TEXT =
	"This spirit's friendship tree has not been fully revealed." as const;

export const NO_EVENT_OFFER_TEXT = "There are no cosmetics for this event." as const;
export const NO_EVENT_INFOGRAPHIC_YET = "This event does not yet have an infographic." as const;

export const SeasonIdToSeasonalEmoji = {
	[SeasonId.Gratitude]: SEASON_EMOJIS.Gratitude,
	[SeasonId.Lightseekers]: SEASON_EMOJIS.Lightseekers,
	[SeasonId.Belonging]: SEASON_EMOJIS.Belonging,
	[SeasonId.Rhythm]: SEASON_EMOJIS.Rhythm,
	[SeasonId.Enchantment]: SEASON_EMOJIS.Enchantment,
	[SeasonId.Sanctuary]: SEASON_EMOJIS.Sanctuary,
	[SeasonId.Prophecy]: SEASON_EMOJIS.Prophecy,
	[SeasonId.Dreams]: SEASON_EMOJIS.Dreams,
	[SeasonId.Assembly]: SEASON_EMOJIS.Assembly,
	[SeasonId.LittlePrince]: SEASON_EMOJIS.LittlePrince,
	[SeasonId.Flight]: SEASON_EMOJIS.Flight,
	[SeasonId.Abyss]: SEASON_EMOJIS.Abyss,
	[SeasonId.Performance]: SEASON_EMOJIS.Performance,
	[SeasonId.Shattering]: SEASON_EMOJIS.Shattering,
	[SeasonId.AURORA]: SEASON_EMOJIS.Aurora,
	[SeasonId.Remembrance]: SEASON_EMOJIS.Remembrance,
	[SeasonId.Passage]: SEASON_EMOJIS.Passage,
	[SeasonId.Moments]: SEASON_EMOJIS.Moments,
	[SeasonId.Revival]: SEASON_EMOJIS.Revival,
	[SeasonId.NineColouredDeer]: SEASON_EMOJIS.NineColouredDeer,
	[SeasonId.Nesting]: SEASON_EMOJIS.Nesting,
	[SeasonId.Duets]: SEASON_EMOJIS.Duets,
	[SeasonId.Moomin]: SEASON_EMOJIS.Moomin,
	[SeasonId.Radiance]: SEASON_EMOJIS.Radiance,
} as const satisfies Readonly<Record<SeasonIds, Emoji>>;

export const SeasonIdToSeasonalCandleEmoji = {
	[SeasonId.Gratitude]: SEASON_EMOJIS.GratitudeCandle,
	[SeasonId.Lightseekers]: SEASON_EMOJIS.LightseekersCandle,
	[SeasonId.Belonging]: SEASON_EMOJIS.BelongingCandle,
	[SeasonId.Rhythm]: SEASON_EMOJIS.RhythmCandle,
	[SeasonId.Enchantment]: SEASON_EMOJIS.EnchantmentCandle,
	[SeasonId.Sanctuary]: SEASON_EMOJIS.SanctuaryCandle,
	[SeasonId.Prophecy]: SEASON_EMOJIS.ProphecyCandle,
	[SeasonId.Dreams]: SEASON_EMOJIS.DreamsCandle,
	[SeasonId.Assembly]: SEASON_EMOJIS.AssemblyCandle,
	[SeasonId.LittlePrince]: SEASON_EMOJIS.LittlePrinceCandle,
	[SeasonId.Flight]: SEASON_EMOJIS.FlightCandle,
	[SeasonId.Abyss]: SEASON_EMOJIS.AbyssCandle,
	[SeasonId.Performance]: SEASON_EMOJIS.PerformanceCandle,
	[SeasonId.Shattering]: SEASON_EMOJIS.ShatteringCandle,
	[SeasonId.AURORA]: SEASON_EMOJIS.AuroraCandle,
	[SeasonId.Remembrance]: SEASON_EMOJIS.RemembranceCandle,
	[SeasonId.Passage]: SEASON_EMOJIS.PassageCandle,
	[SeasonId.Moments]: SEASON_EMOJIS.MomentsCandle,
	[SeasonId.Revival]: SEASON_EMOJIS.RevivalCandle,
	[SeasonId.NineColouredDeer]: SEASON_EMOJIS.NineColouredDeerCandle,
	[SeasonId.Nesting]: SEASON_EMOJIS.NestingCandle,
	[SeasonId.Duets]: SEASON_EMOJIS.DuetsCandle,
	[SeasonId.Moomin]: SEASON_EMOJIS.MoominCandle,
	[SeasonId.Radiance]: SEASON_EMOJIS.RadianceCandle,
} as const satisfies Readonly<Record<SeasonIds, Emoji>>;

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
	[EventId.DaysOfTreasure2025]: null,
	[EventId.DaysOfBloom2025]: EVENT_EMOJIS.Bloom,
} as const satisfies Readonly<Record<EventIds, Emoji | null>>;

export function addCosts(items: ItemCost[]) {
	const result = items.reduce<Required<ItemCost>>(
		(
			total,
			{
				money = 0,
				candles = 0,
				hearts = 0,
				ascendedCandles = 0,
				seasonalCandles = [],
				seasonalHearts = [],
				eventTickets = [],
			},
		) => {
			total.money += Math.round(money * 100);
			total.candles += candles;
			total.hearts += hearts;
			total.ascendedCandles += ascendedCandles;

			for (const seasonalCandle of seasonalCandles) {
				const sameSeason = total.seasonalCandles.findIndex(
					({ seasonId }) => seasonId === seasonalCandle.seasonId,
				);

				if (sameSeason === -1) {
					// Prevents mutation.
					total.seasonalCandles.push({ ...seasonalCandle });
				} else {
					total.seasonalCandles.at(sameSeason)!.cost += seasonalCandle.cost;
				}
			}

			for (const seasonalHeart of seasonalHearts) {
				const sameSeason = total.seasonalHearts.findIndex(
					({ seasonId }) => seasonId === seasonalHeart.seasonId,
				);

				if (sameSeason === -1) {
					// Prevents mutation.
					total.seasonalHearts.push({ ...seasonalHeart });
				} else {
					total.seasonalHearts.at(sameSeason)!.cost += seasonalHeart.cost;
				}
			}

			for (const event of eventTickets) {
				const sameEvent = total.eventTickets.findIndex(({ eventId }) => eventId === event.eventId);

				if (sameEvent === -1) {
					// Prevents mutation.
					total.eventTickets.push({ ...event });
				} else {
					total.eventTickets.at(sameEvent)!.cost += event.cost;
				}
			}

			return total;
		},
		{
			money: 0,
			candles: 0,
			hearts: 0,
			ascendedCandles: 0,
			seasonalCandles: [],
			seasonalHearts: [],
			eventTickets: [],
		},
	);

	result.money /= 100;
	return result;
}

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
