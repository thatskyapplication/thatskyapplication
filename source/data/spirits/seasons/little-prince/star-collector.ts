import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants-2.js";
import { skyDate } from "../../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.HandRub;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace14;
const capeEmoji = CAPE_EMOJIS.Cape59;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp12;

export default new SeasonalSpirit({
	name: SpiritName.StarCollector,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHandRub1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteHandRub2, emoji: emoteEmoji },
			{
				name: "Necktie",
				cosmetic: Cosmetic.StarCollectorNecktie,
				cost: { seasonalCandles: 12 },
				emoji: necklaceEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.StarCollectorBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHandRub3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteHandRub4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.StarCollectorBlessing2,
				cost: { seasonalCandles: 20 },
				emoji: blessing2,
			},
			{ name: "Cape", cosmetic: Cosmetic.StarCollectorCape, emoji: capeEmoji },
			{
				name: "Prop",
				cosmetic: Cosmetic.StarCollectorProp,
				cost: { seasonalCandles: 24 },
				emoji: placeablePropEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.StarCollectorBlessing3, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.StarCollectorSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.LittlePrinceHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHandRub1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteHandRub2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.StarCollectorSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.StarCollectorBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Necktie",
				cosmetic: Cosmetic.StarCollectorNecktie,
				cost: { candles: 40 },
				emoji: necklaceEmoji,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.StarCollectorWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHandRub3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteHandRub4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.StarCollectorBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.StarCollectorCape,
				cost: { candles: 75 },
				emoji: capeEmoji,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.StarCollectorProp,
				cost: { candles: 70 },
				emoji: placeablePropEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			96,
			skyDate(2_023, 9, 14),
		),
	},
});
