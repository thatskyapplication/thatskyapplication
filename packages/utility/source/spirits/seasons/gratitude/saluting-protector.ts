import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Acknowledge;

export default new SeasonalSpirit({
	id: SpiritId.SalutingProtector,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteAcknowledge1 },
				{ cosmetic: Cosmetic.EmoteAcknowledge2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.SalutingProtectorMusicSheet,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.SalutingProtectorBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteAcknowledge3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteAcknowledge4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.SalutingProtectorCape,
					cost: { seasonalCandles: 20 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.SalutingProtectorMask,
					cost: { hearts: 5 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteAcknowledge1 },
				{
					cosmetic: Cosmetic.EmoteAcknowledge2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SalutingProtectorBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.SalutingProtectorMusicSheet,
					cost: { candles: 15 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.SalutingProtectorHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.SalutingProtectorWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteAcknowledge3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteAcknowledge4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SalutingProtectorBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.SalutingProtectorCape,
					cost: { candles: 75 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.SalutingProtectorMask,
					cost: { candles: 42 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2022, 1, 20), end: skyDate(2022, 1, 24) },
			{ start: skyDate(2024, 11, 21), end: skyDate(2024, 11, 25) },
			{ start: skyDate(2024, 12, 9), end: skyDate(2024, 12, 12) },
		],
		travellingErrors: [1],
	},
});
