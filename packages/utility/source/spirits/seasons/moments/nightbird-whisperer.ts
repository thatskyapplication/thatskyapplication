import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.NightbirdWhisperer,
	seasonId: SeasonId.Moments,
	call: Cosmetic.CallNightbird,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			[{ cosmetic: Cosmetic.CallNightbird }],
			[
				{
					cosmetic: Cosmetic.NightbirdWhispererHair,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.NightbirdWhispererBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.NightbirdWhispererBlessing2,
					cost: { seasonalCandles: 24 },
				},
				{
					cosmetic: Cosmetic.NightbirdWhispererHairAccessory,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.NightbirdWhispererOutfit,
					cost: { seasonalCandles: 28 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.NightbirdWhispererBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.NightbirdWhispererBlessing4,
					cost: { seasonalCandles: 36 },
				},
				{ cosmetic: Cosmetic.NightbirdWhispererShoes, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.NightbirdWhispererSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
