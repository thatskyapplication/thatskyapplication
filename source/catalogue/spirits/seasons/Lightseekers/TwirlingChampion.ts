import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.TripleAxel;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask15;
const hairEmoji = HAIR_EMOJIS.Hair41;
const heldProp = HELD_PROPS_EMOJIS.HeldProp10;

export default new SeasonalSpirit({
	name: SpiritName.TwirlingChampion,
	season: SeasonName.Lightseekers,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTripleAxel1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteTripleAxel2, emoji: emoteEmoji },
			{
				name: "Blessing",
				cosmetic: Cosmetic.TwirlingChampionBlessing1,
				cost: { seasonalCandles: 12 },
				emoji: blessing2,
			},
			{ name: "Mask", cosmetic: Cosmetic.TwirlingChampionMask, emoji: maskEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTripleAxel3,
				cost: { seasonalCandles: 14 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteTripleAxel4, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.TwirlingChampionHair,
				cost: { seasonalCandles: 16 },
				emoji: hairEmoji,
			},
			{ name: "Panflute", cosmetic: Cosmetic.TwirlingChampionPanflute, emoji: heldProp },
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTripleAxel1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteTripleAxel2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TwirlingChampionBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.TwirlingChampionMask,
				cost: { candles: 24 },
				emoji: maskEmoji,
			},
			{ name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTripleAxel3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteTripleAxel4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{ name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 },
			{
				name: "Panflute",
				cosmetic: Cosmetic.TwirlingChampionPanflute,
				cost: { candles: 60 },
				emoji: heldProp,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TwirlingChampionHair,
				cost: { candles: 34 },
				emoji: hairEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(18, skyDate(2_020, 9, 17))
			.set(52, skyDate(2_022, 1, 6))
			.set(106, skyDate(2_024, 2, 1)),
	},
});
