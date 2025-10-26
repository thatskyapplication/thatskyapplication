import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Grateful;

export default new SeasonalSpirit({
	id: SpiritId.GratefulShellCollector,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteGrateful1 },
				{ cosmetic: Cosmetic.EmoteGrateful2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.GratefulShellCollectorBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.GratefulShellCollectorHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteGrateful3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteGrateful4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.GratefulShellCollectorCape,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.GratefulShellCollectorBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.GratefulShellCollectorSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteGrateful1 },
				{
					cosmetic: Cosmetic.EmoteGrateful2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.GratefulShellCollectorChairs,
					cost: { candles: 45 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.GratefulShellCollectorBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.GratefulShellCollectorHair,
					cost: { candles: 34 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.GratefulShellCollectorSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.GratefulShellCollectorWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteGrateful3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteGrateful4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.GratefulShellCollectorBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.GratefulShellCollectorCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 9, 30), end: skyDate(2021, 10, 4) },
			{ start: skyDate(2023, 5, 25), end: skyDate(2023, 5, 29) },
		],
	},
});
