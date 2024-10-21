import { GuideSpirit } from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.EnchantmentGuide,
	seasonId: SeasonId.Enchantment,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographic: false,
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.EnchantmentGuideQuest1,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.EnchantmentGuideHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Pendant", cosmetic: Cosmetic.EnchantmentPendant, emoji: NECKLACE_EMOJIS.Necklace05 },
			{
				name: "Ultimate face accessory",
				cosmetic: Cosmetic.EnchantmentUltimateFaceAccessory,
				cost: { seasonalHearts: 2 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory09,
			},
			{
				name: "Turban",
				cosmetic: Cosmetic.EnchantmentTurban,
				cost: { seasonalHearts: 4 },
				emoji: HAIR_EMOJIS.Hair59,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.EnchantmentGuideQuest2,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.EnchantmentGuideHeart2,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.EnchantmentGuideQuest3,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.EnchantmentGuideHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.EnchantmentGuideQuest4,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.EnchantmentGuideHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.EnchantmentGuideQuest5,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 5",
				cosmetic: Cosmetic.EnchantmentGuideHeart5,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.EnchantmentGuideQuest6,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 6",
				cosmetic: Cosmetic.EnchantmentGuideHeart6,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.EnchantmentGuideHug,
				emoji: FRIEND_ACTION_EMOJIS.Hug,
			},
		],
	},
});
