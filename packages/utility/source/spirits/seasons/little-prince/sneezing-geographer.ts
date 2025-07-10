import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Sneeze;

export default new SeasonalSpirit({
	id: SpiritId.SneezingGeographer,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteSneeze1 },
			{ cosmetic: Cosmetic.EmoteSneeze2 },
			{
				cosmetic: Cosmetic.SneezingGeographerHair,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.SneezingGeographerBlessing1 },
			{
				cosmetic: Cosmetic.EmoteSneeze3,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.EmoteSneeze4 },
			{
				cosmetic: Cosmetic.SneezingGeographerBlessing2,
				cost: { seasonalCandles: 22 },
			},
			{ cosmetic: Cosmetic.SneezingGeographerCape },
			{
				cosmetic: Cosmetic.SneezingGeographerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteSneeze1 },
			{
				cosmetic: Cosmetic.EmoteSneeze2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.SneezingGeographerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.SneezingGeographerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.SneezingGeographerHair,
				cost: { candles: 40 },
			},
			{
				cosmetic: Cosmetic.SneezingGeographerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteSneeze3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteSneeze4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.SneezingGeographerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.SneezingGeographerCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 4, 13), end: skyDate(2023, 4, 17) }],
		returning: [8],
	},
});
