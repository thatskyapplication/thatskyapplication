import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.BlowKiss;

export default new SeasonalSpirit({
	id: SpiritId.AdmiringActor,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBlowKiss1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBlowKiss2 },
			{
				name: "Blessing",
				cosmetic: Cosmetic.AdmiringActorBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.AdmiringActorMusicSheet },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBlowKiss3,
				cost: { seasonalCandles: 14 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBlowKiss4 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.AdmiringActorOutfit,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Mask", cosmetic: Cosmetic.AdmiringActorMask },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.AdmiringActorSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBlowKiss1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBlowKiss2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.AdmiringActorBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.AdmiringActorMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.AdmiringActorSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.AdmiringActorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBlowKiss3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBlowKiss4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.AdmiringActorBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.AdmiringActorOutfit,
				cost: { candles: 65 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.AdmiringActorMask,
				cost: { candles: 42 },
			},
		],
	},
	visits: {
		travelling: [20, 38, 89],
	},
});
