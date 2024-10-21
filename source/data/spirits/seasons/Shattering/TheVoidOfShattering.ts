import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { CAPE_EMOJIS, MISCELLANEOUS_EMOJIS, NECKLACE_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.TheVoidOfShattering,
	seasonId: SeasonId.Shattering,
	offer: {
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.TheVoidofShatteringQuest1,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.TheVoidofShatteringHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.ShatteringPendant,
				emoji: NECKLACE_EMOJIS.Necklace21,
			},
			{
				name: "Manta cape",
				cosmetic: Cosmetic.TheVoidofShatteringMantaCape,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape87,
			},
			{
				name: "Dark dragon cape",
				cosmetic: Cosmetic.TheVoidofShatteringDarkDragonCape,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape84,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.TheVoidofShatteringQuest2,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.TheVoidofShatteringHeart2,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.TheVoidofShatteringQuest3,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.TheVoidofShatteringHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.TheVoidofShatteringQuest4,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.TheVoidofShatteringHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.TheVoidofShatteringQuest5,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 5",
				cosmetic: Cosmetic.TheVoidofShatteringHeart5,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.TheVoidofShatteringQuest6,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 6",
				cosmetic: Cosmetic.TheVoidofShatteringHeart6,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
		],
	},
});
