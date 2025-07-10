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
			{ cosmetic: Cosmetic.EmoteTiptoeing1 },
			{ cosmetic: Cosmetic.EmoteTiptoeing2 },
			{
				cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.TiptoeingTeaBrewerHair },
			{
				cosmetic: Cosmetic.EmoteTiptoeing3,
				cost: { seasonalCandles: 24 },
			},
			{ cosmetic: Cosmetic.EmoteTiptoeing4 },
			{
				cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing2,
				cost: { seasonalCandles: 34 },
			},
			{ cosmetic: Cosmetic.TiptoeingTeaBrewerOutfit },
			{
				cosmetic: Cosmetic.TiptoeingTeaBrewerCape,
				cost: { seasonalCandles: 38 },
			},
			{ cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing3 },
			{
				cosmetic: Cosmetic.TiptoeingTeaBrewerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
