import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Tiptoeing;

export default new SeasonalSpirit({
	id: SpiritId.TiptoeingTeaBrewer,
	seasonId: SeasonId.Remembrance,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTiptoeing1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteTiptoeing2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Hair", cosmetic: Cosmetic.TiptoeingTeaBrewerHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTiptoeing3,
				cost: { seasonalCandles: 24 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteTiptoeing4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing2,
				cost: { seasonalCandles: 34 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.TiptoeingTeaBrewerOutfit },
			{
				name: "Cape",
				cosmetic: Cosmetic.TiptoeingTeaBrewerCape,
				cost: { seasonalCandles: 38 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TiptoeingTeaBrewerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
