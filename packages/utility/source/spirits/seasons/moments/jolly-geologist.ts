import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.JollyDance;

export default new SeasonalSpirit({
	id: SpiritId.JollyGeologist,
	seasonId: SeasonId.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteJollyDance1 },
			{ cosmetic: Cosmetic.EmoteJollyDance2 },
			{
				cosmetic: Cosmetic.JollyGeologistFaceAccessory,
				cost: { seasonalCandles: 8 },
			},
			{ cosmetic: Cosmetic.JollyGeologistHair },
			{
				cosmetic: Cosmetic.EmoteJollyDance3,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.EmoteJollyDance4 },
			{
				cosmetic: Cosmetic.JollyGeologistBlessing1,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.JollyGeologistBlessing2 },
			{
				cosmetic: Cosmetic.JollyGeologistMusicSheet,
				cost: { seasonalCandles: 34 },
			},
			{ cosmetic: Cosmetic.JollyGeologistProp },
			{
				cosmetic: Cosmetic.JollyGeologistSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteJollyDance1 },
			{ cosmetic: Cosmetic.EmoteJollyDance2, cost: { hearts: 4 } },
			{
				cosmetic: Cosmetic.JollyGeologistBlessing1,
				cost: { candles: 5 },
			},
			{ cosmetic: Cosmetic.JollyGeologistProp, cost: { candles: 36 } },
			{
				cosmetic: Cosmetic.JollyGeologistSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.JollyGeologistWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteJollyDance3,
				cost: { hearts: 3 },
			},
			{ cosmetic: Cosmetic.EmoteJollyDance4, cost: { hearts: 6 } },
			{ cosmetic: Cosmetic.JollyGeologistBlessing2, cost: { candles: 5 } },
			{
				cosmetic: Cosmetic.JollyGeologistFaceAccessory,
				cost: { candles: 42 },
			},
			{
				cosmetic: Cosmetic.JollyGeologistMusicSheet,
				cost: { candles: 15 },
			},
			{ cosmetic: Cosmetic.JollyGeologistHair, cost: { candles: 48 } },
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 7, 17), end: skyDate(2025, 7, 21) }],
	},
});
