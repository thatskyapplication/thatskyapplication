import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Laugh;

export default new StandardSpirit({
	id: SpiritId.LaughingLightCatcher,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteLaugh1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteLaugh2,
				cost: { candles: 1 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LaughingLightCollectorBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Harp",
				cosmetic: Cosmetic.LaughingLightCollectorHarp,
				cost: { hearts: 5 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LaughingLightCollectorHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LaughingLightCollectorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteLaugh3,
				cost: { candles: 5 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteLaugh4,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.LaughingLightCollectorHair,
				cost: { hearts: 5 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LaughingLightCollectorBlessing2,
				cost: { candles: 5 },
			},
		],
	},
});
