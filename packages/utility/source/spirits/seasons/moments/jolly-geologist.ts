import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.JollyDance;

export default new SeasonalSpirit({
	id: SpiritId.JollyGeologist,
	seasonId: SeasonId.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteJollyDance1 },
				{ cosmetic: Cosmetic.EmoteJollyDance2, level: 2, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.JollyGeologistFaceAccessory,
					cost: { seasonalCandles: 8 },
				},
				{ cosmetic: Cosmetic.JollyGeologistHair, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteJollyDance3,
					cost: { seasonalCandles: 20 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteJollyDance4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.JollyGeologistBlessing1,
					cost: { seasonalCandles: 28 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.JollyGeologistBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.JollyGeologistMusicSheet,
					cost: { seasonalCandles: 34 },
				},
				{ cosmetic: Cosmetic.JollyGeologistProp, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.JollyGeologistSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteJollyDance1 },
				{ cosmetic: Cosmetic.EmoteJollyDance2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.JollyGeologistBlessing1,
					cost: { candles: 5 },
				},
				{ cosmetic: Cosmetic.JollyGeologistProp, cost: { candles: 36 } },
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.JollyGeologistSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.JollyGeologistWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteJollyDance3,
					cost: { hearts: 3 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteJollyDance4, cost: { hearts: 6 }, level: 4 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.JollyGeologistBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.JollyGeologistFaceAccessory,
					cost: { candles: 42 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.JollyGeologistMusicSheet,
					cost: { candles: 15 },
				},
			],
			[{ cosmetic: Cosmetic.JollyGeologistHair, cost: { candles: 48 } }],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 7, 17), end: skyDate(2025, 7, 21) }],
	},
});
