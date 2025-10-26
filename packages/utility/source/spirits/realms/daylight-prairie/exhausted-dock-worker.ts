import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.WipeBrow;

export default new StandardSpirit({
	id: SpiritId.ExhaustedDockWorker,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteWipeBrow1 },
				{
					cosmetic: Cosmetic.EmoteWipeBrow2,
					cost: { candles: 1 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ExhaustedDockWorkerBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ExhaustedDockWorkerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ExhaustedDockWorkerWingBuff,
					cost: { ascendedCandles: 1 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteWipeBrow3,
					cost: { candles: 5 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteWipeBrow4,
					cost: { candles: 5 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ExhaustedDockWorkerBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.FaceAccessory,
					cosmetic: Cosmetic.ExhaustedDockWorkerFaceAccessory,
					cost: { hearts: 3 },
				},
			],
		],
	},
});
