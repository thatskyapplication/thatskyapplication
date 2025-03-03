import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../index.js";

const emote = SpiritEmote.Duck;

export default new StandardSpirit({
	id: SpiritId.FrightenedRefugee,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDuck1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteDuck2,
				cost: { candles: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.FrightenedRefugeeBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.FrightenedRefugeeHair,
				cost: { hearts: 3 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.FrightenedRefugeeHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.FrightenedRefugeeWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDuck3,
				cost: { candles: 5 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteDuck4,
				cost: { candles: 5 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.FrightenedRefugeeBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Contrabass",
				cosmetic: Cosmetic.FrightenedRefugeeContrabass,
				cost: { hearts: 5 },
			},
		],
	},
});
