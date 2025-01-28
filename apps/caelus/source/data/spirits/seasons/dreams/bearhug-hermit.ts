import {
	Cosmetic,
	FriendAction,
	RealmName,
	SeasonId,
	SpiritName,
} from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { FriendActionToEmoji } from "../../../../utility/spirits.js";

const action = FriendAction.Bearhug;
const actionEmoji = FriendActionToEmoji[action];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit19;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory12;
const hairEmoji = HAIR_EMOJIS.Hair70;

export default new SeasonalSpirit({
	name: SpiritName.BearhugHermit,
	seasonId: SeasonId.Dreams,
	action,
	realm: RealmName.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionBearhug1, emoji: actionEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BearhugHermitBlessing1,
				cost: { seasonalCandles: 13 },
				emoji: blessing2,
			},
			{ name: "Red horns", cosmetic: Cosmetic.BearhugHermitRedHorns, emoji: faceAccessoryEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BearhugHermitBlessing2,
				cost: { seasonalCandles: 18 },
				emoji: blessing2,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.BearhugHermitMusicSheet, emoji: musicSheet },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.BearhugHermitBlessing3,
				cost: { seasonalCandles: 23 },
				emoji: blessing2,
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionBearhug2, emoji: actionEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.BearhugHermitHair,
				cost: { seasonalCandles: 29 },
				emoji: hairEmoji,
			},
			{ name: "Outfit", cosmetic: Cosmetic.BearhugHermitOutfit, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BearhugHermitSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DreamsHeart,
			},
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionBearhug1, emoji: actionEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.BearhugHermitMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BearhugHermitBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Red horns",
				cosmetic: Cosmetic.BearhugHermitRedHorns,
				cost: { candles: 42 },
				emoji: faceAccessoryEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BearhugHermitSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BearhugHermitWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BearhugHermitBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionBearhug2,
				cost: { hearts: 8 },
				emoji: actionEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.BearhugHermitHair,
				cost: { candles: 50 },
				emoji: hairEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.BearhugHermitOutfit,
				cost: { candles: 70 },
				emoji: outfitEmoji,
			},
		],
	},
	keywords: ["yeti"],
	visits: {
		travelling: [75, 107],
	},
});
