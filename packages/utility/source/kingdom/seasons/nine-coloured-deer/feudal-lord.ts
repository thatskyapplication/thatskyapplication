import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

const action = FriendAction.CradleCarry;

export default new SeasonalSpirit({
	id: SpiritId.FeudalLord,
	seasonId: SeasonId.NineColouredDeer,
	action,
	area: AreaName.CrescentOasis,
	offer: {
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
		current: [
			[
				{ cosmetic: Cosmetic.FriendActionCradleCarry1 },
				{ cosmetic: Cosmetic.FeudalLordMusicSheet, cost: { candles: 10 } },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.FeudalLordBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.FeudalLordHairAccessory,
					cost: { candles: 36 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.FeudalLordSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.FeudalLordWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.FeudalLordBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.FeudalLordCape,
					cost: { candles: 78 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.FeudalLordMask,
					cost: { candles: 42 },
				},
			],
		],
	},
	visits: {
		returning: [{ start: skyDate(2026, 8, 28), end: skyDate(2026, 9, 11) }],
	},
});
