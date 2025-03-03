import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../index.js";

const emote = SpiritEmote.Salute;

export default new StandardSpirit({
	id: SpiritId.SalutingCaptain,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSalute1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteSalute2,
				cost: { candles: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SalutingCaptainBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SalutingCaptainHair,
				cost: { hearts: 5 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SalutingCaptainHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SalutingCaptainWingBuff,
				cost: { ascendedCandles: 3 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSalute3,
				cost: { candles: 5 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteSalute4,
				cost: { candles: 5 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SalutingCaptainBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Fireworks staff",
				cosmetic: Cosmetic.SalutingCaptainFireworksStaff,
				cost: { hearts: 20 },
			},
		],
	},
});
