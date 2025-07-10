import { Cosmetic } from "../../../cosmetics.js";
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
			{ cosmetic: Cosmetic.EmoteHandRub1 },
			{ cosmetic: Cosmetic.EmoteHandRub2 },
			{
				cosmetic: Cosmetic.StarCollectorNecktie,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.StarCollectorBlessing1 },
			{
				cosmetic: Cosmetic.EmoteHandRub3,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.EmoteHandRub4 },
			{
				cosmetic: Cosmetic.StarCollectorBlessing2,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.StarCollectorCape },
			{
				cosmetic: Cosmetic.StarCollectorProp,
				cost: { seasonalCandles: 24 },
			},
			{ cosmetic: Cosmetic.StarCollectorBlessing3 },
			{
				cosmetic: Cosmetic.StarCollectorSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteHandRub1 },
			{
				cosmetic: Cosmetic.EmoteHandRub2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.StarCollectorSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.StarCollectorBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.StarCollectorNecktie,
				cost: { candles: 40 },
			},
			{
				cosmetic: Cosmetic.StarCollectorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteHandRub3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteHandRub4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.StarCollectorBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.StarCollectorCape,
				cost: { candles: 75 },
			},
			{
				cosmetic: Cosmetic.StarCollectorProp,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 9, 14), end: skyDate(2023, 9, 18) }],
		returning: [8],
	},
});
