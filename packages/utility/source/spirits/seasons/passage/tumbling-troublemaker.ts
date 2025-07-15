import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Somersault;

export default new SeasonalSpirit({
	id: SpiritId.TumblingTroublemaker,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteSomersault1 },
			{ cosmetic: Cosmetic.EmoteSomersault2 },
			{
				cosmetic: Cosmetic.TumblingTroublemakerBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ cosmetic: Cosmetic.TumblingTroublemakerHair },
			{
				cosmetic: Cosmetic.EmoteSomersault3,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.EmoteSomersault4 },
			{
				cosmetic: Cosmetic.TumblingTroublemakerBlessing2,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.TumblingTroublemakerCape },
			{
				cosmetic: Cosmetic.TumblingTroublemakerBlessing3,
				cost: { seasonalCandles: 32 },
			},
			{
				cosmetic: Cosmetic.TumblingTroublemakerFaceAccessory,
			},
			{
				cosmetic: Cosmetic.TumblingTroublemakerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteSomersault1 },
			{ cosmetic: Cosmetic.EmoteSomersault2, cost: { hearts: 4 } },
			{
				cosmetic: Cosmetic.TumblingTroublemakerBlessing1,
				cost: { candles: 5 },
			},
			{ cosmetic: Cosmetic.TumblingTroublemakerHair, cost: { candles: 40 } },
			{
				cosmetic: Cosmetic.TumblingTroublemakerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.TumblingTroublemakerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteSomersault3,
				cost: { hearts: 3 },
			},
			{ cosmetic: Cosmetic.EmoteSomersault4, cost: { hearts: 6 } },
			{
				cosmetic: Cosmetic.TumblingTroublemakerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.TumblingTroublemakerFaceAccessory,
				cost: { candles: 55 },
			},
			{ cosmetic: Cosmetic.TumblingTroublemakerCape, cost: { candles: 80 } },
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 4, 24), end: skyDate(2025, 4, 28) }],
	},
});
