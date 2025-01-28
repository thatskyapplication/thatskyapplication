import { RealmName } from "@thatskyapplication/utility";
import { SeasonId, SpiritName } from "@thatskyapplication/utility";
import { GuideSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";

export default new GuideSpirit({
	name: SpiritName.TheRose,
	seasonId: SeasonId.LittlePrince,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.TheRoseQuest1, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.TheRoseHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.LittlePrincePendant,
				emoji: NECKLACE_EMOJIS.Necklace13,
			},
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.TheRoseUltimateHair,
				cost: { seasonalHearts: 1 },
				emoji: HAIR_EMOJIS.Hair90,
			},
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.TheRoseUltimateOutfit,
				cost: { seasonalHearts: 2 },
				emoji: OUTFIT_EMOJIS.Outfit23,
			},
			{
				name: "Rose",
				cosmetic: Cosmetic.TheRoseRose,
				cost: { seasonalHearts: 1 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp05,
			},
			{ name: "Quest 2", cosmetic: Cosmetic.TheRoseQuest2, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.TheRoseHeart2,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 3", cosmetic: Cosmetic.TheRoseQuest3, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.TheRoseHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 4", cosmetic: Cosmetic.TheRoseQuest4, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.TheRoseHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 5", cosmetic: Cosmetic.TheRoseQuest5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 5",
				cosmetic: Cosmetic.TheRoseHeart5,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 6", cosmetic: Cosmetic.TheRoseQuest6, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 6",
				cosmetic: Cosmetic.TheRoseHeart6,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 7", cosmetic: Cosmetic.TheRoseQuest7, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 7",
				cosmetic: Cosmetic.TheRoseHeart7,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Sword outfit",
				cosmetic: Cosmetic.SwordOutfit,
				cost: { candles: 200 },
				emoji: OUTFIT_EMOJIS.Outfit22,
			},
		],
	},
});
