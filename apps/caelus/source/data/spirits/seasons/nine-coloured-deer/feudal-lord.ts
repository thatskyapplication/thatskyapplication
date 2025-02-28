import { Cosmetic, FriendAction, RealmName, SeasonId, SpiritId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { FriendActionToEmoji } from "../../../../utility/spirits.js";

const action = FriendAction.CradleCarry;
const actionEmoji = FriendActionToEmoji[action];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask87;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory36;
const capeEmoji = CAPE_EMOJIS.Cape123;

export default new SeasonalSpirit({
	id: SpiritId.FeudalLord,
	seasonId: SeasonId.NineColouredDeer,
	action,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionCradleCarry1, emoji: actionEmoji },
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionCradleCarry2, emoji: actionEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.FeudalLordBlessing1,
				cost: { seasonalCandles: 6 },
				emoji: blessing3,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.FeudalLordHairAccessory,
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.FeudalLordMask,
				cost: { seasonalCandles: 18 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.FeudalLordBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.FeudalLordBlessing3,
				cost: { seasonalCandles: 26 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.FeudalLordCape, emoji: capeEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.FeudalLordMusicSheet,
				cost: { seasonalCandles: 32 },
				emoji: musicSheet,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.FeudalLordBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.FeudalLordSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NineColouredDeerHeart,
			},
		],
	},
});
