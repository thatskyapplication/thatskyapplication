import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../utility/spirits.js";

const stance = SpiritStance.Polite;
const stanceEmoji = SpiritStanceToEmoji[stance];

export default new StandardSpirit({
	name: SpiritName.PoliteScholar,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StancePolite, emoji: stanceEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.PoliteScholarOutfit,
				cost: { hearts: 2 },
				emoji: OUTFIT_EMOJIS.Outfit08,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PoliteScholarBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PoliteScholarHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PoliteScholarWingBuff1,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PoliteScholarBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.PoliteScholarHair,
				cost: { hearts: 15 },
				emoji: HAIR_EMOJIS.Hair28,
			},
		],
	},
});
