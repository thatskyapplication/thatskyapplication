import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.JellyWhisperer,
	seasonId: SeasonId.Sanctuary,
	call: Cosmetic.CallJellyfish,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			[{ cosmetic: Cosmetic.CallJellyfish }],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.JellyWhispererMusicSheet,
					cost: { seasonalCandles: 6 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.JellyWhispererBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.JellyWhispererHair,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.JellyWhispererBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.JellyWhispererBlessing3,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.JellyWhispererOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.JellyWhispererSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[{ cosmetic: Cosmetic.CallJellyfish }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.JellyWhispererBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.JellyWhispererMusicSheet,
					cost: { candles: 15 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.JellyWhispererSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.JellyWhispererWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.JellyWhispererBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.JellyWhispererUmbrella,
					cost: { hearts: 15 },
				},
				{
					cosmetic: Cosmetic.JellyWhispererHair,
					cost: { candles: 42 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.JellyWhispererOutfit,
					cost: { candles: 65 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 11, 25), end: skyDate(2021, 11, 29) },
			{ start: skyDate(2023, 8, 31), end: skyDate(2023, 9, 4) },
		],
	},
});
