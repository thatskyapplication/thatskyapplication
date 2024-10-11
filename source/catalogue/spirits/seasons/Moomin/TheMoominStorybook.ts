import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import { MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Read;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new GuideSpirit({
	name: SpiritName.TheMoominStorybook,
	season: SeasonName.Moomin,
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
				emoji: emoteEmoji
			},
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteRead2,
				cost: { hearts: 3 },
				emoji: emoteEmoji
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.MoominPendant,
				emoji: 
			}
		]
	}
});
