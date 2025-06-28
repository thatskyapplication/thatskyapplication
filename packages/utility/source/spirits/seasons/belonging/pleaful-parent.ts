import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.DontGo;

export default new SeasonalSpirit({
	id: SpiritId.PleafulParent,
	seasonId: SeasonId.Belonging,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDontGo1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteDontGo2 },
			{
				name: "Blessing",
				cosmetic: Cosmetic.PleafulParentBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Guitar", cosmetic: Cosmetic.PleafulParentGuitar },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDontGo3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteDontGo4 },
			{
				name: "Mask",
				cosmetic: Cosmetic.PleafulParentMask,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Cape", cosmetic: Cosmetic.PleafulParentCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.PleafulParentSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDontGo1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteDontGo2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PleafulParentBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.PleafulParentMask,
				cost: { candles: 42 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PleafulParentSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PleafulParentWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDontGo3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteDontGo4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PleafulParentBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.PleafulParentCape,
				cost: { candles: 65 },
			},
			{
				name: "Guitar",
				cosmetic: Cosmetic.PleafulParentGuitar,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 3, 26), end: skyDate(2020, 3, 30) },
			{ start: skyDate(2020, 12, 10), end: skyDate(2020, 12, 14) },
			{ start: skyDate(2022, 12, 22), end: skyDate(2022, 12, 26) },
			{ start: skyDate(2024, 10, 24), end: skyDate(2024, 10, 28) },
		],
	},
});
