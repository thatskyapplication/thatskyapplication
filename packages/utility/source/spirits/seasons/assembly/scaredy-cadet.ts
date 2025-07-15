import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Eww;

export default new SeasonalSpirit({
	id: SpiritId.ScaredyCadet,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteEww1 },
			{ cosmetic: Cosmetic.EmoteEww2 },
			{
				cosmetic: Cosmetic.ScaredyCadetMask,
				cost: { seasonalCandles: 5 },
			},
			{ cosmetic: Cosmetic.ScaredyCadetBlessing1 },
			{
				cosmetic: Cosmetic.EmoteEww3,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.EmoteEww4 },
			{
				cosmetic: Cosmetic.ScaredyCadetMusicSheet,
				cost: { seasonalCandles: 15 },
			},
			{ cosmetic: Cosmetic.ScaredyCadetHair },
			{
				cosmetic: Cosmetic.ScaredyCadetHammock,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.ScaredyCadetBlessing2 },
			{
				cosmetic: Cosmetic.ScaredyCadetSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteEww1 },
			{ cosmetic: Cosmetic.EmoteEww2, cost: { hearts: 4 } },
			{
				cosmetic: Cosmetic.ScaredyCadetBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ScaredyCadetMask,
				cost: { candles: 24 },
			},
			{
				cosmetic: Cosmetic.ScaredyCadetSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.ScaredyCadetWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{ cosmetic: Cosmetic.EmoteEww3, cost: { hearts: 3 } },
			{ cosmetic: Cosmetic.EmoteEww4, cost: { hearts: 6 } },
			{
				cosmetic: Cosmetic.ScaredyCadetMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.ScaredyCadetBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ScaredyCadetHair,
				cost: { candles: 45 },
			},
			{
				cosmetic: Cosmetic.ScaredyCadetHammock,
				cost: { candles: 55 },
			},
		],
	},
	keywords: ["hammock"],
	visits: {
		returning: [1],
	},
});
