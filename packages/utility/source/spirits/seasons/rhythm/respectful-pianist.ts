import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
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
			{ cosmetic: Cosmetic.EmoteRespect1 },
			{ cosmetic: Cosmetic.EmoteRespect2 },
			{
				cosmetic: Cosmetic.RespectfulPianistHair,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.RespectfulPianistBlessing1 },
			{
				cosmetic: Cosmetic.EmoteRespect3,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.EmoteRespect4 },
			{
				cosmetic: Cosmetic.RespectfulPianistBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.RespectfulPianistWinterPiano },
			{
				cosmetic: Cosmetic.RespectfulPianistMask,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.RespectfulPianistBlessing3 },
			{
				cosmetic: Cosmetic.RespectfulPianistSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteRespect1 },
			{
				cosmetic: Cosmetic.EmoteRespect2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.RespectfulPianistBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.RespectfulPianistHair,
				cost: { candles: 26 },
			},
			{
				cosmetic: Cosmetic.RespectfulPianistSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.RespectfulPianistWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteRespect3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteRespect4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.RespectfulPianistBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.RespectfulPianistWinterPiano,
				cost: { candles: 75 },
			},
			{
				cosmetic: Cosmetic.RespectfulPianistMask,
				cost: { candles: 48 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2021, 2, 4), end: skyDate(2021, 2, 8) }],
		returning: [3],
	},
});
