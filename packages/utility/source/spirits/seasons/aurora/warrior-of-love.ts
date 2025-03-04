import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Twirl;

export default new SeasonalSpirit({
	id: SpiritId.WarriorOfLove,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTwirl1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteTwirl2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.WarriorOfLoveMask,
				cost: { seasonalCandles: 6 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.WarriorOfLoveBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WarriorOfLoveBlessing2,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Hair", cosmetic: Cosmetic.WarriorOfLoveHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTwirl3,
				cost: { seasonalCandles: 20 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteTwirl4 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.WarriorOfLoveMusicSheet,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.WarriorOfLoveBlessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.WarriorOfLoveBlessing4,
				cost: { seasonalCandles: 30 },
			},
			{ name: "Cape", cosmetic: Cosmetic.WarriorOfLoveCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.WarriorOfLoveSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTwirl1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteTwirl2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WarriorOfLoveBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.WarriorOfLoveMask,
				cost: { candles: 35 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.WarriorOfLoveSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.WarriorOfLoveWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTwirl3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteTwirl4,
				cost: { hearts: 6 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.WarriorOfLoveHair,
				cost: { candles: 40 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WarriorOfLoveBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.WarriorOfLoveMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.WarriorOfLoveCape,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [126],
	},
});
