import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.Float;

export default new StandardSpirit({
	id: SpiritId.MeditatingMonastic,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteFloat1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteFloat2,
				cost: { candles: 10 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MeditatingMonasticBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.MeditatingMonasticHair,
				cost: { hearts: 10 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MeditatingMonasticHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.MeditatingMonasticWingBuff,
				cost: { ascendedCandles: 3 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteFloat3,
				cost: { candles: 7 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteFloat4,
				cost: { candles: 10 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MeditatingMonasticBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Chair",
				cosmetic: Cosmetic.MeditatingMonasticChair,
				cost: { hearts: 30 },
			},
		],
	},
});
