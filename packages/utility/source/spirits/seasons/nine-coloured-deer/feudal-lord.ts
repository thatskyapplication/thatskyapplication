import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.CradleCarry;

export default new SeasonalSpirit({
	id: SpiritId.FeudalLord,
	seasonId: SeasonId.NineColouredDeer,
	action,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.FriendActionCradleCarry1 },
				{ cosmetic: Cosmetic.FriendActionCradleCarry2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.FeudalLordBlessing1,
					cost: { seasonalCandles: 6 },
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.FeudalLordHairAccessory,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.FeudalLordMask,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.FeudalLordBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.FeudalLordBlessing3,
					cost: { seasonalCandles: 26 },
				},
				{ translation: CosmeticCommon.Cape, cosmetic: Cosmetic.FeudalLordCape, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.FeudalLordMusicSheet,
					cost: { seasonalCandles: 32 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.FeudalLordBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.FeudalLordSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
