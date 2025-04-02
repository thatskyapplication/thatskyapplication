import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Stretch;

export default new SeasonalSpirit({
	id: SpiritId.StretchingLamplighter,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteStretch1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteStretch2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.StretchingLamplighterBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Hair", cosmetic: Cosmetic.StretchingLamplighterHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteStretch3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteStretch4 },
			{
				name: "Cape",
				cosmetic: Cosmetic.StretchingLamplighterCape,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.StretchingLamplighterBlessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.StretchingLamplighterSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteStretch1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteStretch2,
				cost: { hearts: 4 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.StretchingLamplighterSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.StretchingLamplighterBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.StretchingLamplighterHair,
				cost: { candles: 44 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.StretchingLamplighterWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteStretch3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteStretch4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.StretchingLamplighterBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.StretchingLamplighterCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [102],
		returning: [8],
	},
});
