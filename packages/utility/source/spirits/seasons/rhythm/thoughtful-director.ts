import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Thinking;

export default new SeasonalSpirit({
	id: SpiritId.ThoughtfulDirector,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteThinking1 },
				{ cosmetic: Cosmetic.EmoteThinking2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ThoughtfulDirectorBlessing1,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ThoughtfulDirectorMask,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteThinking3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteThinking4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.ThoughtfulDirectorXylophone,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ThoughtfulDirectorBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ThoughtfulDirectorBlessing3,
					cost: { seasonalCandles: 22 },
				},
				{ cosmetic: Cosmetic.ThoughtfulDirectorCape, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.ThoughtfulDirectorSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteThinking1 },
				{
					cosmetic: Cosmetic.EmoteThinking2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ThoughtfulDirectorBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ThoughtfulDirectorMask,
					cost: { candles: 42 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ThoughtfulDirectorSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ThoughtfulDirectorWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteThinking3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteThinking4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ThoughtfulDirectorBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.ThoughtfulDirectorXylophone,
					cost: { candles: 65 },
				},
			],
			[
				{
					cosmetic: Cosmetic.ThoughtfulDirectorCape,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 5, 13), end: skyDate(2021, 5, 17) },
			{ start: skyDate(2022, 8, 4), end: skyDate(2022, 8, 8) },
			{ start: skyDate(2024, 6, 20), end: skyDate(2024, 6, 24) },
		],
		returning: [3],
	},
});
