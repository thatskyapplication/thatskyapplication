import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Handstand;

export default new StandardSpirit({
	id: SpiritId.HandstandingThrillseeker,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmoteHandstand1 },
			{
				cosmetic: Cosmetic.EmoteHandstand2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.HandstandingThrillseekerBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.HandstandingThrillseekerHeart,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
				cosmetic: Cosmetic.HandstandingThrillseekerWingBuff1,
				cost: { ascendedCandles: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteHandstand3,
				cost: { candles: 4 },
			},
			{
				cosmetic: Cosmetic.EmoteHandstand4,
				cost: { candles: 4 },
			},
			{
				cosmetic: Cosmetic.HandstandingThrillseekerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.HandstandingThrillseekerCape1,
				cost: { hearts: 40 },
			},
			{
				translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
				cosmetic: Cosmetic.HandstandingThrillseekerWingBuff2,
				cost: { ascendedCandles: 9 },
			},
			{
				cosmetic: Cosmetic.HandstandingThrillseekerCape2,
				cost: { hearts: 120 },
			},
		],
	},
});
