import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";

const emote = SpiritEmote.BlindfoldBalancePose;

export default new SeasonalSpirit({
	id: SpiritId.AsceticMonk,
	seasonId: SeasonId.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBlindfoldBalancePose1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBlindfoldBalancePose2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.AsceticMonkBlessing1,
				cost: { seasonalCandles: 6 },
			},
			{ name: "Mask", cosmetic: Cosmetic.AsceticMonkMask },
			{
				name: "Hair",
				cosmetic: Cosmetic.AsceticMonkHair,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.AsceticMonkBlessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBlindfoldBalancePose3,
				cost: { seasonalCandles: 26 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBlindfoldBalancePose4 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.AsceticMonkOutfit,
				cost: { seasonalCandles: 32 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.AsceticMonkBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.AsceticMonkSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
