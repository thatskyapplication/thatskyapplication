import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Juggle;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const outfitEmoji = OUTFIT_EMOJIS.Outfit12;
const hairEmoji = HAIR_EMOJIS.Hair50;
const capeEmoji = CAPE_EMOJIS.Cape23;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp16;

export default new SeasonalSpirit({
	name: SpiritName.TroupeJuggler,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{
				name: `${emote} 1`,
				cosmetic: Cosmetic.EmoteJuggle1,
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteJuggle2,
				emoji: emoteEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TroupeJugglerHair,
				cost: { seasonalCandles: 12 },
				emoji: hairEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TroupeJugglerBlessing1,
				emoji: blessing2,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteJuggle3,
				cost: { seasonalCandles: 14 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteJuggle4,
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TroupeJugglerBlessing2,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{ name: "Cape", cosmetic: Cosmetic.TroupeJugglerCape, emoji: capeEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.TroupeJugglerOutfit,
				cost: { seasonalCandles: 18 },
				emoji: outfitEmoji,
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.TroupeJugglerBlessing3,
				emoji: blessing2,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TroupeJugglerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RhythmHeart,
			},
		],
		current: [
			{
				name: `${emote} 1`,
				cosmetic: Cosmetic.EmoteJuggle1,
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteJuggle2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.TroupeJugglerProp,
				cost: { hearts: 14 },
				emoji: placeablePropEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TroupeJugglerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TroupeJugglerHair,
				cost: { candles: 42 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.TroupeJugglerSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.TroupeJugglerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteJuggle3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteJuggle4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TroupeJugglerBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TroupeJugglerOutfit,
				cost: { candles: 75 },
				emoji: outfitEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.TroupeJugglerCape,
				cost: { candles: 75 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: [44, 99],
		returning: [7],
	},
});
