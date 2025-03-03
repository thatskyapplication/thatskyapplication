import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId, SpiritStance } from "../../index.js";

const stance = SpiritStance.Polite;

export default new StandardSpirit({
	id: SpiritId.PoliteScholar,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StancePolite },
			{
				name: "Outfit",
				cosmetic: Cosmetic.PoliteScholarOutfit,
				cost: { hearts: 2 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PoliteScholarBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PoliteScholarHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PoliteScholarWingBuff1,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PoliteScholarBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.PoliteScholarHair,
				cost: { hearts: 15 },
			},
		],
	},
});
