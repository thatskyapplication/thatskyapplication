import { GuideSpirit } from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Read;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new GuideSpirit({
	name: SpiritName.TheMoominStorybook,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		inProgress: true,
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
		],
	},
});
