import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const action = FriendAction.Handshake;
const actionEmoji = FriendActionToEmoji[action];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit31;
const maskEmoji = MASK_EMOJIS.Mask61;
const hairEmoji = HAIR_EMOJIS.Hair105;

export default new SeasonalSpirit({
	name: SpiritName.FranticStagehand,
	season: SeasonName.Performance,
	action,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionHandshake1, emoji: actionEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.FranticStagehandBlessing1,
				cost: { seasonalCandles: 10 },
				emoji: blessing3,
			},
			{ name: "Hood", cosmetic: Cosmetic.FranticStagehandHood, emoji: hairEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.FranticStagehandMusicSheet,
				cost: { seasonalCandles: 22 },
				emoji: musicSheet,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.FranticStagehandBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.FranticStagehandBlessing3,
				cost: { seasonalCandles: 26 },
				emoji: blessing3,
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionHandshake2, emoji: actionEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.FranticStagehandMask,
				cost: { seasonalCandles: 30 },
				emoji: maskEmoji,
			},
			{ name: "Outfit", cosmetic: Cosmetic.FranticStagehandOutfit, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.FranticStagehandSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PerformanceHeart,
			},
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionHandshake1, emoji: actionEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.FranticStagehandMusicSheet,
				cost: { candles: 22 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.FranticStagehandBlessing1,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Hood",
				cosmetic: Cosmetic.FranticStagehandHood,
				cost: { candles: 48 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.FranticStagehandSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.FranticStagehandBlessing2, emoji: blessing3 },
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionHandshake2,
				cost: { hearts: 8 },
				emoji: actionEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.FranticStagehandOutfit,
				cost: { candles: 70 },
				emoji: outfitEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.FranticStagehandMask,
				cost: { candles: 34 },
				emoji: maskEmoji,
			},
		],
	},
	visits: {
		returning: [5],
	},
});
