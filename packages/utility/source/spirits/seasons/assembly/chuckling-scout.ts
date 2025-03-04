import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Chuckle;

export default new SeasonalSpirit({
	id: SpiritId.ChucklingScout,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteChuckle1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteChuckle2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.ChucklingScoutMask,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.ChucklingScoutBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteChuckle3,
				cost: { seasonalCandles: 14 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteChuckle4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ChucklingScoutBlessing2,
				cost: { seasonalCandles: 17 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.ChucklingScoutOutfit },
			{
				name: "Prop",
				cosmetic: Cosmetic.ChucklingScoutProp,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.ChucklingScoutBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ChucklingScoutSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteChuckle1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteChuckle2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ChucklingScoutBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ChucklingScoutMask,
				cost: { candles: 36 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ChucklingScoutSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ChucklingScoutWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteChuckle3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteChuckle4,
				cost: { hearts: 6 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ChucklingScoutOutfit,
				cost: { candles: 65 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ChucklingScoutBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.ChucklingScoutProp,
				cost: { candles: 45 },
			},
		],
	},
	visits: {
		returning: [1],
	},
});
