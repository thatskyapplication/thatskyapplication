import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Doze;

export default new SeasonalSpirit({
	id: SpiritId.SnoozingCarpenter,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDoze1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteDoze2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SnoozingCarpenterBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Hair", cosmetic: Cosmetic.SnoozingCarpenterHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDoze3,
				cost: { seasonalCandles: 12 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteDoze4 },
			{
				name: "Cape",
				cosmetic: Cosmetic.SnoozingCarpenterCape,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.SnoozingCarpenterBlessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SnoozingCarpenterSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDoze1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteDoze2, cost: { hearts: 4 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SnoozingCarpenterBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SnoozingCarpenterHair,
				cost: { candles: 34 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SnoozingCarpenterSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SnoozingCarpenterWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteDoze3, cost: { hearts: 3 } },
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteDoze4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SnoozingCarpenterBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.SnoozingCarpenterCape,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 5, 27), end: skyDate(2021, 5, 31) },
			{ start: skyDate(2023, 4, 27), end: skyDate(2023, 5, 1) },
		],
	},
});
