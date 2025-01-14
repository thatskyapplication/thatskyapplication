import { RealmName } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Grateful;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const hairEmoji = HAIR_EMOJIS.Hair64;
const capeEmoji = CAPE_EMOJIS.Cape32;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp17;

export default new SeasonalSpirit({
	name: SpiritName.GratefulShellCollector,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrateful1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteGrateful2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GratefulShellCollectorBlessing1,
				cost: { seasonalCandles: 14 },
				emoji: blessing2,
			},
			{ name: "Hair", cosmetic: Cosmetic.GratefulShellCollectorHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrateful3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteGrateful4, emoji: emoteEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.GratefulShellCollectorCape,
				cost: { seasonalCandles: 18 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.GratefulShellCollectorBlessing2, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.GratefulShellCollectorSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.SanctuaryHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrateful1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteGrateful2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Chairs",
				cosmetic: Cosmetic.GratefulShellCollectorChairs,
				cost: { candles: 45 },
				emoji: placeablePropEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GratefulShellCollectorBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.GratefulShellCollectorHair,
				cost: { candles: 34 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.GratefulShellCollectorSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.GratefulShellCollectorWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrateful3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteGrateful4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.GratefulShellCollectorBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.GratefulShellCollectorCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: [45, 88],
	},
});
