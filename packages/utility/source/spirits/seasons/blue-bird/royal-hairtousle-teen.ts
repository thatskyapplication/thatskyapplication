import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Amazed;

export default new SeasonalSpirit({
	id: SpiritId.RoyalHairtousleTeen,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{
				name: `${emote} 1`,
				cosmetic: Cosmetic.EmoteAmazed1,
			},
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteAmazed2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.RoyalHairtousleTeenBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Head accessory", cosmetic: Cosmetic.RoyalHairtousleTeenHeadAccessory },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAmazed3,
				cost: { seasonalCandles: 17 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteAmazed4 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.RoyalHairtousleTeenOutfit,
				cost: { seasonalCandles: 25 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.RoyalHairtousleTeenBlessing2 },
			{
				name: "White dye",
				cosmetic: Cosmetic.RoyalHairtousleTeenWhiteDye,
				cost: { seasonalCandles: 29 },
			},
			{ name: "Cape", cosmetic: Cosmetic.RoyalHairtousleTeenCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RoyalHairtousleTeenSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
