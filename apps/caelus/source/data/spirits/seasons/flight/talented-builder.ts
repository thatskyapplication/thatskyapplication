import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Voilà;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const colourTrail = MISCELLANEOUS_EMOJIS.SpellColourTrail;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit25;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace16;
const hairEmoji = HAIR_EMOJIS.Hair91;

export default new SeasonalSpirit({
	id: SpiritId.TalentedBuilder,
	seasonId: SeasonId.Flight,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteVoilà1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteVoilà2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TalentedBuilderBlessing1,
				cost: { seasonalCandles: 10 },
				emoji: blessing2,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.TalentedBuilderMusicSheet, emoji: musicSheet },
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.TalentedBuilderNeckAccessory,
				cost: { seasonalCandles: 16 },
				emoji: necklaceEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.TalentedBuilderBlessing2, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteVoilà3,
				cost: { seasonalCandles: 22 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteVoilà4, emoji: emoteEmoji },
			{
				name: "Trail spell 1",
				cosmetic: Cosmetic.TalentedBuilderTrailSpell1,
				cost: { seasonalCandles: 24 },
				emoji: colourTrail,
			},
			{ name: "Outfit", cosmetic: Cosmetic.TalentedBuilderOutfit, emoji: outfitEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.TalentedBuilderHair,
				cost: { seasonalCandles: 26 },
				emoji: hairEmoji,
			},
			{ name: "Trail spell 2", cosmetic: Cosmetic.TalentedBuilderTrailSpell2, emoji: colourTrail },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TalentedBuilderSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.FlightHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteVoilà1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteVoilà2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TalentedBuilderBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.TalentedBuilderNeckAccessory,
				cost: { candles: 40 },
				emoji: necklaceEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.TalentedBuilderSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.TalentedBuilderWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteVoilà3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteVoilà4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.TalentedBuilderMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TalentedBuilderBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TalentedBuilderOutfit,
				cost: { candles: 70 },
				emoji: outfitEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TalentedBuilderHair,
				cost: { candles: 45 },
				emoji: hairEmoji,
			},
		],
	},
	visits: {
		travelling: [101],
	},
});
