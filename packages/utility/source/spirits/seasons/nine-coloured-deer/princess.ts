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
			{ cosmetic: Cosmetic.EmoteFloatSpin1 },
			{ cosmetic: Cosmetic.EmoteFloatSpin2 },
			{
				cosmetic: Cosmetic.PrincessMask,
				cost: { seasonalCandles: 8 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.PrincessBlessing1,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.PrincessBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.PrincessHair },
			{
				cosmetic: Cosmetic.EmoteFloatSpin3,
				cost: { seasonalCandles: 22 },
			},
			{ cosmetic: Cosmetic.EmoteFloatSpin4 },
			{
				cosmetic: Cosmetic.PrincessOutfit,
				cost: { seasonalCandles: 26 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.PrincessBlessing3,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
				cosmetic: Cosmetic.PrincessBlessing4,
				cost: { seasonalCandles: 32 },
			},
			{ cosmetic: Cosmetic.PrincessCape },
			{
				cosmetic: Cosmetic.PrincessSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
