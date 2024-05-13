/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, SeasonalSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../Utility/spirits.js";

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
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { item: "Hair", cost: { seasonalCandles: 12 }, emoji: hairEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 3, { item: "Blessing 2", cost: { seasonalCandles: 24 }, emoji: blessing3 })
			.set(1 << 4, { item: "Hair accessory", cost: null, emoji: hairAccessoryEmoji })
			.set(1 << 5, { item: "Outfit", cost: { seasonalCandles: 28 }, emoji: outfitEmoji })
			.set(1 << 6, { item: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 7, { item: "Blessing 4", cost: { seasonalCandles: 36 }, emoji: blessing3 })
			.set(1 << 8, { item: "Shoes", cost: null, emoji: shoeEmoji })
			.set(1 << 9, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.MomentsHeart }),
	},
});
