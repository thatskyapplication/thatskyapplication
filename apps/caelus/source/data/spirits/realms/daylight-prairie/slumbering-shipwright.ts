import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Yawn;

export default new StandardSpirit({
	id: SpiritId.SlumberingShipwright,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteYawn1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteYawn2,
				cost: { candles: 1 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SlumberingShipwrightBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SlumberingShipwrightHair,
				cost: { hearts: 3 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SlumberingShipwrightHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SlumberingShipwrightWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteYawn3,
				cost: { candles: 2 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteYawn4,
				cost: { candles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SlumberingShipwrightBlessing2,
				cost: { candles: 5 },
			},
		],
	},
});
