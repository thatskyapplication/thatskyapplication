import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Grumpy;

export default new SeasonalSpirit({
	id: SpiritId.HikingGrouch,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrumpy1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteGrumpy2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HikingGrouchBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Mask", cosmetic: Cosmetic.HikingGrouchMask },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrumpy3,
				cost: { seasonalCandles: 14 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteGrumpy4 },
			{
				name: "Hair",
				cosmetic: Cosmetic.HikingGrouchHair,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.HikingGrouchBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.HikingGrouchBlessing3,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Bow tie", cosmetic: Cosmetic.HikingGrouchBowTie },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.HikingGrouchSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrumpy1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteGrumpy2,
				cost: { hearts: 4 },
			},
			{
				name: "Double Deck Chairs",
				cosmetic: Cosmetic.DoubleDeckChairs,
				cost: { hearts: 16 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HikingGrouchBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.HikingGrouchMask,
				cost: { candles: 34 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.HikingGrouchSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.HikingGrouchWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrumpy3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteGrumpy4,
				cost: { hearts: 6 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.HikingGrouchHair,
				cost: { candles: 42 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.HikingGrouchBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Bow tie",
				cosmetic: Cosmetic.HikingGrouchBowTie,
				cost: { candles: 50 },
			},
		],
	},
	visits: {
		travelling: [55],
		returning: [4],
	},
});
