import { Cosmetic, CosmeticCommon } from "../../../../cosmetics.js";
import { StandardSpirit } from "../../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../../utility/spirits.js";
import { AreaName } from "../../../geography.js";

const emote = SpiritEmote.Point;

export default new StandardSpirit({
	id: SpiritId.PointingCandlemaker,
	emote,
	area: AreaName.DawnCircle,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmotePoint1 },
				{
					cosmetic: Cosmetic.EmotePoint2,
					cost: { candles: 1 },
					level: 2,
				},
				{ translation: CosmeticCommon.Hair, cosmetic: Cosmetic.PointingCandlemakerHair },
			],
			[
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.PointingCandlemakerBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.PointingCandlemakerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.PointingCandlemakerWingBuff,
					cost: { ascendedCandles: 1 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmotePoint3,
					cost: { candles: 2 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmotePoint4,
					cost: { candles: 2 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.PointingCandlemakerOutfit,
					cost: { hearts: 4 },
				},
			],
			[
				{
					cosmetic: Cosmetic.PointingCandlemakerTrailSpell,
					cost: { candles: 5 },
				},
			],
		],
	},
});
