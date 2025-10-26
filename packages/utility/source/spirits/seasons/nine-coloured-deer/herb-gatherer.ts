import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Whistle;

export default new SeasonalSpirit({
	id: SpiritId.HerbGatherer,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteWhistle1 },
				{ cosmetic: Cosmetic.EmoteWhistle2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.HerbGathererBlessing1,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.HerbGathererOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.HerbGathererHair,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.HerbGathererBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteWhistle3,
					cost: { seasonalCandles: 30 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteWhistle4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.HerbGathererProp,
					cost: { seasonalCandles: 36 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.HerbGathererBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.HerbGathererSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
