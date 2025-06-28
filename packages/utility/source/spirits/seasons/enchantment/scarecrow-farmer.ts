import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Boo;

export default new SeasonalSpirit({
	id: SpiritId.ScarecrowFarmer,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBoo1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBoo2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ScarecrowFarmerBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Mask", cosmetic: Cosmetic.ScarecrowFarmerMask },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBoo3,
				cost: { seasonalCandles: 10 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBoo4 },
			{
				name: "Hair",
				cosmetic: Cosmetic.ScarecrowFarmerHair,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ScarecrowFarmerBlessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ScarecrowFarmerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBoo1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBoo2, cost: { hearts: 4 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ScarecrowFarmerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ScarecrowFarmerMask,
				cost: { candles: 42 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ScarecrowFarmerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ScarecrowFarmerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteBoo3, cost: { hearts: 3 } },
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBoo4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ScarecrowFarmerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ScarecrowFarmerHair,
				cost: { candles: 34 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2022, 3, 31), end: skyDate(2022, 4, 4) },
			{ start: skyDate(2024, 7, 18), end: skyDate(2024, 7, 22) },
		],
	},
});
