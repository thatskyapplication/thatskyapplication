import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Stretch;

export default new SeasonalSpirit({
	id: SpiritId.StretchingLamplighter,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteStretch1 },
			{ cosmetic: Cosmetic.EmoteStretch2 },
			{
				cosmetic: Cosmetic.StretchingLamplighterBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.StretchingLamplighterHair },
			{
				cosmetic: Cosmetic.EmoteStretch3,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.EmoteStretch4 },
			{
				cosmetic: Cosmetic.StretchingLamplighterCape,
				cost: { seasonalCandles: 22 },
			},
			{ cosmetic: Cosmetic.StretchingLamplighterBlessing2 },
			{
				cosmetic: Cosmetic.StretchingLamplighterSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteStretch1 },
			{
				cosmetic: Cosmetic.EmoteStretch2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.StretchingLamplighterSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.StretchingLamplighterBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.StretchingLamplighterHair,
				cost: { candles: 44 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.StretchingLamplighterWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteStretch3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteStretch4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.StretchingLamplighterBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.StretchingLamplighterCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 12, 7), end: skyDate(2023, 12, 11) }],
		returning: [8],
	},
});
