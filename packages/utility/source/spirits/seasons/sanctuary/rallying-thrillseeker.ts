import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.RallyCheer;

export default new SeasonalSpirit({
	id: SpiritId.RallyingThrillseeker,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRallyCheer1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteRallyCheer2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.RallyingThrillseekerHair,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.RallyingThrillseekerBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRallyCheer3,
				cost: { seasonalCandles: 12 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteRallyCheer4 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.RallyingThrillseekerOutfit,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.RallyingThrillseekerBlessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RallyingThrillseekerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRallyCheer1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteRallyCheer2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.RallyingThrillseekerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.RallyingThrillseekerHair,
				cost: { candles: 42 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.RallyingThrillseekerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.RallyingThrillseekerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRallyCheer3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteRallyCheer4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RallyingThrillseekerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.RallyingThrillseekerOutfit,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [34, 79],
	},
});
