import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Leap;

export default new SeasonalSpirit({
	id: SpiritId.LeapingDancer,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteLeap1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteLeap2 },
			{
				name: "Small bell",
				cosmetic: Cosmetic.LeapingDancerSmallBell,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.LeapingDancerBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteLeap3,
				cost: { seasonalCandles: 14 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteLeap4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LeapingDancerBlessing2,
				cost: { seasonalCandles: 16 },
			},
			{
				name: "Fox mask",
				cosmetic: Cosmetic.LeapingDancerMask,
				cost: { hearts: 5 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteLeap1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteLeap2, cost: { hearts: 4 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LeapingDancerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Small bell",
				cosmetic: Cosmetic.LeapingDancerSmallBell,
				cost: { candles: 40 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LeapingDancingHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LeapingDancingWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteLeap3, cost: { hearts: 3 } },
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteLeap4, cost: { hearts: 6 } },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LeapingDancerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Fox mask",
				cosmetic: Cosmetic.LeapingDancerMask,
				cost: { candles: 54 },
			},
		],
	},
	keywords: ["fox", "fox mask"],
	visits: {
		travelling: [
			{ start: skyDate(2020, 6, 25), end: skyDate(2020, 6, 29) },
			{ start: skyDate(2021, 3, 18), end: skyDate(2021, 3, 22) },
			{ start: skyDate(2024, 6, 6), end: skyDate(2024, 6, 10) },
		],
		returning: [3],
	},
});
