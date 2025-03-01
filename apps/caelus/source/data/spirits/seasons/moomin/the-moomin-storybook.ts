import {
	Cosmetic,
	GuideSpirit,
	RealmName,
	SeasonId,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";
import {
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Read;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new GuideSpirit({
	id: SpiritId.TheMoominStorybook,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.TheMoominStorybookQuest1,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: `${emote} 1`,
				cosmetic: Cosmetic.EmoteRead1,
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteRead2,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.MoominPendant,
				emoji: NECKLACE_EMOJIS.Necklace42,
			},
			{
				name: "Ultimate umbrella",
				cosmetic: Cosmetic.TheMoominStorybookUltimateUmbrella,
				cost: { seasonalHearts: 1 },
				emoji: HELD_PROPS_EMOJIS.HeldProp47,
			},
			{
				name: "Ultimate plush",
				cosmetic: Cosmetic.TheMoominStorybookUltimatePlush,
				cost: { seasonalHearts: 1 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp80,
			},
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.TheMoominStorybookUltimateOutfit,
				cost: { seasonalHearts: 2 },
				emoji: OUTFIT_EMOJIS.Outfit70,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.TheMoominStorybookQuest2,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.TheMoominStorybookQuest3,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.TheMoominStorybookHeart1,
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.TheMoominStorybookQuest4,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRead3,
				cost: { candles: 5 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteRead4,
				cost: { hearts: 5 },
				emoji: emoteEmoji,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.TheMoominStorybookQuest5,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.TheMoominStorybookQuest6,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.TheMoominStorybookHeart2,
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.TheMoominStorybookProp,
				cost: { candles: 35 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp85,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TheMoominStorybookOutfit,
				cost: { candles: 190 },
				emoji: OUTFIT_EMOJIS.Outfit73,
			},
		],
	},
});
