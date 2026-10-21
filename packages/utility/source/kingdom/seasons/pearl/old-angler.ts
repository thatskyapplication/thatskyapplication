import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.OldAngler,
	seasonId: SeasonId.Pearl,
	area: AreaName.PearlVillage,
	friendshipTrees: {
		seasonal: {
			friendshipTree: [
				[
					{
						cosmetic: Cosmetic.EmoteHesitate1,
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
						cosmetic: Cosmetic.OldAnglerBlessing1,
						cost: { seasonalCandles: 4 },
					},
				],
				[
					{
						cosmetic: Cosmetic.MusicSheetTheOldAngler,
						cost: { seasonalCandles: 18 },
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
						cosmetic: Cosmetic.OldAnglerBlessing2,
						cost: { seasonalCandles: 7 },
					},
					{
						cosmetic: Cosmetic.EmoteHesitate2,
						level: 2,
						seasonPass: true,
					},
				],
				[
					{
						cosmetic: Cosmetic.EmoteHesitate3,
						cost: { seasonalCandles: 28 },
						level: 3,
					},
					{
						translation: CosmeticCommon.WhiteDye,
						cosmetic: Cosmetic.OldAnglerWhiteDye,
						cost: { seasonalCandles: 8 },
					},
					{
						translation: CosmeticCommon.Mask,
						cosmetic: Cosmetic.OldAnglerMask,
						seasonPass: true,
					},
				],
				[
					{
						translation: CosmeticCommon.Outfit,
						cosmetic: Cosmetic.OldAnglerOutfit,
						cost: { seasonalCandles: 32 },
					},
					{ translation: CosmeticCommon.Trust, cosmetic: Cosmetic.OldAnglerTrust },
					{
						cosmetic: Cosmetic.EmoteHesitate4,
						level: 4,
						seasonPass: true,
					},
				],
				[
					null,
					null,
					{
						translation: CosmeticCommon.HairAccessory,
						cosmetic: Cosmetic.OldAnglerHairAccessory,
						seasonPass: true,
					},
				],
				[
					null,
					null,
					{
						translation: CosmeticCommon.SeasonalHeart,
						cosmetic: Cosmetic.OldAnglerSeasonalHeart,
						cost: { seasonalCandles: 3 },
						seasonPass: true,
					},
				],
			],
		},
	},
});
