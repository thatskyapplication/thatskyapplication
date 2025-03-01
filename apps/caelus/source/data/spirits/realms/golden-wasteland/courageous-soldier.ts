import {
	Cosmetic,
	RealmName,
	SpiritId,
	SpiritStance,
	StandardSpirit,
} from "@thatskyapplication/utility";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritStanceToEmoji } from "../../../../utility/spirits.js";

const stance = SpiritStance.Courageous;
const stanceEmoji = SpiritStanceToEmoji[stance];

export default new StandardSpirit({
	id: SpiritId.CourageousSoldier,
	stance,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceCourageous, emoji: stanceEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.CourageousSoldierHair,
				cost: { hearts: 4 },
				emoji: HAIR_EMOJIS.Hair23,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CourageousSoldierBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CourageousSoldierHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.CourageousSoldierWingBuff1,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CourageousSoldierBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.CourageousSoldierCape1,
				cost: { hearts: 15 },
				emoji: CAPE_EMOJIS.Cape09,
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.CourageousSoldierWingBuff2,
				cost: { ascendedCandles: 6 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.CourageousSoldierCape2,
				cost: { hearts: 45 },
				emoji: CAPE_EMOJIS.Cape47,
			},
		],
	},
});
