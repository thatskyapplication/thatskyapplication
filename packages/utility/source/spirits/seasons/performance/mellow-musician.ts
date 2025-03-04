import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Headbob;

export default new SeasonalSpirit({
	id: SpiritId.MellowMusician,
	seasonId: SeasonId.Performance,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHeadbob1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteHeadbob2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.MellowMusicianMask,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.MellowMusicianBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MellowMusicianBlessing2,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Cape", cosmetic: Cosmetic.MellowMusicianCape },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHeadbob3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteHeadbob4 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.MellowMusicianBlessing3,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Electric guitar", cosmetic: Cosmetic.MellowMusicianElectricGuitar },
			{
				name: "Hair",
				cosmetic: Cosmetic.MellowMusicianHair,
				cost: { seasonalCandles: 36 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.MellowMusicianBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.MellowMusicianSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHeadbob1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteHeadbob2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MellowMusicianBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.MellowMusicianMask,
				cost: { candles: 32 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MellowMusicianSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.MellowMusicianWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHeadbob3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteHeadbob4,
				cost: { hearts: 6 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.MellowMusicianCape,
				cost: { candles: 70 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MellowMusicianBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.MellowMusicianHair,
				cost: { candles: 42 },
			},
			{
				name: "Electric guitar",
				cosmetic: Cosmetic.MellowMusicianElectricGuitar,
				cost: { candles: 80 },
			},
		],
	},
	visits: {
		travelling: [119],
	},
});
