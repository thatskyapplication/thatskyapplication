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
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../utility/spirits.js";

const action = FriendAction.DoubleFive;
const actionEmoji = FriendActionToEmoji[action];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask13;
const hairEmoji = HAIR_EMOJIS.Hair44;
const heldProp = HELD_PROPS_EMOJIS.HeldProp09;

export default new SeasonalSpirit({
	name: SpiritName.DoublefiveLightCatcher,
	seasonId: SeasonId.Lightseekers,
	action,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionDoubleFive1, emoji: actionEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DoublefiveLightCatcherBlessing1,
				cost: { seasonalCandles: 4 },
				emoji: blessing2,
			},
			{ name: "Hair", cosmetic: Cosmetic.DoublefiveLightCatcherHair, emoji: hairEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.DoublefiveLightCatcherMask,
				cost: { seasonalCandles: 6 },
				emoji: maskEmoji,
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionDoubleFive2, emoji: actionEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DoublefiveLightCatcherBlessing2,
				cost: { seasonalCandles: 8 },
				emoji: blessing2,
			},
			{ name: "Flute", cosmetic: Cosmetic.DoublefiveLightCatcherFlute, emoji: heldProp },
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionDoubleFive1, emoji: actionEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DoublefiveLightCatcherBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.DoublefiveLightCatcherMask,
				cost: { candles: 24 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.DoublefiveLightCatcherHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.DoublefiveLightCatcherWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DoublefiveLightCatcherBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionDoubleFive2,
				cost: { hearts: 7 },
				emoji: actionEmoji,
			},
			{
				name: "Flute",
				cosmetic: Cosmetic.DoublefiveLightCatcherFlute,
				cost: { candles: 55 },
				emoji: heldProp,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.DoublefiveLightCatcherHair,
				cost: { candles: 34 },
				emoji: hairEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(2, skyDate(2_020, 2, 14))
			.set(33, skyDate(2_021, 4, 15))
			.set(66, skyDate(2_022, 7, 21))
			.set(114, skyDate(2_024, 5, 23)),
	},
});
