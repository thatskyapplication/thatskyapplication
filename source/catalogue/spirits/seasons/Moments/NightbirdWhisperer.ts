import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const call = SpiritCall.Nightbird;
const callEmoji = SpiritCallToEmoji[call];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit48;
const shoeEmoji = SHOE_EMOJIS.Shoe04;
const hairEmoji = HAIR_EMOJIS.Hair127;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory26;

export default new SeasonalSpirit({
	name: SpiritName.NightbirdWhisperer,
	season: SeasonName.Moments,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { name: "Hair", cost: { seasonalCandles: 12 }, emoji: hairEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 3, { name: "Blessing 2", cost: { seasonalCandles: 24 }, emoji: blessing3 })
			.set(1 << 4, { name: "Hair accessory", cost: null, emoji: hairAccessoryEmoji })
			.set(1 << 5, { name: "Outfit", cost: { seasonalCandles: 28 }, emoji: outfitEmoji })
			.set(1 << 6, { name: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 7, { name: "Blessing 4", cost: { seasonalCandles: 36 }, emoji: blessing3 })
			.set(1 << 8, { name: "Shoes", cost: null, emoji: shoeEmoji })
			.set(1 << 9, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.MomentsHeart }),
	},
});
