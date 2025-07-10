import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Headbob;

export default new SeasonalSpirit({
	id: SpiritId.MellowMusician,
	seasonId: SeasonId.Performance,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteHeadbob1 },
			{ cosmetic: Cosmetic.EmoteHeadbob2 },
			{
				cosmetic: Cosmetic.MellowMusicianMask,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.MellowMusicianBlessing1 },
			{
				cosmetic: Cosmetic.MellowMusicianBlessing2,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.MellowMusicianCape },
			{
				cosmetic: Cosmetic.EmoteHeadbob3,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.EmoteHeadbob4 },
			{
				cosmetic: Cosmetic.MellowMusicianBlessing3,
				cost: { seasonalCandles: 22 },
			},
			{ cosmetic: Cosmetic.MellowMusicianElectricGuitar },
			{
				cosmetic: Cosmetic.MellowMusicianHair,
				cost: { seasonalCandles: 36 },
			},
			{ cosmetic: Cosmetic.MellowMusicianBlessing4 },
			{
				cosmetic: Cosmetic.MellowMusicianSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteHeadbob1 },
			{
				cosmetic: Cosmetic.EmoteHeadbob2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.MellowMusicianBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.MellowMusicianMask,
				cost: { candles: 32 },
			},
			{
				cosmetic: Cosmetic.MellowMusicianSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.MellowMusicianWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteHeadbob3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteHeadbob4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.MellowMusicianCape,
				cost: { candles: 70 },
			},
			{
				cosmetic: Cosmetic.MellowMusicianBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.MellowMusicianHair,
				cost: { candles: 42 },
			},
			{
				cosmetic: Cosmetic.MellowMusicianElectricGuitar,
				cost: { candles: 80 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 8, 1), end: skyDate(2024, 8, 5) }],
	},
});
