import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.ShowDance;

export default new SeasonalSpirit({
	id: SpiritId.DancingPerformer,
	seasonId: SeasonId.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShowDance1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteShowDance2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DancingPerformerBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Hair", cosmetic: Cosmetic.DancingPerformerHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShowDance3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteShowDance4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DancingPerformerBlessing2,
				cost: { seasonalCandles: 21 },
			},
			{ name: "Mask", cosmetic: Cosmetic.DancingPerformerMask },
			{
				name: "Cape",
				cosmetic: Cosmetic.DancingPerformerCape,
				cost: { seasonalCandles: 27 },
			},
			{ name: "Lute", cosmetic: Cosmetic.DancingPerformerLute },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.DancingPerformerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShowDance1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteShowDance2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DancingPerformerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.DancingPerformerHair,
				cost: { candles: 45 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.DancingPerformerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.DancingPerformerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShowDance3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteShowDance4,
				cost: { hearts: 6 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.DancingPerformerMask,
				cost: { candles: 48 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DancingPerformerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Lute",
				cosmetic: Cosmetic.DancingPerformerLute,
				cost: { candles: 70 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.DancingPerformerCape,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 4, 25), end: skyDate(2024, 4, 29) }],
	},
});
