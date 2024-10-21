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
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../utility/spirits.js";

const action = FriendAction.PlayFight;
const actionEmoji = FriendActionToEmoji[action];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask28;
const hairEmoji = HAIR_EMOJIS.Hair58;
const capeEmoji = CAPE_EMOJIS.Cape28;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp20;

export default new SeasonalSpirit({
	name: SpiritName.PlayfightingHerbalist,
	seasonId: SeasonId.Enchantment,
	action,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionPlayFight1, emoji: actionEmoji },
			{ name: "Blessing 1", cosmetic: Cosmetic.PlayfightingHerbalistBlessing1, emoji: blessing2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.PlayfightingHerbalistMask,
				cost: { seasonalCandles: 14 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.PlayfightingHerbalistBlessing2, emoji: blessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.PlayfightingHerbalistBlessing3,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionPlayFight2, emoji: actionEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.PlayfightingHerbalistMusicSheet,
				cost: { seasonalCandles: 18 },
				emoji: musicSheet,
			},
			{ name: "Hair", cosmetic: Cosmetic.PlayfightingHerbalistHair, emoji: hairEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.PlayfightingHerbalistCape,
				cost: { seasonalCandles: 20 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.PlayfightingHerbalistBlessing4, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.PlayfightingHerbalistSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.EnchantmentHeart,
			},
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionPlayFight1, emoji: actionEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PlayfightingHerbalistBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.PlayfightingHerbalistMask,
				cost: { candles: 30 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PlayfightingHerbalistSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PlayfightingHerbalistWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PlayfightingHerbalistBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionPlayFight2,
				cost: { hearts: 10 },
				emoji: actionEmoji,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.PlayfightingHerbalistMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.PlayfightingHerbalistBlessing3,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.PlayfightingHerbalistHair,
				cost: { candles: 42 },
				emoji: hairEmoji,
			},
			{
				name: "Orb",
				cosmetic: Cosmetic.PlayfightingHerbalistOrb,
				cost: { candles: 20 },
				emoji: placeablePropEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.PlayfightingHerbalistCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(47, skyDate(2_021, 10, 28))
			.set(98, skyDate(2_023, 10, 12)),
	},
});
