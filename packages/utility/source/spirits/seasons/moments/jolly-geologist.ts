import { Cosmetic } from "../../../cosmetics.js";
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
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteJollyDance1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteJollyDance2 },
			{
				name: "Face accessory",
				cosmetic: Cosmetic.JollyGeologistFaceAccessory,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Hair", cosmetic: Cosmetic.JollyGeologistHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteJollyDance3,
				cost: { seasonalCandles: 20 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteJollyDance4 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.JollyGeologistBlessing1,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.JollyGeologistBlessing2 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.JollyGeologistMusicSheet,
				cost: { seasonalCandles: 34 },
			},
			{ name: "Prop", cosmetic: Cosmetic.JollyGeologistProp },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.JollyGeologistSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
