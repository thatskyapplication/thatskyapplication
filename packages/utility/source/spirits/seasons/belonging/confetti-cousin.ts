import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Confetti;

export default new SeasonalSpirit({
	id: SpiritId.ConfettiCousin,
	seasonId: SeasonId.Belonging,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteConfetti1 },
			{ cosmetic: Cosmetic.EmoteConfetti2 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.ConfettiCousinBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.ConfettiCousinBlessing2,
			},
			{
				cosmetic: Cosmetic.EmoteConfetti3,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.EmoteConfetti4 },
			{
				cosmetic: Cosmetic.ConfettiCousinCape,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.ConfettiCousinHair },
			{
				cosmetic: Cosmetic.ConfettiCousinSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteConfetti1 },
			{
				cosmetic: Cosmetic.EmoteConfetti2,
				cost: { hearts: 4 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.ConfettiCousinBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ConfettiCousinHair,
				cost: { candles: 42 },
			},
			{
				cosmetic: Cosmetic.ConfettiCousinSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.ConfettiCousinWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteConfetti3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteConfetti4,
				cost: { hearts: 6 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.ConfettiCousinBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ConfettiCousinCape,
				cost: { candles: 60 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 7, 9), end: skyDate(2020, 7, 13) },
			{ start: skyDate(2021, 1, 21), end: skyDate(2021, 1, 25) },
			{ start: skyDate(2023, 9, 28), end: skyDate(2023, 10, 2) },
		],
	},
});
