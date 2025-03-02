import {
	Cosmetic,
	GuideSpirit,
	RealmName,
	SeasonId,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote1 = SpiritEmote.SilentClap;
const emote2 = SpiritEmote.Conduct;
const emote3 = SpiritEmote.Skipping;

export default new GuideSpirit({
	id: SpiritId.AURORA,
	seasonId: SeasonId.AURORA,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.AURORAQuest1 },
			{
				name: `${emote1} 2`,
				cosmetic: Cosmetic.EmoteSilentClap2,
				cost: { hearts: 3 },
			},
			{ name: "Pendant", cosmetic: Cosmetic.AURORAPendant },
			{
				name: "Aurora hair",
				cosmetic: Cosmetic.AURORAAuroraHair,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.AURORAUltimateOutfit,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.AURORAUltimateCape,
				cost: { seasonalHearts: 1 },
			},
			{ name: `${emote1} 1`, cosmetic: Cosmetic.EmoteSilentClap1 },
			{
				name: `${emote1} 3`,
				cosmetic: Cosmetic.EmoteSilentClap3,
				cost: { candles: 5 },
			},
			{
				name: `${emote1} 4`,
				cosmetic: Cosmetic.EmoteSilentClap4,
				cost: { hearts: 5 },
			},
			{ name: "Quest 2", cosmetic: Cosmetic.AURORAQuest2 },
			{ name: `${emote2} 1`, cosmetic: Cosmetic.EmoteConduct1 },
			{
				name: `${emote2} 2`,
				cosmetic: Cosmetic.EmoteConduct2,
				cost: { hearts: 3 },
			},
			{
				name: `${emote2} 3`,
				cosmetic: Cosmetic.EmoteConduct3,
				cost: { candles: 5 },
			},
			{
				name: `${emote2} 4`,
				cosmetic: Cosmetic.EmoteConduct4,
				cost: { hearts: 5 },
			},
			{ name: "Quest 3", cosmetic: Cosmetic.AURORAQuest3 },
			{
				name: "Heart",
				cosmetic: Cosmetic.AURORAHeart,
				cost: { candles: 3 },
			},
			{ name: `${emote3} 1`, cosmetic: Cosmetic.EmoteSkipping1 },
			{
				name: `${emote3} 2`,
				cosmetic: Cosmetic.EmoteSkipping2,
				cost: { hearts: 3 },
			},
			{
				name: `${emote3} 3`,
				cosmetic: Cosmetic.EmoteSkipping3,
				cost: { candles: 5 },
			},
			{
				name: `${emote3} 4`,
				cosmetic: Cosmetic.EmoteSkipping4,
				cost: { hearts: 5 },
			},
			{ name: "Quest 4", cosmetic: Cosmetic.AURORAQuest4 },
			{
				name: "Music sheet 1",
				cosmetic: Cosmetic.AURORAMusicSheet1,
				cost: { candles: 20 },
			},
			{ name: "Quest 5", cosmetic: Cosmetic.AURORAQuest5 },
			{
				name: "Music sheet 2",
				cosmetic: Cosmetic.AURORAMusicSheet2,
				cost: { candles: 20 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.AURORAOutfit,
				cost: { candles: 200 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.AURORAMask,
				cost: { candles: 50 },
			},
		],
	},
});
