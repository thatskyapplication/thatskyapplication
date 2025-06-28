import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Shush;

export default new SeasonalSpirit({
	id: SpiritId.ShushingLightScholar,
	seasonId: SeasonId.Lightseekers,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShush1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteShush2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ShushingLightScholarBlessing1,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Mask", cosmetic: Cosmetic.ShushingLightScholarMask },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShush3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteShush4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ShushingLightScholarBlessing2,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Cape", cosmetic: Cosmetic.ShushingLightScholarCape },
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShush1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteShush2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ShushingLightScholarBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ShushingLightScholarMask,
				cost: { candles: 30 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ShushingLightScholarHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ShushingLightScholarWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShush3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteShush4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ShushingLightScholarBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ShushingLightScholarCape,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 8, 20), end: skyDate(2020, 8, 24) },
			{ start: skyDate(2022, 9, 15), end: skyDate(2022, 9, 19) },
			{ start: skyDate(2024, 9, 12), end: skyDate(2024, 9, 16) },
		],
	},
});
