import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Ouch;

export default new SeasonalSpirit({
	id: SpiritId.BumblingBoatswain,
	seasonId: SeasonId.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteOuch1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteOuch2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BumblingBoatswainBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Mask", cosmetic: Cosmetic.BumblingBoatswainMask },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.BumblingBoatswainMusicSheet,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.BumblingBoatswainBlessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteOuch3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteOuch4 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.BumblingBoatswainBlessing3,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Cape", cosmetic: Cosmetic.BumblingBoatswainCape },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.BumblingBoatswainHairAccessory,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.BumblingBoatswainBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BumblingBoatswainSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteOuch1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteOuch2, cost: { hearts: 4 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BumblingBoatswainBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.BumblingBoatswainMask,
				cost: { candles: 40 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BumblingBoatswainSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BumblingBoatswainWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteOuch3,
				cost: { hearts: 3 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteOuch4, cost: { hearts: 6 } },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.BumblingBoatswainMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BumblingBoatswainBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.BumblingBoatswainHairAccessory,
				cost: { candles: 35 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.BumblingBoatswainCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [124],
	},
});
