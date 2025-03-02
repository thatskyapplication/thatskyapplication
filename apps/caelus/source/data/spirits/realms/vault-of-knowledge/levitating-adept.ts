import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Telekinesis;

export default new StandardSpirit({
	id: SpiritId.LevitatingAdept,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTelekinesis1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteTelekinesis2,
				cost: { candles: 5 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LevitatingAdeptBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.LevitatingAdeptHair,
				cost: { hearts: 5 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LevitatingAdeptHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LevitatingAdeptWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTelekinesis3,
				cost: { candles: 5 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteTelekinesis4,
				cost: { candles: 7 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LevitatingAdeptBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.LevitatingAdeptFaceAccessory,
				cost: { hearts: 10 },
			},
		],
	},
});
