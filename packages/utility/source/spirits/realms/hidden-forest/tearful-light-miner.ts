import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Crying;

export default new StandardSpirit({
	id: SpiritId.TearfulLightMiner,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteCrying1 },
				{
					cosmetic: Cosmetic.EmoteCrying2,
					cost: { candles: 3 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TearfulLightMinerBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TearfulLightMinerHair,
					cost: { hearts: 3 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.TearfulLightMinerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
					cosmetic: Cosmetic.TearfulLightMinerWingBuff1,
					cost: { ascendedCandles: 1 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteCrying3,
					cost: { candles: 4 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteCrying4,
					cost: { candles: 4 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TearfulLightMinerBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
					cosmetic: Cosmetic.TearfulLightMinerWingBuff2,
					cost: { ascendedCandles: 3 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteCrying5,
					cost: { candles: 5 },
					level: 5,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteCrying6,
					cost: { candles: 5 },
					level: 6,
				},
			],
		],
	},
});
