import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Duck;

export default new StandardSpirit({
	id: SpiritId.FrightenedRefugee,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmoteDuck1 },
			{
				cosmetic: Cosmetic.EmoteDuck2,
				cost: { candles: 4 },
			},
			{
				cosmetic: Cosmetic.FrightenedRefugeeBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.FrightenedRefugeeHair,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.FrightenedRefugeeHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.FrightenedRefugeeWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				cosmetic: Cosmetic.EmoteDuck3,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.EmoteDuck4,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.FrightenedRefugeeBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.FrightenedRefugeeContrabass,
				cost: { hearts: 5 },
			},
		],
	},
});
