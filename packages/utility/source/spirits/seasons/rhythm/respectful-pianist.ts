import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Respect;

export default new SeasonalSpirit({
	id: SpiritId.RespectfulPianist,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRespect1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteRespect2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.RespectfulPianistHair,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.RespectfulPianistBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRespect3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteRespect4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RespectfulPianistBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Winter piano", cosmetic: Cosmetic.RespectfulPianistWinterPiano },
			{
				name: "Duck mask",
				cosmetic: Cosmetic.RespectfulPianistMask,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.RespectfulPianistBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RespectfulPianistSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRespect1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteRespect2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.RespectfulPianistBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.RespectfulPianistHair,
				cost: { candles: 26 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.RespectfulPianistSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.RespectfulPianistWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRespect3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteRespect4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RespectfulPianistBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Winter piano",
				cosmetic: Cosmetic.RespectfulPianistWinterPiano,
				cost: { candles: 75 },
			},
			{
				name: "Duck mask",
				cosmetic: Cosmetic.RespectfulPianistMask,
				cost: { candles: 48 },
			},
		],
	},
	visits: {
		travelling: [28],
		returning: [3],
	},
});
