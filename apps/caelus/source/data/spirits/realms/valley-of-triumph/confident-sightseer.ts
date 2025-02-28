import { Cosmetic, RealmName, SpiritId, SpiritStance } from "@thatskyapplication/utility";
import { StandardSpirit } from "../../../../models/Spirits.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritStanceToEmoji } from "../../../../utility/spirits.js";

const stance = SpiritStance.Confident;
const stanceEmoji = SpiritStanceToEmoji[stance];

export default new StandardSpirit({
	id: SpiritId.ConfidentSightseer,
	stance,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceConfident, emoji: stanceEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.ConfidentSightseerHair,
				cost: { hearts: 2 },
				emoji: HAIR_EMOJIS.Hair17,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ConfidentSightseerBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ConfidentSightseerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ConfidentSightseerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ConfidentSightseerBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ConfidentSightseerOutfit,
				cost: { hearts: 5 },
				emoji: OUTFIT_EMOJIS.Outfit07,
			},
		],
	},
});
