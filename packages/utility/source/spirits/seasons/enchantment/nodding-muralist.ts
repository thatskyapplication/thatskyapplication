import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Nod;

export default new SeasonalSpirit({
	id: SpiritId.NoddingMuralist,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteNod1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteNod2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.NoddingMuralistMask,
				cost: { seasonalCandles: 6 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.NoddingMuralistBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteNod3,
				cost: { seasonalCandles: 8 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteNod4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.NoddingMuralistBlessing2,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Hair", cosmetic: Cosmetic.NoddingMuralistHair },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NoddingMuralistSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteNod1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteNod2, cost: { hearts: 4 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.NoddingMuralistBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.NoddingMuralistMask,
				cost: { candles: 30 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.NoddingMuralistSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.NoddingMuralistWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteNod3, cost: { hearts: 3 } },
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteNod4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.NoddingMuralistBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.NoddingMuralistHair,
				cost: { candles: 34 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 1, 7), end: skyDate(2021, 1, 11) },
			{ start: skyDate(2022, 10, 27), end: skyDate(2022, 10, 31) },
		],
		returning: [5],
	},
});
