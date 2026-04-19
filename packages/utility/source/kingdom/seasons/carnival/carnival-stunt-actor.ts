import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.CarnivalStuntActor,
	seasonId: SeasonId.Carnival,
	emote: SpiritEmote.Approve,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteApprove1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.CarnivalStuntActorBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.CarnivalStuntActorCape,
					cost: { seasonalCandles: 19 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.CarnivalStuntActorBlessing2,
					cost: { seasonalCandles: 7 },
				},
				{
					cosmetic: Cosmetic.EmoteApprove2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteApprove3,
					level: 3,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.CarnivalStuntActorBlessing3,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.CarnivalStuntActorOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.CarnivalStuntActorHair,
					cost: { seasonalCandles: 28 },
				},
				{
					cosmetic: Cosmetic.CarnivalStuntActorTrust,
				},
				{
					cosmetic: Cosmetic.EmoteApprove4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.CarnivalStuntActorHairAccessory,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.CarnivalStuntActorSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
