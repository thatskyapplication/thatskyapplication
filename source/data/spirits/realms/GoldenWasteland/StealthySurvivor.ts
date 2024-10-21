import { StandardSpirit } from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../utility/spirits.js";

const stance = SpiritStance.Sneaky;
const stanceEmoji = SpiritStanceToEmoji[stance];

export default new StandardSpirit({
	name: SpiritName.StealthySurvivor,
	stance,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceSneaky, emoji: stanceEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.StealthySurvivorHair,
				cost: { hearts: 5 },
				emoji: HAIR_EMOJIS.Hair24,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.StealthySurvivorBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.StealthySurvivorHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.StealthySurvivorWingBuff1,
				cost: { ascendedCandles: 4 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.StealthySurvivorBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.StealthySurvivorCape1,
				cost: { hearts: 50 },
				emoji: CAPE_EMOJIS.Cape10,
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.StealthySurvivorWingBuff2,
				cost: { ascendedCandles: 12 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.StealthySurvivorCape2,
				cost: { hearts: 150 },
				emoji: CAPE_EMOJIS.Cape82,
			},
		],
	},
});
