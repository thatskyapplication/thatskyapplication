import { Cosmetic, CosmeticCommon } from "../../../../cosmetics.js";
import { StandardSpirit } from "../../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../../utility/spirits.js";
import { AreaName } from "../../../geography.js";

const emote = SpiritEmote.Come;

export default new StandardSpirit({
	id: SpiritId.UsheringStargazer,
	emote,
	area: AreaName.TempleOfTheIsle,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteCome1 },
				{
					cosmetic: Cosmetic.EmoteCome2,
					cost: { candles: 1 },
					level: 2,
				},
				{ translation: CosmeticCommon.Hair, cosmetic: Cosmetic.UsheringStargazerHair },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.UsheringStargazerBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.UsheringStargazerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.UsheringStargazerWingBuff,
					cost: { ascendedCandles: 1 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteCome3,
					cost: { candles: 2 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteCome4,
					cost: { candles: 2 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.UsheringStargazerOutfit,
					cost: { hearts: 4 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.UsheringStargazerBlessing2,
					cost: { candles: 5 },
				},
			],
		],
	},
});
