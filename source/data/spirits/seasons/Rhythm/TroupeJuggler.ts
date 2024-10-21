import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import { skyDate } from "../../../../Utility2/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility2/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility2/spirits.js";

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
				name: "Cape",
				cosmetic: Cosmetic.TroupeJugglerCape,
				cost: { candles: 75 },
				emoji: capeEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TroupeJugglerOutfit,
				cost: { candles: 75 },
				emoji: outfitEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(44, skyDate(2_021, 9, 16))
			.set(99, skyDate(2_023, 10, 26)),
	},
});
