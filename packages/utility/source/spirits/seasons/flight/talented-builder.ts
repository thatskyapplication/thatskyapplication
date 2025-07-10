import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Voilà;

export default new SeasonalSpirit({
	id: SpiritId.TalentedBuilder,
	seasonId: SeasonId.Flight,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteVoilà1 },
			{ cosmetic: Cosmetic.EmoteVoilà2 },
			{
				cosmetic: Cosmetic.TalentedBuilderBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.TalentedBuilderMusicSheet },
			{
				cosmetic: Cosmetic.TalentedBuilderNeckAccessory,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.TalentedBuilderBlessing2 },
			{
				cosmetic: Cosmetic.EmoteVoilà3,
				cost: { seasonalCandles: 22 },
			},
			{ cosmetic: Cosmetic.EmoteVoilà4 },
			{
				cosmetic: Cosmetic.TalentedBuilderTrailSpell1,
				cost: { seasonalCandles: 24 },
			},
			{ cosmetic: Cosmetic.TalentedBuilderOutfit },
			{
				cosmetic: Cosmetic.TalentedBuilderHair,
				cost: { seasonalCandles: 26 },
			},
			{ cosmetic: Cosmetic.TalentedBuilderTrailSpell2 },
			{
				cosmetic: Cosmetic.TalentedBuilderSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteVoilà1 },
			{
				cosmetic: Cosmetic.EmoteVoilà2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.TalentedBuilderBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.TalentedBuilderNeckAccessory,
				cost: { candles: 40 },
			},
			{
				cosmetic: Cosmetic.TalentedBuilderSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.TalentedBuilderWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteVoilà3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteVoilà4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.TalentedBuilderMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.TalentedBuilderBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.TalentedBuilderOutfit,
				cost: { candles: 70 },
			},
			{
				cosmetic: Cosmetic.TalentedBuilderHair,
				cost: { candles: 45 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 11, 23), end: skyDate(2023, 11, 27) }],
	},
});
