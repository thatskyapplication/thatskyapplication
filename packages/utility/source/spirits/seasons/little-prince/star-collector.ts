import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.HandRub;

export default new SeasonalSpirit({
	id: SpiritId.StarCollector,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteHandRub1 },
				{ cosmetic: Cosmetic.EmoteHandRub2, level: 2, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.StarCollectorNecktie,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.StarCollectorBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteHandRub3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteHandRub4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.StarCollectorBlessing2,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.StarCollectorCape,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.StarCollectorProp,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.StarCollectorBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.StarCollectorSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteHandRub1 },
				{
					cosmetic: Cosmetic.EmoteHandRub2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.StarCollectorSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.StarCollectorBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.StarCollectorNecktie,
					cost: { candles: 40 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.StarCollectorWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteHandRub3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteHandRub4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.StarCollectorBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.StarCollectorCape,
					cost: { candles: 75 },
				},
			],
			[
				{
					cosmetic: Cosmetic.StarCollectorProp,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 9, 14), end: skyDate(2023, 9, 18) }],
		returning: [8],
	},
});
