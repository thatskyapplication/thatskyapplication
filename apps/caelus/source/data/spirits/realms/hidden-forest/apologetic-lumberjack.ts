import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Apologise;

export default new StandardSpirit({
	id: SpiritId.ApologeticLumberjack,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteApologise1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteApologise2,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ApologeticLumberjackBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ApologeticLumberjackHair,
				cost: { hearts: 3 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ApologeticLumberjackHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ApologeticLumberjackWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteApologise3,
				cost: { candles: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteApologise4,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ApologeticLumberjackBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ApologeticLumberjackFaceAccessory,
				cost: { hearts: 5 },
			},
		],
	},
});
