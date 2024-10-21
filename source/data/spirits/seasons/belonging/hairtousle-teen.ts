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
	FACE_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../utility/spirits.js";

const action = FriendAction.HairTousle;
const actionEmoji = FriendActionToEmoji[action];
const blessing1 = MISCELLANEOUS_EMOJIS.Blessing1;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory08;
const heldProp = HELD_PROPS_EMOJIS.HeldProp14;

export default new SeasonalSpirit({
	name: SpiritName.HairtousleTeen,
	seasonId: SeasonId.Belonging,
	action,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionHairTousle1, emoji: actionEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HairtousleTeenBlessing1,
				cost: { seasonalCandles: 12 },
				emoji: blessing1,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.HairtousleTeenBlessing2, emoji: blessing2 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.HairtousleTeenMusicSheet,
				cost: { seasonalCandles: 14 },
				emoji: musicSheet,
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionHairTousle2, emoji: actionEmoji },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.HairtousleTeenBlessing3,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{ name: "Earmuffs", cosmetic: Cosmetic.HairtousleTeenEarmuffs, emoji: faceAccessoryEmoji },
			{
				name: "Ukelele",
				cosmetic: Cosmetic.HairtousleTeenUkulele,
				cost: { seasonalCandles: 18 },
				emoji: heldProp,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.HairtousleTeenBlessing4, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.HairtousleTeenSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.BelongingHeart,
			},
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionHairTousle1, emoji: actionEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HairtousleTeenBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.HairtousleTeenMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.HairtousleTeenSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.HairtousleTeenWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.HairtousleTeenBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionHairTousle2,
				cost: { hearts: 9 },
				emoji: actionEmoji,
			},
			{
				name: "Ukulele",
				cosmetic: Cosmetic.HairtousleTeenUkulele,
				cost: { candles: 70 },
				emoji: heldProp,
			},
			{
				name: "Earmuffs",
				cosmetic: Cosmetic.HairtousleTeenEarmuffs,
				cost: { candles: 50 },
				emoji: faceAccessoryEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(11, skyDate(2_020, 6, 11))
			.set(63, skyDate(2_022, 6, 9))
			.set(110, skyDate(2_024, 3, 28)),
	},
});
