import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.CrabWalk;

export default new SeasonalSpirit({
	id: SpiritId.CrabWalker,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteCrabWalk1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteCrabWalk2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.CrabWalkerHair,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.CrabWalkerBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCrabWalk3,
				cost: { seasonalCandles: 14 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteCrabWalk4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CrabWalkerBlessing2,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Cape", cosmetic: Cosmetic.CrabWalkerCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.CrabWalkerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteCrabWalk1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteCrabWalk2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CrabWalkerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.CrabWalkerHair,
				cost: { candles: 42 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CrabWalkerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.CrabWalkerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCrabWalk3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteCrabWalk4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CrabWalkerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.CrabWalkerCape,
				cost: { candles: 60 },
			},
		],
	},
	visits: {
		travelling: [29, 83, 132],
		travellingErrors: [2],
	},
});
