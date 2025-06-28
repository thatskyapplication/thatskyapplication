import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Peek;

export default new SeasonalSpirit({
	id: SpiritId.PeekingPostman,
	seasonId: SeasonId.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePeek1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmotePeek2 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.PeekingPostmanMusicSheet,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.PeekingPostmanBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmotePeek3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmotePeek4 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.PeekingPostmanOutfit,
				cost: { seasonalCandles: 21 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.PeekingPostmanBlessing2 },
			{
				name: "Cape",
				cosmetic: Cosmetic.PeekingPostmanCape,
				cost: { seasonalCandles: 27 },
			},
			{ name: "Rabbit mask", cosmetic: Cosmetic.PeekingPostmanRabbitMask },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.PeekingPostmanSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePeek1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmotePeek2, cost: { hearts: 4 } },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.PeekingPostmanMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PeekingPostmanBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Rabbit mask",
				cosmetic: Cosmetic.PeekingPostmanRabbitMask,
				cost: { candles: 54 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PeekingPostmanSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PeekingPostmanWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmotePeek3, cost: { hearts: 3 } },
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmotePeek4, cost: { hearts: 6 } },
			{
				name: "Cape",
				cosmetic: Cosmetic.PeekingPostmanCape,
				cost: { candles: 65 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PeekingPostmanBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.PeekingPostmanOutfit,
				cost: { candles: 70 },
			},
		],
	},
	keywords: ["rabbit", "rabbit mask"],
	visits: {
		travelling: [{ start: skyDate(2022, 6, 23), end: skyDate(2022, 6, 27) }],
	},
});
