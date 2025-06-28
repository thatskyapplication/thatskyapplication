import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Shrug;

export default new SeasonalSpirit({
	id: SpiritId.IndifferentAlchemist,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShrug1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteShrug2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.IndifferentAlchemistBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Mask", cosmetic: Cosmetic.IndifferentAlchemistMask },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShrug3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteShrug4 },
			{
				name: "Hair",
				cosmetic: Cosmetic.IndifferentAlchemistHair,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.IndifferentAlchemistBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.IndifferentAlchemistBlessing3,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Cape", cosmetic: Cosmetic.IndifferentAlchemistCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.IndifferentAlchemistSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShrug1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteShrug2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.IndifferentAlchemistBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.IndifferentAlchemistMask,
				cost: { candles: 42 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.IndifferentAlchemistSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.IndifferentAlchemistWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShrug3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteShrug4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.IndifferentAlchemistBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.IndifferentAlchemistHair,
				cost: { candles: 42 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.IndifferentAlchemistCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 10, 29), end: skyDate(2020, 11, 2) },
			{ start: skyDate(2022, 9, 1), end: skyDate(2022, 9, 5) },
		],
		returning: [5],
	},
});
