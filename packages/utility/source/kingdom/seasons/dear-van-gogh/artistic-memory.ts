import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.ArtisticMemory,
	seasonId: SeasonId.DearVanGogh,
	area: AreaName.StarryGallery,
	emote: SpiritEmote.Draw,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteDraw1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ArtisticMemoryBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 1 },
					cosmetic: Cosmetic.ArtisticMemoryProp1,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ArtisticMemoryBlessing2,
					cost: { seasonalCandles: 8 },
				},
				{
					cosmetic: Cosmetic.EmoteDraw2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteDraw3,
					cost: { seasonalCandles: 22 },
					level: 3,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ArtisticMemoryBlessing3,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.ArtisticMemoryHairAccessory,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ArtisticMemoryCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 2 },
					cosmetic: Cosmetic.ArtisticMemoryProp2,
					cost: { seasonalCandles: 28 },
				},
				null,
				{
					cosmetic: Cosmetic.EmoteDraw4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ArtisticMemorySeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
