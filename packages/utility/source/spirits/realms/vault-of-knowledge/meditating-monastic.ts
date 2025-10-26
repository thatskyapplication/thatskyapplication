import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Float;

export default new StandardSpirit({
	id: SpiritId.MeditatingMonastic,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteFloat1 },
				{
					cosmetic: Cosmetic.EmoteFloat2,
					cost: { candles: 10 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MeditatingMonasticBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.MeditatingMonasticHair,
					cost: { hearts: 10 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.MeditatingMonasticHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.MeditatingMonasticWingBuff,
					cost: { ascendedCandles: 3 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteFloat3,
					cost: { candles: 7 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteFloat4,
					cost: { candles: 10 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MeditatingMonasticBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.MeditatingMonasticTable,
					cost: { hearts: 30 },
				},
			],
		],
	},
});
