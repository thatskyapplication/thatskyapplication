import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.BellyScratch;

export default new SeasonalSpirit({
	id: SpiritId.ChillSunbather,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBellyScratch1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBellyScratch2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ChillSunbatherBlessing1,
				cost: { seasonalCandles: 16 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ChillSunbatherFaceAccessory,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBellyScratch3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBellyScratch4 },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.ChillSunbatherHairAccessory,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ChillSunbatherBlessing2 },
			{
				name: "Cape",
				cosmetic: Cosmetic.ChillSunbatherCape,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.ChillSunbatherBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ChillSunbatherSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBellyScratch1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBellyScratch2,
				cost: { hearts: 4 },
			},
			{
				name: "Sunlounger",
				cosmetic: Cosmetic.ChillSunbatherSunlounger,
				cost: { candles: 20 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ChillSunbatherBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ChillSunbatherFaceAccessory,
				cost: { candles: 66 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ChillSunbatherSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ChillSunbatherWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBellyScratch3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBellyScratch4,
				cost: { hearts: 6 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.ChillSunbatherHairAccessory,
				cost: { candles: 44 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ChillSunbatherBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ChillSunbatherCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 8, 19), end: skyDate(2021, 8, 23) },
			{ start: skyDate(2024, 1, 4), end: skyDate(2024, 1, 8) },
		],
	},
});
