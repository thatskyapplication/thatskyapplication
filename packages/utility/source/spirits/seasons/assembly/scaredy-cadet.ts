import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Eww;

export default new SeasonalSpirit({
	id: SpiritId.ScaredyCadet,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteEww1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteEww2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.ScaredyCadetMask,
				cost: { seasonalCandles: 5 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.ScaredyCadetBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteEww3,
				cost: { seasonalCandles: 10 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteEww4 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ScaredyCadetMusicSheet,
				cost: { seasonalCandles: 15 },
			},
			{ name: "Hair", cosmetic: Cosmetic.ScaredyCadetHair },
			{
				name: "Hammock",
				cosmetic: Cosmetic.ScaredyCadetHammock,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ScaredyCadetBlessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ScaredyCadetSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteEww1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteEww2, cost: { hearts: 4 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ScaredyCadetBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ScaredyCadetMask,
				cost: { candles: 24 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ScaredyCadetSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ScaredyCadetWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteEww3, cost: { hearts: 3 } },
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteEww4, cost: { hearts: 6 } },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.ScaredyCadetMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ScaredyCadetBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ScaredyCadetHair,
				cost: { candles: 45 },
			},
			{
				name: "Hammock",
				cosmetic: Cosmetic.ScaredyCadetHammock,
				cost: { candles: 55 },
			},
		],
	},
	keywords: ["hammock"],
	visits: {
		returning: [1],
	},
});
