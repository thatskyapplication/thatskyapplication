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
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const action = FriendAction.Carry;
const actionEmoji = FriendActionToEmoji[action];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask12;
const hairEmoji = HAIR_EMOJIS.Hair42;
const capeEmoji = CAPE_EMOJIS.Cape17;

export default new SeasonalSpirit({
	name: SpiritName.PiggybackLightseeker,
	season: SeasonName.Lightseekers,
	action,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionCarry1, emoji: actionEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.PiggybackLightseekerMask,
				cost: { seasonalCandles: 16 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.PiggybackLightseekerBlessing1, emoji: blessing2 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PiggybackLightseekerBlessing2,
				cost: { seasonalCandles: 18 },
				emoji: blessing2,
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionCarry2, emoji: actionEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.PiggybackLightseekerHair,
				cost: { seasonalCandles: 20 },
				emoji: hairEmoji,
			},
			{ name: "Cape", cosmetic: Cosmetic.PiggybackLightseekerCape, emoji: capeEmoji },
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionCarry1, emoji: actionEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PiggybackLightseekerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.PiggybackLightseekerMask,
				cost: { candles: 24 },
				emoji: maskEmoji,
			},
			{ name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PiggybackLightseekerBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionCarry2,
				cost: { hearts: 8 },
				emoji: actionEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.PiggybackLightseekerHair,
				cost: { candles: 26 },
				emoji: hairEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.PiggybackLightseekerCape,
				cost: { candles: 60 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(7, skyDate(2_020, 4, 16))
			.set(30, skyDate(2_021, 3, 4))
			.set(80, skyDate(2_023, 2, 2)),
	},
});
