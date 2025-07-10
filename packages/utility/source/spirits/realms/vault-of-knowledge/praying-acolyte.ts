import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Pray;

export default new StandardSpirit({
	id: SpiritId.PrayingAcolyte,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmotePray1 },
			{
				cosmetic: Cosmetic.EmotePray2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.PrayingAcolyteBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.PrayingAcolyteHair,
				cost: { hearts: 5 },
			},
			{
				cosmetic: Cosmetic.PrayingAcolyteHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.PrayingAcolyteWingBuff1,
				cost: { ascendedCandles: 3 },
			},
			{
				cosmetic: Cosmetic.EmotePray3,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.EmotePray4,
				cost: { candles: 7 },
			},
			{
				cosmetic: Cosmetic.PrayingAcolyteBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.PrayingAcolyteCape1,
				cost: { hearts: 25 },
			},
			{
				cosmetic: Cosmetic.PrayingAcolyteWingBuff2,
				cost: { ascendedCandles: 9 },
			},
			{
				cosmetic: Cosmetic.PrayingAcolyteCape2,
				cost: { hearts: 75 },
			},
		],
	},
});
