import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Grieving;

export default new SeasonalSpirit({
	id: SpiritId.BereftVeteran,
	seasonId: SeasonId.Remembrance,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteGrieving1 },
				{ cosmetic: Cosmetic.EmoteGrieving2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.BereftVeteranMask,
					cost: { seasonalCandles: 6 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BereftVeteranBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BereftVeteranBlessing2,
					cost: { seasonalCandles: 18 },
				},
				{ cosmetic: Cosmetic.BereftVeteranHair, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteGrieving3,
					cost: { seasonalCandles: 30 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteGrieving4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.BereftVeteranCape,
					cost: { seasonalCandles: 34 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.BereftVeteranBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.BereftVeteranSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteGrieving1 },
				{ cosmetic: Cosmetic.EmoteGrieving2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BereftVeteranBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.BereftVeteranMask,
					cost: { candles: 35 },
				},
				{
					cosmetic: Cosmetic.BereftVeteranSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.BereftVeternWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteGrieving3,
					cost: { hearts: 3 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteGrieving4, cost: { hearts: 6 }, level: 4 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BereftVeteranBlessing2,
					cost: { candles: 5 },
				},
				{ cosmetic: Cosmetic.BereftVeteranHair, cost: { candles: 60 } },
			],
			[
				{
					cosmetic: Cosmetic.BereftVeteranCape,
					cost: { candles: 80 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 5, 22), end: skyDate(2025, 5, 26) }],
	},
});
