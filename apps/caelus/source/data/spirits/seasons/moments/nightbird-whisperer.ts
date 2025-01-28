import { Cosmetic, RealmName, SeasonId, SpiritCall, SpiritName } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritCallToEmoji } from "../../../../utility/spirits.js";

const call = SpiritCall.Nightbird;
const callEmoji = SpiritCallToEmoji[call];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit49;
const shoeEmoji = SHOE_EMOJIS.Shoe04;
const hairEmoji = HAIR_EMOJIS.Hair127;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory26;

export default new SeasonalSpirit({
	name: SpiritName.NightbirdWhisperer,
	seasonId: SeasonId.Moments,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallNightbird, emoji: callEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.NightbirdWhispererHair,
				cost: { seasonalCandles: 12 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.NightbirdWhispererBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.NightbirdWhispererBlessing2,
				cost: { seasonalCandles: 24 },
				emoji: blessing3,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.NightbirdWhispererHairAccessory,
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.NightbirdWhispererOutfit,
				cost: { seasonalCandles: 28 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.NightbirdWhispererBlessing3, emoji: blessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.NightbirdWhispererBlessing4,
				cost: { seasonalCandles: 36 },
				emoji: blessing3,
			},
			{ name: "Shoes", cosmetic: Cosmetic.NightbirdWhispererShoes, emoji: shoeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NightbirdWhispererSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.MomentsHeart,
			},
		],
	},
});
