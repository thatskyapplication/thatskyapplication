import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Butterfly;

export default new StandardSpirit({
	id: SpiritId.ButterflyCharmer,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteButterfly1 },
				{
					cosmetic: Cosmetic.EmoteButterfly2,
					cost: { candles: 1 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ButterflyCharmerBlessing1,
					cost: { candles: 1 },
				},
				{
					cosmetic: Cosmetic.ButterflyCharmerCape1,
					cost: { hearts: 3 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ButterflyCharmerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
					cosmetic: Cosmetic.ButterflyCharmerWingBuff1,
					cost: { ascendedCandles: 1 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteButterfly3,
					cost: { candles: 2 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteButterfly4,
					cost: { candles: 2 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ButterflyCharmerOutfit,
					cost: { hearts: 4 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ButterflyCharmerBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
					cosmetic: Cosmetic.ButterflyCharmerWingBuff2,
					cost: { ascendedCandles: 3 },
				},
			],
			[
				{
					cosmetic: Cosmetic.ButterflyCharmerCape2,
					cost: { hearts: 9 },
				},
			],
		],
	},
});
