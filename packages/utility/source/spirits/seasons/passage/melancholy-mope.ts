import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Moping;

export default new SeasonalSpirit({
	id: SpiritId.MelancholyMope,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IsleOfDawn,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteMoping1 },
				{ cosmetic: Cosmetic.EmoteMoping2, level: 2, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.MelancholyMopeHeadAccessory,
					cost: { seasonalCandles: 6 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MelancholyMopeBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MelancholyMopeBlessing2,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.MelancholyMopeHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteMoping3,
					cost: { seasonalCandles: 26 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteMoping4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.MelancholyMopeOutfit,
					cost: { seasonalCandles: 28 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.MelancholyMopeBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.MelancholyMopeSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{
					cosmetic: Cosmetic.EmoteMoping1,
				},
				{
					cosmetic: Cosmetic.EmoteMoping2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MelancholyMopeBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.MelancholyMopeHeadAccessory,
					cost: { candles: 35 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.MelancholyMopeSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.MelancholyMopeWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteMoping3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteMoping4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MelancholyMopeBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.MelancholyMopeHair,
					cost: { candles: 55 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.MelancholyMopeOutfit,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2026, 1, 29), end: skyDate(2026, 2, 2) }],
	},
});
