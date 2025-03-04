import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Read;

export default new GuideSpirit({
	id: SpiritId.TheMoominStorybook,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.TheMoominStorybookQuest1,
			},
			{
				name: `${emote} 1`,
				cosmetic: Cosmetic.EmoteRead1,
			},
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteRead2,
				cost: { hearts: 3 },
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.MoominPendant,
			},
			{
				name: "Ultimate umbrella",
				cosmetic: Cosmetic.TheMoominStorybookUltimateUmbrella,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate plush",
				cosmetic: Cosmetic.TheMoominStorybookUltimatePlush,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.TheMoominStorybookUltimateOutfit,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.TheMoominStorybookQuest2,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.TheMoominStorybookQuest3,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.TheMoominStorybookHeart1,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.TheMoominStorybookQuest4,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRead3,
				cost: { candles: 5 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteRead4,
				cost: { hearts: 5 },
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.TheMoominStorybookQuest5,
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.TheMoominStorybookQuest6,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.TheMoominStorybookHeart2,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.TheMoominStorybookProp,
				cost: { candles: 35 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TheMoominStorybookOutfit,
				cost: { candles: 190 },
			},
		],
	},
});
