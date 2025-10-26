import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Somersault;

export default new SeasonalSpirit({
	id: SpiritId.TumblingTroublemaker,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteSomersault1 },
				{ cosmetic: Cosmetic.EmoteSomersault2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TumblingTroublemakerBlessing1,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TumblingTroublemakerHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSomersault3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteSomersault4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TumblingTroublemakerBlessing2,
					cost: { seasonalCandles: 28 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.TumblingTroublemakerCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.TumblingTroublemakerBlessing3,
					cost: { seasonalCandles: 32 },
				},
				{
					cosmetic: Cosmetic.TumblingTroublemakerHeadAccessory,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TumblingTroublemakerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteSomersault1 },
				{ cosmetic: Cosmetic.EmoteSomersault2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TumblingTroublemakerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TumblingTroublemakerHair,
					cost: { candles: 40 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.TumblingTroublemakerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.TumblingTroublemakerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSomersault3,
					cost: { hearts: 3 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteSomersault4, cost: { hearts: 6 }, level: 4 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TumblingTroublemakerBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.TumblingTroublemakerHeadAccessory,
					cost: { candles: 55 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.TumblingTroublemakerCape,
					cost: { candles: 80 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 4, 24), end: skyDate(2025, 4, 28) }],
	},
});
