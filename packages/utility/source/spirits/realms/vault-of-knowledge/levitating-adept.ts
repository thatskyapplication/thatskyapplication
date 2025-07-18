import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Telekinesis;

export default new StandardSpirit({
	id: SpiritId.LevitatingAdept,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmoteTelekinesis1 },
			{
				cosmetic: Cosmetic.EmoteTelekinesis2,
				cost: { candles: 5 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.LevitatingAdeptBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.LevitatingAdeptHair,
				cost: { hearts: 5 },
			},
			{
				cosmetic: Cosmetic.LevitatingAdeptHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.LevitatingAdeptWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteTelekinesis3,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.EmoteTelekinesis4,
				cost: { candles: 7 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.LevitatingAdeptBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LevitatingAdeptFaceAccessory,
				cost: { hearts: 10 },
			},
		],
	},
});
