import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Gloat;

export default new SeasonalSpirit({
	id: SpiritId.GloatingNarcissist,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGloat1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteGloat2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GloatingNarcissistBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.GloatingNarcissistMusicSheet },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGloat3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteGloat4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.GloatingNarcissistBlessing2,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.GloatingNarcissistOutfit },
			{
				name: "Hair",
				cosmetic: Cosmetic.GloatingNarcissistHair,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.GloatingNarcissistBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.GloatingNarcissistSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGloat1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteGloat2,
				cost: { hearts: 4 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.GloatingNarcissistSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GloatingNarcissistBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.GloatingNarcissistMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.GloatingNarcissistHair,
				cost: { candles: 46 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.GloatingNarcissistWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGloat3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteGloat4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.GloatingNarcissistBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.GloatingNarcissistOutfit,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		travelling: [92],
	},
});
