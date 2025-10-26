import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.Bearhug;

export default new SeasonalSpirit({
	id: SpiritId.BearhugHermit,
	seasonId: SeasonId.Dreams,
	action,
	realm: RealmName.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			[{ cosmetic: Cosmetic.FriendActionBearhug1 }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BearhugHermitBlessing1,
					cost: { seasonalCandles: 13 },
				},
				{ cosmetic: Cosmetic.BearhugHermitRedHorns, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BearhugHermitBlessing2,
					cost: { seasonalCandles: 18 },
				},
				{ cosmetic: Cosmetic.BearhugHermitMusicSheet, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.BearhugHermitBlessing3,
					cost: { seasonalCandles: 23 },
				},
				{ cosmetic: Cosmetic.FriendActionBearhug2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.BearhugHermitHair,
					cost: { seasonalCandles: 29 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.BearhugHermitOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.BearhugHermitSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.FriendActionBearhug1 },
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.BearhugHermitMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BearhugHermitBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.BearhugHermitRedHorns,
					cost: { candles: 42 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.BearhugHermitSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.BearhugHermitWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BearhugHermitBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.FriendActionBearhug2,
					cost: { hearts: 8 },
					level: 2,
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.BearhugHermitHair,
					cost: { candles: 50 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.BearhugHermitOutfit,
					cost: { candles: 70 },
				},
			],
		],
	},
	keywords: ["yeti"],
	visits: {
		travelling: [
			{ start: skyDate(2022, 11, 24), end: skyDate(2022, 11, 28) },
			{ start: skyDate(2024, 2, 15), end: skyDate(2024, 2, 19) },
		],
	},
});
