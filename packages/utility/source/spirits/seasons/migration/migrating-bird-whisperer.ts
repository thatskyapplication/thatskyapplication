import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.MigratingBirdWhisperer,
	seasonId: SeasonId.Migration,
	emote: SpiritEmote.FlightRun,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteFlightRun1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MigratingBirdWhispererBlessing1,
					cost: { seasonalCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MigratingBirdWhispererBlessing2,
					cost: { seasonalCandles: 2 },
				},
				null,
				{
					cosmetic: Cosmetic.EmoteFlightRun2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteFlightRun3,
					cost: { seasonalCandles: 24 },
					level: 3,
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.MigratingBirdWhispererOutfit,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.MigratingBirdWhispererBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.MigratingBirdWhispererBlueDye,
					cost: { seasonalCandles: 12 },
				},
				{
					cosmetic: Cosmetic.MigratingBirdWhispererTrust,
				},
				{
					cosmetic: Cosmetic.EmoteFlightRun4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					cosmetic: Cosmetic.MigratingBirdWhispererCape,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					cosmetic: Cosmetic.MigratingBirdWhispererSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
