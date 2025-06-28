import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Grieving;

export default new SeasonalSpirit({
	id: SpiritId.BereftVeteran,
	seasonId: SeasonId.Remembrance,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrieving1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteGrieving2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.BereftVeteranMask,
				cost: { seasonalCandles: 6 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.BereftVeteranBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BereftVeteranBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Hair", cosmetic: Cosmetic.BereftVeteranHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrieving3,
				cost: { seasonalCandles: 30 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteGrieving4 },
			{
				name: "Cape",
				cosmetic: Cosmetic.BereftVeteranCape,
				cost: { seasonalCandles: 34 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.BereftVeteranBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BereftVeteranSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrieving1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteGrieving2, cost: { hearts: 4 } },
			{ name: "Blessing 1", cosmetic: Cosmetic.BereftVeteranBlessing1, cost: { candles: 5 } },
			{
				name: "Mask",
				cosmetic: Cosmetic.BereftVeteranMask,
				cost: { candles: 35 },
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BereftVeteranSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BereftVeternWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrieving3,
				cost: { hearts: 3 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteGrieving4, cost: { hearts: 6 } },

			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BereftVeteranBlessing2,
				cost: { candles: 5 },
			},
			{ name: "Hair", cosmetic: Cosmetic.BereftVeteranHair, cost: { candles: 60 } },
			{
				name: "Cape",
				cosmetic: Cosmetic.BereftVeteranCape,
				cost: { candles: 80 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 5, 22), end: skyDate(2025, 5, 26) }],
	},
});
