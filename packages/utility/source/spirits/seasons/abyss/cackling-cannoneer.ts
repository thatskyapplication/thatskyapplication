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
			[
				{ cosmetic: Cosmetic.EmoteEvilLaugh1 },
				{ cosmetic: Cosmetic.EmoteEvilLaugh2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.CacklingCannoneerBlessing1,
					cost: { seasonalCandles: 12 },
				},
				{ cosmetic: Cosmetic.CacklingCannoneerMusicSheet, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.CacklingCannoneerMask,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.CacklingCannoneerBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteEvilLaugh3,
					cost: { seasonalCandles: 20 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteEvilLaugh4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.CacklingCannoneerCape,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.CacklingCannoneerBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.CacklingCannoneerBlessing4,
					cost: { seasonalCandles: 34 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.CacklingCannoneerHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.CacklingCannoneerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteEvilLaugh1 },
				{
					cosmetic: Cosmetic.EmoteEvilLaugh2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.CacklingCannoneerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.CacklingCannoneerMask,
					cost: { candles: 40 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.CacklingCannoneerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.CacklingCannoneerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteEvilLaugh3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteEvilLaugh4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.CacklingCannoneerHair,
					cost: { candles: 50 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.CacklingCannoneerBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.CacklingCannoneerCape,
					cost: { candles: 70 },
				},
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.CacklingCannoneerMusicSheet,
					cost: { candles: 15 },
				},
			],
		],
	},
	visits: {
		returning: [4],
	},
});
