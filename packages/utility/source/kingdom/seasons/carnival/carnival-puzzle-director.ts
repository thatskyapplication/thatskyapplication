import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.CarnivalPuzzleDirector,
	seasonId: SeasonId.Carnival,
	emote: SpiritEmote.TakeNotes,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteTakeNotes1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.CarnivalPuzzleDirectorBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					cosmetic: Cosmetic.MusicSheetAirship,
					cost: { seasonalCandles: 19 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.CarnivalPuzzleDirectorBlessing2,
					cost: { seasonalCandles: 7 },
				},
				{
					cosmetic: Cosmetic.EmoteTakeNotes2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteTakeNotes3,
					level: 3,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.CarnivalPuzzleDirectorBlessing3,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.CarnivalPuzzleDirectorOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.CarnivalPuzzleDirectorHeadAccessory,
					cost: { seasonalCandles: 28 },
				},
				{
					cosmetic: Cosmetic.CarnivalPuzzleDirectorTrust,
				},
				{
					cosmetic: Cosmetic.EmoteTakeNotes4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.CarnivalPuzzleDirectorHair,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.CarnivalPuzzleDirectorSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
