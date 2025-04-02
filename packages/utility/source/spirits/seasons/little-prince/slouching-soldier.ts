import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Slouch;

export default new SeasonalSpirit({
	id: SpiritId.SlouchingSoldier,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSlouch1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSlouch2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SlouchingSoldierBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Hair", cosmetic: Cosmetic.SlouchingSoldierHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSlouch3,
				cost: { seasonalCandles: 14 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSlouch4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SlouchingSoldierBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.SlouchingSoldierMusicSheet },
			{
				name: "Cape",
				cosmetic: Cosmetic.SlouchingSoldierCape,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.SlouchingSoldierBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SlouchingSoldierSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSlouch1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteSlouch2,
				cost: { hearts: 4 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SlouchingSoldierSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SlouchingSoldierBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SlouchingSoldierMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SlouchingSoldierHair,
				cost: { candles: 42 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SlouchingSoldierWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSlouch3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteSlouch4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SlouchingSoldierBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.SlouchingSoldierCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [81],
		returning: [8],
	},
});
