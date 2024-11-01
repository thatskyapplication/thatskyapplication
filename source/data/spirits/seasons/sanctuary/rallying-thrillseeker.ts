import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.RallyCheer;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const outfitEmoji = OUTFIT_EMOJIS.Outfit16;
const hairEmoji = HAIR_EMOJIS.Hair62;

export default new SeasonalSpirit({
	name: SpiritName.RallyingThrillseeker,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRallyCheer1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteRallyCheer2, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.RallyingThrillseekerHair,
				cost: { seasonalCandles: 10 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.RallyingThrillseekerBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRallyCheer3,
				cost: { seasonalCandles: 12 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteRallyCheer4, emoji: emoteEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.RallyingThrillseekerOutfit,
				cost: { seasonalCandles: 14 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.RallyingThrillseekerBlessing2, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RallyingThrillseekerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.SanctuaryHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRallyCheer1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteRallyCheer2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.RallyingThrillseekerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.RallyingThrillseekerHair,
				cost: { candles: 42 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.RallyingThrillseekerSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.RallyingThrillseekerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRallyCheer3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteRallyCheer4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RallyingThrillseekerBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.RallyingThrillseekerOutfit,
				cost: { candles: 70 },
				emoji: outfitEmoji,
			},
		],
	},
	visits: {
		travelling: [34, 79],
	},
});
