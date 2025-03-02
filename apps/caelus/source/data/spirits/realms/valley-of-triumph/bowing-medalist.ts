import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Bow;

export default new StandardSpirit({
	id: SpiritId.BowingMedalist,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBow1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBow2, cost: { candles: 3 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BowingMedalistBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.BowingMedalistHair,
				cost: { hearts: 5 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BowingMedalistHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BowingMedalistWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteBow3, cost: { candles: 4 } },
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBow4, cost: { candles: 4 } },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BowingMedalistBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.BowingMedalistFaceAccessory,
				cost: { hearts: 5 },
			},
		],
	},
});
