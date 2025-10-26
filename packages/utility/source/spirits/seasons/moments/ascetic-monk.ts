import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.BlindfoldBalancePose;

export default new SeasonalSpirit({
	id: SpiritId.AsceticMonk,
	seasonId: SeasonId.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose1 },
				{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.AsceticMonkBlessing1,
					cost: { seasonalCandles: 6 },
				},
				{ translation: CosmeticCommon.Mask, cosmetic: Cosmetic.AsceticMonkMask, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.AsceticMonkHair,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.AsceticMonkBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBlindfoldBalancePose3,
					cost: { seasonalCandles: 26 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.AsceticMonkOutfit,
					cost: { seasonalCandles: 32 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.AsceticMonkBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.AsceticMonkSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
