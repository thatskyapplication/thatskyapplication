import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.JollyDance;

export default new SeasonalSpirit({
	id: SpiritId.JollyGeologist,
	seasonId: SeasonId.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteJollyDance1 },
			{ cosmetic: Cosmetic.EmoteJollyDance2 },
			{
				cosmetic: Cosmetic.JollyGeologistFaceAccessory,
				cost: { seasonalCandles: 8 },
			},
			{ cosmetic: Cosmetic.JollyGeologistHair },
			{
				cosmetic: Cosmetic.EmoteJollyDance3,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.EmoteJollyDance4 },
			{
				cosmetic: Cosmetic.JollyGeologistBlessing1,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.JollyGeologistBlessing2 },
			{
				cosmetic: Cosmetic.JollyGeologistMusicSheet,
				cost: { seasonalCandles: 34 },
			},
			{ cosmetic: Cosmetic.JollyGeologistProp },
			{
				cosmetic: Cosmetic.JollyGeologistSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 7, 17), end: skyDate(2025, 7, 21) }],
	},
});
