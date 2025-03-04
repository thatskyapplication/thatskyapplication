import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Pleading;

export default new SeasonalSpirit({
	id: SpiritId.PleadingChild,
	seasonId: SeasonId.Remembrance,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePleading1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmotePleading2 },
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.PleadingChildNeckAccessory,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.PleadingChildBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PleadingChildBlessing2,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Hair", cosmetic: Cosmetic.PleadingChildHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmotePleading3,
				cost: { seasonalCandles: 26 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmotePleading4 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.PleadingChildOutfit,
				cost: { seasonalCandles: 36 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.PleadingChildBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.PleadingChildSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePleading1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmotePleading2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PleadingChildBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.PleadingChildNeckAccessory,
				cost: { candles: 50 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PleadingChildSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PleadingChildWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmotePleading3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmotePleading4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PleadingChildBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.PleadingChildOutfit,
				cost: { candles: 40 },
			},
			{
				name: "Shoes",
				cosmetic: Cosmetic.PleadingChildShoes,
				cost: { candles: 30 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.PleadingChildHair,
				cost: { candles: 60 },
			},
		],
	},
	visits: {
		returning: [7],
	},
});
