import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
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
			[
				{ cosmetic: Cosmetic.EmoteHeadbob1 },
				{ cosmetic: Cosmetic.EmoteHeadbob2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.MellowMusicianMask,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MellowMusicianBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MellowMusicianBlessing2,
					cost: { seasonalCandles: 14 },
				},
				{ cosmetic: Cosmetic.MellowMusicianCape, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteHeadbob3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteHeadbob4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.MellowMusicianBlessing3,
					cost: { seasonalCandles: 22 },
				},
				{ cosmetic: Cosmetic.MellowMusicianElectricGuitar, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.MellowMusicianHair,
					cost: { seasonalCandles: 36 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.MellowMusicianBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.MellowMusicianSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteHeadbob1 },
				{
					cosmetic: Cosmetic.EmoteHeadbob2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MellowMusicianBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.MellowMusicianMask,
					cost: { candles: 32 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.MellowMusicianSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.MellowMusicianWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteHeadbob3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteHeadbob4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					cosmetic: Cosmetic.MellowMusicianCape,
					cost: { candles: 70 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MellowMusicianBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.MellowMusicianHair,
					cost: { candles: 42 },
				},
			],
			[
				{
					cosmetic: Cosmetic.MellowMusicianElectricGuitar,
					cost: { candles: 80 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 8, 1), end: skyDate(2024, 8, 5) }],
	},
});
