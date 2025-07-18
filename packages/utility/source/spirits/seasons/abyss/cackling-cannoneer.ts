import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.EvilLaugh;

export default new SeasonalSpirit({
	id: SpiritId.CacklingCannoneer,
	seasonId: SeasonId.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteEvilLaugh1 },
			{ cosmetic: Cosmetic.EmoteEvilLaugh2 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.CacklingCannoneerBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.CacklingCannoneerMusicSheet },
			{
				cosmetic: Cosmetic.CacklingCannoneerMask,
				cost: { seasonalCandles: 16 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.CacklingCannoneerBlessing2,
			},
			{
				cosmetic: Cosmetic.EmoteEvilLaugh3,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.EmoteEvilLaugh4 },
			{
				cosmetic: Cosmetic.CacklingCannoneerCape,
				cost: { seasonalCandles: 26 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.CacklingCannoneerBlessing3,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
				cosmetic: Cosmetic.CacklingCannoneerBlessing4,
				cost: { seasonalCandles: 34 },
			},
			{ cosmetic: Cosmetic.CacklingCannoneerHair },
			{
				cosmetic: Cosmetic.CacklingCannoneerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteEvilLaugh1 },
			{
				cosmetic: Cosmetic.EmoteEvilLaugh2,
				cost: { hearts: 4 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.CacklingCannoneerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.CacklingCannoneerMask,
				cost: { candles: 40 },
			},
			{
				cosmetic: Cosmetic.CacklingCannoneerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.CacklingCannoneerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteEvilLaugh3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteEvilLaugh4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.CacklingCannoneerHair,
				cost: { candles: 50 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.CacklingCannoneerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.CacklingCannoneerCape,
				cost: { candles: 70 },
			},
			{
				cosmetic: Cosmetic.CacklingCannoneerMusicSheet,
				cost: { candles: 15 },
			},
		],
	},
	visits: {
		returning: [4],
	},
});
