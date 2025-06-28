import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Facepalm;

export default new SeasonalSpirit({
	id: SpiritId.BaffledBotanist,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteFacepalm1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteFacepalm2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BaffledBotanistBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Hair", cosmetic: Cosmetic.BaffledBotanistHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteFacepalm3,
				cost: { seasonalCandles: 12 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteFacepalm4 },
			{
				name: "Mask",
				cosmetic: Cosmetic.BaffledBotanistMask,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.BaffledBotanistBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.BaffledBotanistBlessing3,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Prop", cosmetic: Cosmetic.BaffledBotanistProp },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BaffledBotanistSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteFacepalm1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteFacepalm2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BaffledBotanistBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.BaffledBotanistMask,
				cost: { candles: 24 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BaffledBotanistSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BaffledBotanistWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteFacepalm3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteFacepalm4,
				cost: { hearts: 6 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.BaffledBotanistHair,
				cost: { candles: 45 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BaffledBotanistBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.BaffledBotanistProp,
				cost: { candles: 45 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2023, 1, 5), end: skyDate(2023, 1, 9) },
			{ start: skyDate(2024, 9, 26), end: skyDate(2024, 9, 30) },
		],
		returning: [1],
	},
});
