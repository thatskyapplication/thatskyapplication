import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.NoThanks;

export default new StandardSpirit({
	id: SpiritId.RejectingVoyager,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmoteNoThanks1 },
			{
				cosmetic: Cosmetic.EmoteNoThanks2,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.RejectingVoyagerBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.RejectingVoyagerHair,
				cost: { hearts: 1 },
			},
			{
				cosmetic: Cosmetic.RejectingVoyagerHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.RejectingVoyagerWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				cosmetic: Cosmetic.EmoteNoThanks3,
				cost: { candles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteNoThanks4,
				cost: { candles: 2 },
			},
			{
				cosmetic: Cosmetic.RejectingVoyagerFaceAccessory,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.RejectingVoyagerBlessing2,
				cost: { candles: 5 },
			},
		],
	},
});
