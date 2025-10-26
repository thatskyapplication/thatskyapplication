import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.MigratingJellyWhisperer,
	seasonId: SeasonId.Migration,
	emote: SpiritEmote.JellyfishDance,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteJellyfishDance1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MigratingJellyWhispererBlessing1,
					cost: { seasonalCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MigratingJellyWhispererBlessing2,
					cost: { seasonalCandles: 4 },
				},
				null,
				{
					cosmetic: Cosmetic.EmoteJellyfishDance2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteJellyfishDance3,
					cost: { seasonalCandles: 24 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.MigratingJellyWhispererCyanDye,
					cost: { seasonalCandles: 9 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.MigratingJellyWhispererOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.MigratingJellyWhispererHairAccessory,
					cost: { seasonalCandles: 36 },
				},
				{
					cosmetic: Cosmetic.MigratingJellyWhispererTrust,
				},
				{
					cosmetic: Cosmetic.EmoteJellyfishDance4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.MigratingJellyWhispererBlessing3,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					cosmetic: Cosmetic.MigratingJellyWhispererSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
