import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.RaiseTheRoof;

export default new SeasonalSpirit({
	id: SpiritId.MindfulMiner,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRaiseTheRoof1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteRaiseTheRoof2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MindfulMinerBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Mask", cosmetic: Cosmetic.MindfulMinerMask },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRaiseTheRoof3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteRaiseTheRoof4 },
			{
				name: "Hair",
				cosmetic: Cosmetic.MindfulMinerHair,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.MindfulMinerBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.MindfulMinerBlessing3,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.MindfulMinerOutfit },
			{
				name: "Cape",
				cosmetic: Cosmetic.MindfulMinerCape,
				cost: { seasonalCandles: 32 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.MindfulMinerBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.MindfulMinerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRaiseTheRoof1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteRaiseTheRoof2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MindfulMinerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.MindfulMinerMask,
				cost: { candles: 35 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MindfulMinerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.MindfulMinerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRaiseTheRoof3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteRaiseTheRoof4,
				cost: { hearts: 6 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.MindfulMinerHair,
				cost: { candles: 40 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MindfulMinerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.MindfulMinerOutfit,
				cost: { hearts: 55 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.MindfulMinerCape,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [135],
		returning: [9],
	},
});
