import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
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
const outfitEmoji = OUTFIT_EMOJIS.Outfit49;
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
		seasonal: [
			{ name: `${call} call`, bit: 1 << 0, emoji: callEmoji },
			{ name: "Hair", bit: 1 << 1, cost: { seasonalCandles: 12 }, emoji: hairEmoji },
			{ name: "Blessing 1", bit: 1 << 2, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 3, cost: { seasonalCandles: 24 }, emoji: blessing3 },
			{ name: "Hair accessory", bit: 1 << 4, emoji: hairAccessoryEmoji },
			{ name: "Outfit", bit: 1 << 5, cost: { seasonalCandles: 28 }, emoji: outfitEmoji },
			{ name: "Blessing 3", bit: 1 << 6, emoji: blessing3 },
			{ name: "Blessing 4", bit: 1 << 7, cost: { seasonalCandles: 36 }, emoji: blessing3 },
			{ name: "Shoes", bit: 1 << 8, emoji: shoeEmoji },
			{ name: "Seasonal heart", bit: 1 << 9, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.MomentsHeart },
		],
	},
});
