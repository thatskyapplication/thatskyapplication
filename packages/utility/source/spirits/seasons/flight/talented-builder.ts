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
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteVoilà1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteVoilà2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TalentedBuilderBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.TalentedBuilderMusicSheet },
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.TalentedBuilderNeckAccessory,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.TalentedBuilderBlessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteVoilà3,
				cost: { seasonalCandles: 22 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteVoilà4 },
			{
				name: "Trail spell 1",
				cosmetic: Cosmetic.TalentedBuilderTrailSpell1,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.TalentedBuilderOutfit },
			{
				name: "Hair",
				cosmetic: Cosmetic.TalentedBuilderHair,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Trail spell 2", cosmetic: Cosmetic.TalentedBuilderTrailSpell2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TalentedBuilderSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteVoilà1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteVoilà2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TalentedBuilderBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.TalentedBuilderNeckAccessory,
				cost: { candles: 40 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.TalentedBuilderSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.TalentedBuilderWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteVoilà3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteVoilà4,
				cost: { hearts: 6 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.TalentedBuilderMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TalentedBuilderBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TalentedBuilderOutfit,
				cost: { candles: 70 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TalentedBuilderHair,
				cost: { candles: 45 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 11, 23), end: skyDate(2023, 11, 27) }],
	},
});
