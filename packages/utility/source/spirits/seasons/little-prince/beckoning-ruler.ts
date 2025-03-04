import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Beckon;

export default new SeasonalSpirit({
	id: SpiritId.BeckoningRuler,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBeckon1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBeckon2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BeckoningRulerBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Hair", cosmetic: Cosmetic.BeckoningRulerHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBeckon3,
				cost: { seasonalCandles: 20 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBeckon4 },
			{
				name: "Frog mask",
				cosmetic: Cosmetic.BeckoningRulerFrogMask,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.BeckoningRulerBlessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BeckoningRulerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBeckon1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBeckon2,
				cost: { hearts: 4 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BeckoningRulerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BeckoningRulerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Frog mask",
				cosmetic: Cosmetic.BeckoningRulerFrogMask,
				cost: { candles: 42 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BeckoningRulerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBeckon3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBeckon4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BeckoningRulerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.BeckoningRulerHair,
				cost: { candles: 48 },
			},
		],
	},
	keywords: ["frog", "frog mask"],
	visits: {
		travelling: [71, 117],
	},
});
