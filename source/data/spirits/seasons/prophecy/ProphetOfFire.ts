import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import {
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.ChestPound;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit17;
const maskEmoji = MASK_EMOJIS.Mask35;
const hairEmoji = HAIR_EMOJIS.Hair68;
const placeablePropEmoji1 = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp22;
const placeablePropEmoji2 = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp31;

export default new SeasonalSpirit({
	name: SpiritName.ProphetOfFire,
	seasonId: SeasonId.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteChestPound1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteChestPound2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfFireBlessing1,
				cost: { seasonalCandles: 13 },
				emoji: blessing2,
			},
			{ name: "Hair", cosmetic: Cosmetic.ProphetOfFireHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteChestPound3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteChestPound4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfFireBlessing2,
				cost: { seasonalCandles: 23 },
				emoji: blessing2,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.ProphetOfFireMusicSheet, emoji: musicSheet },
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfFireMask,
				cost: { seasonalCandles: 29 },
				emoji: maskEmoji,
			},
			{ name: "Outfit", cosmetic: Cosmetic.ProphetOfFireOutfit, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ProphetOfFireSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.ProphecyHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteChestPound1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteChestPound2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.ProphetOfFireProp,
				cost: { candles: 15 },
				emoji: placeablePropEmoji2,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProphetOfFireBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ProphetOfFireHair,
				cost: { candles: 44 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProphetOfFireSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ProphetOfFireWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteChestPound3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteChestPound4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ProphetOfFireMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProphetOfFireBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProphetOfFireMask,
				cost: { candles: 54 },
				emoji: maskEmoji,
			},
			{
				name: "Cauldron",
				cosmetic: Cosmetic.ProphetOfFireCauldron,
				cost: { hearts: 13 },
				emoji: placeablePropEmoji1,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ProphetOfFireOutfit,
				cost: { candles: 75 },
				emoji: outfitEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(50, skyDate(2_021, 12, 9))
			.set(93, skyDate(2_023, 8, 3)),
	},
});
