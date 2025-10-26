import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.AURORA,
	seasonId: SeasonId.AURORA,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.AURORAQuest1,
				},
				{
					cosmetic: Cosmetic.EmoteSilentClap2,
					cost: { hearts: 3 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.AURORAPendant,
					seasonPass: true,
					thirdHeight: true,
					children: [
						{
							translation: CosmeticCommon.Hair,
							cosmetic: Cosmetic.AURORAAuroraHair,
							cost: { seasonalHearts: 1 },
							seasonPass: true,
						},
						{
							cosmetic: Cosmetic.AURORAUltimateOutfit,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
						{
							cosmetic: Cosmetic.AURORAUltimateCape,
							cost: { seasonalHearts: 1 },
							seasonPass: true,
						},
					],
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteSilentClap1 },
				{
					cosmetic: Cosmetic.EmoteSilentClap3,
					cost: { candles: 5 },
					level: 3,
					children: [
						{
							cosmetic: Cosmetic.EmoteSilentClap4,
							cost: { hearts: 5 },
							level: 4,
						},
					],
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.AURORAQuest2,
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteConduct1 },
				{
					cosmetic: Cosmetic.EmoteConduct2,
					cost: { hearts: 3 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.EmoteConduct3,
					cost: { candles: 5 },
					level: 3,
					children: [
						{
							cosmetic: Cosmetic.EmoteConduct4,
							cost: { hearts: 5 },
							level: 4,
						},
					],
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.AURORAQuest3,
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.AURORAHeart,
					cost: { candles: 3 },
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteSkipping1 },
				{
					cosmetic: Cosmetic.EmoteSkipping2,
					cost: { hearts: 3 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.EmoteSkipping3,
					cost: { candles: 5 },
					level: 3,
					children: [
						{
							cosmetic: Cosmetic.EmoteSkipping4,
							cost: { hearts: 5 },
							level: 4,
						},
					],
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.AURORAQuest4,
				},
				{
					translation: { key: CosmeticCommon.MusicSheetMultiple, number: 1 },
					cosmetic: Cosmetic.AURORAMusicSheet1,
					cost: { candles: 20 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.AURORAQuest5,
				},
				{
					translation: { key: CosmeticCommon.MusicSheetMultiple, number: 2 },
					cosmetic: Cosmetic.AURORAMusicSheet2,
					cost: { candles: 20 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.AURORAOutfit,
					cost: { candles: 200 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.AURORAMask,
					cost: { candles: 50 },
				},
			],
		],
	},
});
