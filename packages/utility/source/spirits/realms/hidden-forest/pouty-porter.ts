import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Angry;

export default new StandardSpirit({
	id: SpiritId.PoutyPorter,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmoteAngry1 },
			{
				cosmetic: Cosmetic.EmoteAngry2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.PoutyPorterBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.PoutyPorterHair,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.PoutyPorterHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.PoutyPorterWingBuff1,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteAngry3,
				cost: { candles: 4 },
			},
			{
				cosmetic: Cosmetic.EmoteAngry4,
				cost: { candles: 4 },
			},
			{
				cosmetic: Cosmetic.PoutyPorterBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.PoutyPorterCape1,
				cost: { hearts: 20 },
			},
			{
				cosmetic: Cosmetic.PoutyPorterWingBuff2,
				cost: { ascendedCandles: 6 },
			},
			{
				cosmetic: Cosmetic.PoutyPorterCape2,
				cost: { hearts: 60 },
			},
		],
	},
});
