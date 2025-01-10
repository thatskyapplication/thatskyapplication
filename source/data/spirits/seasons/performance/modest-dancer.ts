import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../utility/spirits.js";

const action = FriendAction.DuetDance;
const actionEmoji = FriendActionToEmoji[action];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit30;
const maskEmoji = MASK_EMOJIS.Mask60;
const hairEmoji = HAIR_EMOJIS.Hair104;

export default new SeasonalSpirit({
	name: SpiritName.ModestDancer,
	seasonId: SeasonId.Performance,
	action,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionDuetDance1, emoji: actionEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ModestDancerBlessing1,
				cost: { seasonalCandles: 8 },
				emoji: blessing3,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.ModestDancerMusicSheet, emoji: musicSheet },
			{
				name: "Mask",
				cosmetic: Cosmetic.ModestDancerMask,
				cost: { seasonalCandles: 14 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ModestDancerBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ModestDancerBlessing3,
				cost: { seasonalCandles: 26 },
				emoji: blessing3,
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionDuetDance2, emoji: actionEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.ModestDancerOutfit,
				cost: { seasonalCandles: 30 },
				emoji: outfitEmoji,
			},
			{ name: "Hair", cosmetic: Cosmetic.ModestDancerHair, emoji: hairEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ModestDancerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PerformanceHeart,
			},
		],
	},
	visits: {
		returning: [7],
	},
});
