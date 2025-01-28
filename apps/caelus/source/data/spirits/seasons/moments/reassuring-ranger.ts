import { FriendAction, RealmName, SeasonId, SpiritName } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { FriendActionToEmoji } from "../../../../utility/spirits.js";

const action = FriendAction.SideHug;
const actionEmoji = FriendActionToEmoji[action];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const maskEmoji = MASK_EMOJIS.Mask81;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory27;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory25;
const capeEmoji = CAPE_EMOJIS.Cape107;

export default new SeasonalSpirit({
	name: SpiritName.ReassuringRanger,
	seasonId: SeasonId.Moments,
	action,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionSideHug1, emoji: actionEmoji },
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionSideHug2, emoji: actionEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ReassuringRangerBlessing1,
				cost: { seasonalCandles: 16 },
				emoji: blessing3,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ReassuringRangerFaceAccessory,
				emoji: faceAccessoryEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ReassuringRangerMask,
				cost: { seasonalCandles: 26 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ReassuringRangerBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ReassuringRangerBlessing3,
				cost: { seasonalCandles: 30 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.ReassuringRangerCape, emoji: capeEmoji },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.ReassuringRangerHairAccessory,
				cost: { seasonalCandles: 36 },
				emoji: hairAccessoryEmoji,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.ReassuringRangerBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ReassuringRangerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.MomentsHeart,
			},
		],
	},
});
