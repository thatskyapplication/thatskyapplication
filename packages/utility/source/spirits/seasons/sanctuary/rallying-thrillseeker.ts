import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.RallyCheer;

export default new SeasonalSpirit({
	id: SpiritId.RallyingThrillseeker,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteRallyCheer1 },
			{ cosmetic: Cosmetic.EmoteRallyCheer2 },
			{
				cosmetic: Cosmetic.RallyingThrillseekerHair,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.RallyingThrillseekerBlessing1 },
			{
				cosmetic: Cosmetic.EmoteRallyCheer3,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.EmoteRallyCheer4 },
			{
				cosmetic: Cosmetic.RallyingThrillseekerOutfit,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.RallyingThrillseekerBlessing2 },
			{
				cosmetic: Cosmetic.RallyingThrillseekerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteRallyCheer1 },
			{
				cosmetic: Cosmetic.EmoteRallyCheer2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.RallyingThrillseekerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.RallyingThrillseekerHair,
				cost: { candles: 42 },
			},
			{
				cosmetic: Cosmetic.RallyingThrillseekerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.RallyingThrillseekerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteRallyCheer3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteRallyCheer4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.RallyingThrillseekerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.RallyingThrillseekerOutfit,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 4, 29), end: skyDate(2021, 5, 3) },
			{ start: skyDate(2023, 1, 19), end: skyDate(2023, 1, 23) },
			{ start: skyDate(2025, 3, 27), end: skyDate(2025, 3, 31) },
		],
	},
});
