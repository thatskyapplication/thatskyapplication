/* eslint-disable @typescript-eslint/prefer-literal-enum-member */
import { URL } from "node:url";
import type { Collection } from "discord.js";
import { WIKI_URL } from "./Constants.js";
import {
	type Emoji,
	type EventEmojis,
	type SeasonEmojis,
	EVENT_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	resolveCurrencyEmoji,
	SEASON_EMOJIS,
} from "./emojis.js";

export type RotationNumber = 1 | 2 | 3;
export const SEASONAL_CANDLES_PER_DAY = 5 as const;
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const SEASON_PASS_SEASONAL_CANDLES_BONUS = 30 as const;

export enum SeasonName {
	Gratitude = "Season of Gratitude",
	Lightseekers = "Season of Lightseekers",
	Belonging = "Season of Belonging",
	Rhythm = "Season of Rhythm",
	Enchantment = "Season of Enchantment",
	Sanctuary = "Season of Sanctuary",
	Prophecy = "Season of Prophecy",
	Dreams = "Season of Dreams",
	Assembly = "Season of Assembly",
	LittlePrince = "Season of the Little Prince",
	Flight = "Season of Flight",
	Abyss = "Season of Abyss",
	Performance = "Season of Performance",
	Shattering = "Season of Shattering",
	Aurora = "Season of AURORA",
	Remembrance = "Season of Remembrance",
	Passage = "The Season of Passage",
	Moments = "The Season of Moments",
	Revival = "Season of Revival",
	NineColoredDeer = "Season of the Nine-Colored Deer",
	Nesting = "Season of Nesting",
}

export const SEASON_NAME_VALUES = Object.values(SeasonName);

export const SeasonNameToSeasonalEmoji = {
	[SeasonName.Gratitude]: SEASON_EMOJIS.Gratitude,
	[SeasonName.Lightseekers]: SEASON_EMOJIS.Lightseekers,
	[SeasonName.Belonging]: SEASON_EMOJIS.Belonging,
	[SeasonName.Rhythm]: SEASON_EMOJIS.Rhythm,
	[SeasonName.Enchantment]: SEASON_EMOJIS.Enchantment,
	[SeasonName.Sanctuary]: SEASON_EMOJIS.Sanctuary,
	[SeasonName.Prophecy]: SEASON_EMOJIS.Prophecy,
	[SeasonName.Dreams]: SEASON_EMOJIS.Dreams,
	[SeasonName.Assembly]: SEASON_EMOJIS.Assembly,
	[SeasonName.LittlePrince]: SEASON_EMOJIS.LittlePrince,
	[SeasonName.Flight]: SEASON_EMOJIS.Flight,
	[SeasonName.Abyss]: SEASON_EMOJIS.Abyss,
	[SeasonName.Performance]: SEASON_EMOJIS.Performance,
	[SeasonName.Shattering]: SEASON_EMOJIS.Shattering,
	[SeasonName.Aurora]: SEASON_EMOJIS.Aurora,
	[SeasonName.Remembrance]: SEASON_EMOJIS.Remembrance,
	[SeasonName.Passage]: SEASON_EMOJIS.Passage,
	[SeasonName.Moments]: SEASON_EMOJIS.Moments,
	[SeasonName.Revival]: SEASON_EMOJIS.Revival,
	[SeasonName.NineColoredDeer]: SEASON_EMOJIS.NineColoredDeer,
	[SeasonName.Nesting]: SEASON_EMOJIS.Nesting,
} as const satisfies Readonly<Record<SeasonName, SeasonEmojis>>;

export const SeasonNameToSeasonalCandleEmoji = {
	[SeasonName.Gratitude]: SEASON_EMOJIS.GratitudeCandle,
	[SeasonName.Lightseekers]: SEASON_EMOJIS.LightseekersCandle,
	[SeasonName.Belonging]: SEASON_EMOJIS.BelongingCandle,
	[SeasonName.Rhythm]: SEASON_EMOJIS.RhythmCandle,
	[SeasonName.Enchantment]: SEASON_EMOJIS.EnchantmentCandle,
	[SeasonName.Sanctuary]: SEASON_EMOJIS.SanctuaryCandle,
	[SeasonName.Prophecy]: SEASON_EMOJIS.ProphecyCandle,
	[SeasonName.Dreams]: SEASON_EMOJIS.DreamsCandle,
	[SeasonName.Assembly]: SEASON_EMOJIS.AssemblyCandle,
	[SeasonName.LittlePrince]: SEASON_EMOJIS.LittlePrinceCandle,
	[SeasonName.Flight]: SEASON_EMOJIS.FlightCandle,
	[SeasonName.Abyss]: SEASON_EMOJIS.AbyssCandle,
	[SeasonName.Performance]: SEASON_EMOJIS.PerformanceCandle,
	[SeasonName.Shattering]: SEASON_EMOJIS.ShatteringCandle,
	[SeasonName.Aurora]: SEASON_EMOJIS.AuroraCandle,
	[SeasonName.Remembrance]: SEASON_EMOJIS.RemembranceCandle,
	[SeasonName.Passage]: SEASON_EMOJIS.PassageCandle,
	[SeasonName.Moments]: SEASON_EMOJIS.MomentsCandle,
	[SeasonName.Revival]: SEASON_EMOJIS.RevivalCandle,
	[SeasonName.NineColoredDeer]: SEASON_EMOJIS.NineColoredDeerCandle,
	[SeasonName.Nesting]: SEASON_EMOJIS.NestingCandle,
} as const satisfies Readonly<Record<SeasonName, SeasonEmojis>>;

export const SeasonNameToSeasonalHeartEmoji = {
	[SeasonName.Belonging]: SEASON_EMOJIS.BelongingHeart,
	[SeasonName.Rhythm]: SEASON_EMOJIS.RhythmHeart,
	[SeasonName.Enchantment]: SEASON_EMOJIS.EnchantmentHeart,
	[SeasonName.Sanctuary]: SEASON_EMOJIS.SanctuaryHeart,
	[SeasonName.Prophecy]: SEASON_EMOJIS.ProphecyHeart,
	[SeasonName.Dreams]: SEASON_EMOJIS.DreamsHeart,
	[SeasonName.Assembly]: SEASON_EMOJIS.AssemblyHeart,
	[SeasonName.LittlePrince]: SEASON_EMOJIS.LittlePrinceHeart,
	[SeasonName.Flight]: SEASON_EMOJIS.FlightHeart,
	[SeasonName.Abyss]: SEASON_EMOJIS.AbyssHeart,
	[SeasonName.Performance]: SEASON_EMOJIS.PerformanceHeart,
	[SeasonName.Shattering]: SEASON_EMOJIS.ShatteringHeart,
	[SeasonName.Aurora]: SEASON_EMOJIS.AuroraHeart,
	[SeasonName.Remembrance]: SEASON_EMOJIS.RemembranceHeart,
	[SeasonName.Passage]: SEASON_EMOJIS.PassageHeart,
	[SeasonName.Moments]: SEASON_EMOJIS.MomentsHeart,
	[SeasonName.Revival]: SEASON_EMOJIS.RevivalHeart,
	[SeasonName.NineColoredDeer]: SEASON_EMOJIS.NineColoredDeerHeart,
	[SeasonName.Nesting]: SEASON_EMOJIS.NestingHeart,
} as const satisfies Readonly<
	Record<Exclude<SeasonName, SeasonName.Gratitude | SeasonName.Lightseekers>, SeasonEmojis>
>;

enum SeasonFlags {
	Gratitude = 1 << 0,
	Lightseekers = 1 << 1,
	Belonging = 1 << 2,
	Rhythm = 1 << 3,
	Enchantment = 1 << 4,
	Sanctuary = 1 << 5,
	Prophecy = 1 << 6,
	Dreams = 1 << 7,
	Assembly = 1 << 8,
	LittlePrince = 1 << 9,
	Flight = 1 << 10,
	Abyss = 1 << 11,
	Performance = 1 << 12,
	Shattering = 1 << 13,
	Aurora = 1 << 14,
	Remembrance = 1 << 15,
	Passage = 1 << 16,
	Moments = 1 << 17,
	Revival = 1 << 18,
	NineColoredDeer = 1 << 19,
	Nesting = 1 << 20,
}

export const SeasonFlagsToSeasonName = {
	[SeasonFlags.Gratitude]: SeasonName.Gratitude,
	[SeasonFlags.Lightseekers]: SeasonName.Lightseekers,
	[SeasonFlags.Belonging]: SeasonName.Belonging,
	[SeasonFlags.Rhythm]: SeasonName.Rhythm,
	[SeasonFlags.Enchantment]: SeasonName.Enchantment,
	[SeasonFlags.Sanctuary]: SeasonName.Sanctuary,
	[SeasonFlags.Prophecy]: SeasonName.Prophecy,
	[SeasonFlags.Dreams]: SeasonName.Dreams,
	[SeasonFlags.Assembly]: SeasonName.Assembly,
	[SeasonFlags.LittlePrince]: SeasonName.LittlePrince,
	[SeasonFlags.Flight]: SeasonName.Flight,
	[SeasonFlags.Abyss]: SeasonName.Abyss,
	[SeasonFlags.Performance]: SeasonName.Performance,
	[SeasonFlags.Shattering]: SeasonName.Shattering,
	[SeasonFlags.Aurora]: SeasonName.Aurora,
	[SeasonFlags.Remembrance]: SeasonName.Remembrance,
	[SeasonFlags.Passage]: SeasonName.Passage,
	[SeasonFlags.Moments]: SeasonName.Moments,
	[SeasonFlags.Revival]: SeasonName.Revival,
	[SeasonFlags.NineColoredDeer]: SeasonName.NineColoredDeer,
	[SeasonFlags.Nesting]: SeasonName.Nesting,
} as const satisfies Readonly<Record<SeasonFlags, SeasonName>>;

export const SEASON_FLAGS_TO_SEASON_NAME_ENTRIES = Object.entries(SeasonFlagsToSeasonName);

export enum EventName {
	HalloweenOfficeEvent = "Halloween Office Event",
	DaysOfFeast = "Days of Feast",
	DaysOfLove = "Days of Love",
	DaysOfNature = "Days of Nature",
	DaysOfHealing = "Days of Healing",
	SkyAnniversary = "Sky Anniversary",
	DaysOfSummerLights = "Days of Summer Lights",
	DaysOfMischief = "Days of Mischief",
	DaysOfFortune = "Days of Fortune",
	DaysOfBloom = "Days of Bloom",
	DaysOfRainbow = "Days of Rainbow",
	DaysOfSummer = "Days of Summer",
	KizunaAI = "Kizuna AI",
	HarmonyHallGrandOpening = "Harmony Hall Grand Opening",
	DaysfSunlight = "Days of Sunlight",
	AviarysFireworkFestival = "Aviary's Firework Festival",
	SkyXCinnamorollPopUpCafe = "Sky × Cinnamoroll Pop-Up Cafe",
	DaysOfNature = "Days of Nature",
	DaysOfColour = "Days of Colour",
}

export enum EventNameUnique {
	// 2019.
	HalloweenOfficeEvent2019 = "Halloween Office Event 2019",
	DaysOfFeast2019 = "Days of Feast 2019",

	// 2020.
	DaysOfLove2020 = "Days of Love 2020",
	DaysOfNature2020 = "Days of Nature 2020",
	DaysOfHealing2020 = "Days of Healing 2020",
	SkyAnniversary2020 = "Sky Anniversary 2020",
	DaysOfSummerLights2020 = "Days of Summer Lights 2020",
	DaysOfMischief2020 = "Days of Mischief 2020",
	DaysOfFeast2020 = "Days of Feast 2020",

	// 2021.
	DaysOfFortune2021 = "Days of Fortune 2021",
	DaysOfLove2021 = "Days of Love 2021",
	DaysOfBloom2021 = "Days of Bloom 2021",
	DaysOfNature2021 = "Days of Nature 2021",
	DaysOfRainbow2021 = "Days of Rainbow 2021",
	SkyAnniversary2021 = "Sky Anniversary 2021",
	DaysOfSummer2021 = "Days of Summer 2021",
	DaysOfSummerLights2021 = "Days of Summer Lights 2021",
	DaysOfMischief2021 = "Days of Mischief 2021",
	DaysOfFeast2021 = "Days of Feast 2021",

	// 2022.
	DaysOfFortune2022 = "Days of Fortune 2022",
	DaysOfLove2022 = "Days of Love 2022",
	KizunaAI2022 = "Kizuna AI",
	DaysOfBloom2022 = "Days of Bloom 2022",
	DaysOfNature2022 = "Days of Nature 2022",
	HarmonyHallGrandOpening2022 = "Harmony Hall Grand Opening 2022",
	DaysOfRainbow2022 = "Days of Rainbow 2022",
	SkyAnniversary2022 = "Sky Anniversary 2022",
	DaysOfSunlight2022 = "Days of Sunlight 2022",
	DaysOfMischief2022 = "Days of Mischief 2022",
	DaysOfFeast2022 = "Days of Feast 2022",

	// 2023.
	DaysOfFortune2023 = "Days of Fortune 2023",
	DaysOfMischief2023 = "Days of Mischief 2023",
	AviarysFireworkFestival2023 = "Aviary's Firework Festival 2023",
	DaysOfFeast2023 = "Days of Feast 2023",

	// 2024.
	DaysOfFortune2024 = "Days of Fortune 2024",
	DaysOfLove2024 = "Days of Love 2024",
	DaysOfBloom2024 = "Days of Bloom 2024",
	SkyXCinnamorollPopUpCafe2024 = "Sky × Cinnamoroll Pop-Up Cafe 2024",
}

export const EventNameUniqueToEventName = {
	[EventNameUnique.HalloweenOfficeEvent2019]: EventName.HalloweenOfficeEvent,
	[EventNameUnique.DaysOfFeast2019]: EventName.DaysOfFeast,
	[EventNameUnique.DaysOfLove2020]: EventName.DaysOfLove,
	[EventNameUnique.DaysOfNature2020]: EventName.DaysOfNature,
	[EventNameUnique.DaysOfHealing2020]: EventName.DaysOfHealing,
	[EventNameUnique.SkyAnniversary2020]: EventName.SkyAnniversary,
	[EventNameUnique.DaysOfSummerLights2020]: EventName.DaysOfSummerLights,
	[EventNameUnique.DaysOfMischief2020]: EventName.DaysOfMischief,
	[EventNameUnique.DaysOfFeast2020]: EventName.DaysOfFeast,
	[EventNameUnique.DaysOfFortune2021]: EventName.DaysOfFortune,
	[EventNameUnique.DaysOfLove2021]: EventName.DaysOfLove,
	[EventNameUnique.DaysOfBloom2021]: EventName.DaysOfBloom,
	[EventNameUnique.DaysOfNature2021]: EventName.DaysOfNature,
	[EventNameUnique.DaysOfRainbow2021]: EventName.DaysOfRainbow,
	[EventNameUnique.SkyAnniversary2021]: EventName.SkyAnniversary,
	[EventNameUnique.DaysOfSummer2021]: EventName.DaysOfSummer,
	[EventNameUnique.DaysOfSummerLights2021]: EventName.DaysOfSummerLights,
	[EventNameUnique.DaysOfMischief2021]: EventName.DaysOfMischief,
	[EventNameUnique.DaysOfFeast2021]: EventName.DaysOfFeast,
	[EventNameUnique.DaysOfFortune2022]: EventName.DaysOfFortune,
	[EventNameUnique.DaysOfLove2022]: EventName.DaysOfLove,
	[EventNameUnique.KizunaAI2022]: EventName.KizunaAI,
	[EventNameUnique.DaysOfBloom2022]: EventName.DaysOfBloom,
	[EventNameUnique.DaysOfNature2022]: EventName.DaysOfNature,
	[EventNameUnique.HarmonyHallGrandOpening2022]: EventName.HarmonyHallGrandOpening,
	[EventNameUnique.DaysOfRainbow2022]: EventName.DaysOfRainbow,
	[EventNameUnique.SkyAnniversary2022]: EventName.SkyAnniversary,
	[EventNameUnique.DaysOfSunlight2022]: EventName.DaysfSunlight,
	[EventNameUnique.DaysOfMischief2022]: EventName.DaysOfMischief,
	[EventNameUnique.DaysOfFeast2022]: EventName.DaysOfFeast,
	[EventNameUnique.DaysOfFortune2023]: EventName.DaysOfFortune,
	[EventNameUnique.DaysOfMischief2023]: EventName.DaysOfMischief,
	[EventNameUnique.AviarysFireworkFestival2023]: EventName.AviarysFireworkFestival,
	[EventNameUnique.DaysOfFeast2023]: EventName.DaysOfFeast,
	[EventNameUnique.DaysOfFortune2024]: EventName.DaysOfFortune,
	[EventNameUnique.DaysOfLove2024]: EventName.DaysOfLove,
	[EventNameUnique.DaysOfBloom2024]: EventName.DaysOfBloom,
	[EventNameUnique.SkyXCinnamorollPopUpCafe2024]: EventName.SkyXCinnamorollPopUpCafe,
} as const satisfies Readonly<Record<EventNameUnique, EventName>>;

export const EVENT_NAME_VALUES = Object.values(EventName);

export const EventNameToEventCurrencyEmoji = {
	[EventName.HalloweenOfficeEvent]: EVENT_EMOJIS.Mischief,
	[EventName.DaysOfFeast]: EVENT_EMOJIS.Feast,
	[EventName.DaysOfLove]: EVENT_EMOJIS.Love,
	[EventName.DaysOfNature]: null,
	[EventName.DaysOfHealing]: null,
	[EventName.SkyAnniversary]: EVENT_EMOJIS.SkyAnniversary,
	[EventName.DaysOfSummerLights]: null,
	[EventName.DaysOfMischief]: EVENT_EMOJIS.Mischief,
	[EventName.DaysOfFortune]: EVENT_EMOJIS.Fortune,
	[EventName.DaysOfBloom]: EVENT_EMOJIS.Bloom,
	[EventName.DaysOfRainbow]: EVENT_EMOJIS.Colour,
	[EventName.DaysOfSummer]: EVENT_EMOJIS.Sunlight,
	[EventName.KizunaAI]: null,
	[EventName.HarmonyHallGrandOpening]: EVENT_EMOJIS.Music,
	[EventName.DaysfSunlight]: EVENT_EMOJIS.Sunlight,
	[EventName.AviarysFireworkFestival]: EVENT_EMOJIS.AviarysFireworkFestival,
	[EventName.SkyXCinnamorollPopUpCafe]: EVENT_EMOJIS.SkyXCinnamorollPopUpCafe,
} as const satisfies Readonly<Record<EventName, EventEmojis | null>>;

export function snakeCaseName(name: string) {
	return name.replaceAll(/[ '-]/g, "_").replaceAll(/[()]/g, "").replaceAll("×", "x").toLowerCase();
}

export function wikiURL(name: string) {
	return String(
		new URL((name.includes("(") ? name.slice(0, name.indexOf("(") - 1) : name).replaceAll(" ", "_"), WIKI_URL),
	);
}

export interface ItemCostRaw {
	money?: number;
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles?: number;
	seasonalHearts?: number;
	eventCurrency?: number;
}

export interface ItemCost {
	money?: number;
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles?: ItemCostSeasonal[];
	seasonalHearts?: ItemCostSeasonal[];
	eventCurrency?: ItemCostEvent[];
}

interface ItemCostSeasonal {
	cost: number;
	seasonName: SeasonName;
}

interface ItemCostEvent {
	cost: number;
	eventName: EventName;
}

export interface ItemRaw {
	name: string;
	cost: ItemCostRaw | null;
	emoji: Emoji;
}

export interface Item {
	name: string;
	cost: ItemCost | null;
	emoji: Emoji;
}

interface ResolveOfferOptions {
	seasonName?: SeasonName;
	eventName?: EventName;
}

export function resolveOffer(items: Collection<number, ItemRaw>, { seasonName, eventName }: ResolveOfferOptions = {}) {
	return items.mapValues((item) => {
		return {
			...item,
			cost: item.cost
				? {
						...item.cost,
						seasonalCandles:
							seasonName && item.cost.seasonalCandles ? [{ cost: item.cost.seasonalCandles, seasonName }] : [],
						seasonalHearts:
							seasonName && item.cost.seasonalHearts ? [{ cost: item.cost.seasonalHearts, seasonName }] : [],
						eventCurrency: eventName && item.cost.eventCurrency ? [{ cost: item.cost.eventCurrency, eventName }] : [],
				  }
				: null,
		};
	});
}

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
				eventCurrency = [],
			},
		) => {
			total.money += money * 100;
			total.candles += candles;
			total.hearts += hearts;
			total.ascendedCandles += ascendedCandles;

			for (const seasonalCandle of seasonalCandles) {
				const sameSeason = total.seasonalCandles.findIndex(
					({ seasonName }) => seasonName === seasonalCandle.seasonName,
				);

				if (sameSeason === -1) {
					// Prevents mutation.
					total.seasonalCandles.push({ ...seasonalCandle });
				} else {
					total.seasonalCandles.at(sameSeason)!.cost += seasonalCandle.cost;
				}
			}

			for (const seasonalHeart of seasonalHearts) {
				const sameSeason = total.seasonalHearts.findIndex(({ seasonName }) => seasonName === seasonalHeart.seasonName);

				if (sameSeason === -1) {
					// Prevents mutation.
					total.seasonalHearts.push({ ...seasonalHeart });
				} else {
					total.seasonalHearts.at(sameSeason)!.cost += seasonalHeart.cost;
				}
			}

			for (const event of eventCurrency) {
				const sameEvent = total.eventCurrency.findIndex(({ eventName }) => eventName === event.eventName);

				if (sameEvent === -1) {
					// Prevents mutation.
					total.eventCurrency.push({ ...event });
				} else {
					total.eventCurrency.at(sameEvent)!.cost += event.cost;
				}
			}

			return total;
		},
		{ money: 0, candles: 0, hearts: 0, ascendedCandles: 0, seasonalCandles: [], seasonalHearts: [], eventCurrency: [] },
	);

	result.money /= 100;
	return result;
}

export function resolveCostToString(cost: ItemCost) {
	const totalCost = [];
	if (cost.money) totalCost.push(`$${cost.money} `);

	if (cost.candles) {
		totalCost.push(resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Candle, number: cost.candles }));
	}

	if (cost.hearts) {
		totalCost.push(resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: cost.hearts }));
	}

	if (cost.ascendedCandles) {
		totalCost.push(resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.AscendedCandle, number: cost.ascendedCandles }));
	}

	if (cost.seasonalCandles) {
		for (const seasonalCandles of cost.seasonalCandles) {
			totalCost.push(
				resolveCurrencyEmoji({
					emoji: SeasonNameToSeasonalCandleEmoji[seasonalCandles.seasonName],
					number: seasonalCandles.cost,
				}),
			);
		}
	}

	if (cost.seasonalHearts) {
		for (const seasonalHearts of cost.seasonalHearts) {
			const { seasonName } = seasonalHearts;

			totalCost.push(
				resolveCurrencyEmoji({
					emoji:
						seasonName !== SeasonName.Gratitude && seasonName !== SeasonName.Lightseekers
							? SeasonNameToSeasonalHeartEmoji[seasonName]
							: MISCELLANEOUS_EMOJIS.SeasonalHeart,
					number: seasonalHearts.cost,
				}),
			);
		}
	}

	if (cost.eventCurrency) {
		for (const event of cost.eventCurrency) {
			totalCost.push(
				resolveCurrencyEmoji({
					emoji: EventNameToEventCurrencyEmoji[event.eventName] ?? MISCELLANEOUS_EMOJIS.EventCurrency,
					number: event.cost,
				}),
			);
		}
	}

	return totalCost;
}

export const enum CatalogueType {
	StandardSpirits,
	Elders,
	SeasonalSpirits,
	Events,
}
