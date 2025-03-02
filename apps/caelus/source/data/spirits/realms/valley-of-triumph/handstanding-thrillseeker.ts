import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Handstand;

export default new StandardSpirit({
	id: SpiritId.HandstandingThrillseeker,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHandstand1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteHandstand2,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HandstandingThrillseekerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.HandstandingThrillseekerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.HandstandingThrillseekerWingBuff1,
				cost: { ascendedCandles: 3 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHandstand3,
				cost: { candles: 4 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteHandstand4,
				cost: { candles: 4 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.HandstandingThrillseekerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.HandstandingThrillseekerCape1,
				cost: { hearts: 40 },
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.HandstandingThrillseekerWingBuff2,
				cost: { ascendedCandles: 9 },
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.HandstandingThrillseekerCape2,
				cost: { hearts: 120 },
			},
		],
	},
});
