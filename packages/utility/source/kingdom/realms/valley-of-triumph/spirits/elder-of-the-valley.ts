import { Cosmetic, CosmeticCommon } from "../../../../cosmetics.js";
import { ElderSpirit } from "../../../../models/spirits.js";
import { SpiritId } from "../../../../utility/spirits.js";
import { AreaName } from "../../../geography.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheValley,
	area: AreaName.ThePassage,
	offer: {
		current: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ElderOfTheValleyBlessing1,
					cost: { ascendedCandles: 2 },
				},
				{
					cosmetic: Cosmetic.ElderOfTheValleyHair1,
					cost: { ascendedCandles: 5 },
					children: [
						{
							translation: { key: CosmeticCommon.FaceAccessoryMultiple, number: 1 },
							cosmetic: Cosmetic.ElderOfTheValleyFaceAccessory1,
							cost: { ascendedCandles: 150 },
						},
					],
				},
				{
					cosmetic: Cosmetic.ElderOfTheValleyHair2,
					cost: { ascendedCandles: 6 },
					children: [
						{
							translation: { key: CosmeticCommon.FaceAccessoryMultiple, number: 2 },
							cosmetic: Cosmetic.ElderOfTheValleyFaceAccessory2,
							cost: { ascendedCandles: 150 },
						},
					],
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ElderOfTheValleyBlessing2,
					cost: { ascendedCandles: 2 },
				},
			],
		],
	},
});
