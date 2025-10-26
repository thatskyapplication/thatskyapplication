import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.FloatSpin;

export default new SeasonalSpirit({
	id: SpiritId.Princess,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteFloatSpin1 },
				{ cosmetic: Cosmetic.EmoteFloatSpin2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.PrincessMask,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PrincessBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PrincessBlessing2,
					cost: { seasonalCandles: 18 },
				},
				{ translation: CosmeticCommon.Hair, cosmetic: Cosmetic.PrincessHair, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteFloatSpin3,
					cost: { seasonalCandles: 22 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteFloatSpin4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.PrincessOutfit,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.PrincessBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.PrincessBlessing4,
					cost: { seasonalCandles: 32 },
				},
				{ cosmetic: Cosmetic.PrincessCape, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.PrincessSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
