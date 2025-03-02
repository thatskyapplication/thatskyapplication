import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Point;

export default new StandardSpirit({
	id: SpiritId.PointingCandlemaker,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePoint1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmotePoint2,
				cost: { candles: 1 },
			},
			{ name: "Hair", cosmetic: Cosmetic.PointingCandlemakerHair },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PointingCandlemakerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PointingCandlemakerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PointingCandlemakerWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmotePoint3,
				cost: { candles: 2 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmotePoint4,
				cost: { candles: 2 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.PointingCandlemakerOutfit,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PointingCandlemakerBlessing2,
				cost: { candles: 5 },
			},
		],
	},
});
