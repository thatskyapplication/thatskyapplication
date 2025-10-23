import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Welcome;

export default new SeasonalSpirit({
	id: SpiritId.TroupeGreeter,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteWelcome1 },
				{ cosmetic: Cosmetic.EmoteWelcome2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.TroupeGreeterMusicSheet,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.TroupeGreeterBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteWelcome3,
					cost: { seasonalCandles: 10 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteWelcome4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.TroupeGreeterMask,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TroupeGreeterOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TroupeGreeterSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteWelcome1 },
				{
					cosmetic: Cosmetic.EmoteWelcome2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TroupeGreeterBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.TroupeGreeterMusicSheet,
					cost: { candles: 15 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.TroupeGreeterSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.TroupeGreeterWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteWelcome3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteWelcome4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TroupeGreeterBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TroupeGreeterOutfit,
					cost: { candles: 70 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.TroupeGreeterMask,
					cost: { candles: 48 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 12, 24), end: skyDate(2020, 12, 28) },
			{ start: skyDate(2022, 3, 3), end: skyDate(2022, 3, 7) },
			{ start: skyDate(2025, 1, 2), end: skyDate(2025, 1, 6) },
		],
		returning: [4],
	},
});
