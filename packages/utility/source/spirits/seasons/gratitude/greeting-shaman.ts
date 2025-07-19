import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.KungFu;

export default new SeasonalSpirit({
	id: SpiritId.GreetingShaman,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteKungFu1 },
			{ cosmetic: Cosmetic.EmoteKungFu2 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.GreetingShamanBlessing1,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.GreetingShamanLargeBell },
			{
				cosmetic: Cosmetic.EmoteKungFu3,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.EmoteKungFu4 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.GreetingShamanBlessing2,
				cost: { seasonalCandles: 22 },
			},
			{
				cosmetic: Cosmetic.GreetingShamanMask,
				cost: { hearts: 5 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteKungFu1 },
			{
				cosmetic: Cosmetic.EmoteKungFu2,
				cost: { hearts: 4 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.GreetingShamanBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.GreetingShamanLargeBell,
				cost: { candles: 45 },
			},
			{
				translation: CosmeticCommon.Heart,
				cosmetic: Cosmetic.GreetingShamanHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.GreetingShamanWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteKungFu3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteKungFu4,
				cost: { hearts: 6 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.GreetingShamanBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.GreetingShamanMask,
				cost: { candles: 54 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 7, 23), end: skyDate(2020, 7, 27) },
			{ start: skyDate(2022, 5, 26), end: skyDate(2022, 5, 30) },
		],
		returning: [3],
	},
});
