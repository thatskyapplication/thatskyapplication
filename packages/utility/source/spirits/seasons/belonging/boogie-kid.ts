import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.BoogieDance;

export default new SeasonalSpirit({
	id: SpiritId.BoogieKid,
	seasonId: SeasonId.Belonging,
	emote,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBoogieDance1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBoogieDance2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BoogieKidBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.BoogieKidBlessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBoogieDance3,
				cost: { seasonalCandles: 10 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBoogieDance4 },
			{
				name: "Mask",
				cosmetic: Cosmetic.BoogieKidMask,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.BoogieKidOutfit },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BoogieKidSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBoogieDance1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBoogieDance2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BoogieKidBlessing1,
				cost: { candles: 5 },
			},
			{ name: "Mask", cosmetic: Cosmetic.BoogieKidMask, cost: { candles: 30 } },
			{
				name: "Heart",
				cosmetic: Cosmetic.BoogieKidSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BoogieKidWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBoogieDance3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBoogieDance4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BoogieKidBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.BoogieKidOutfit,
				cost: { candles: 60 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 11, 12), end: skyDate(2020, 11, 16) },
			{ start: skyDate(2021, 7, 22), end: skyDate(2021, 7, 26) },
			{ start: skyDate(2023, 3, 2), end: skyDate(2023, 3, 6) },
			{ start: skyDate(2025, 6, 19), end: skyDate(2025, 6, 23) },
		],
	},
});
