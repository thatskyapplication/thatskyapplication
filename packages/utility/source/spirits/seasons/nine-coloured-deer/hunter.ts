import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Flex;

export default new SeasonalSpirit({
	id: SpiritId.Hunter,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteFlex1 },
				{ cosmetic: Cosmetic.EmoteFlex2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.HunterOutfit,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.HunterBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteFlex3,
					cost: { seasonalCandles: 20 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteFlex4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.HunterBlessing2,
					cost: { seasonalCandles: 28 },
				},
				{ translation: CosmeticCommon.Hair, cosmetic: Cosmetic.HunterHair, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.HunterCape,
					cost: { seasonalCandles: 34 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.HunterBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.HunterSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
