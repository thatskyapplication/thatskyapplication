import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Laugh;

export default new StandardSpirit({
	id: SpiritId.LaughingLightCatcher,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteLaugh1 },
				{
					cosmetic: Cosmetic.EmoteLaugh2,
					cost: { candles: 1 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.LaughingLightCollectorBlessing1,
					cost: { candles: 1 },
				},
				{
					cosmetic: Cosmetic.LaughingLightCollectorHarp,
					cost: { hearts: 5 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.LaughingLightCollectorHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.LaughingLightCollectorWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteLaugh3,
					cost: { candles: 5 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteLaugh4,
					cost: { candles: 5 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.LaughingLightCollectorHair,
					cost: { hearts: 5 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.LaughingLightCollectorBlessing2,
					cost: { candles: 5 },
				},
			],
		],
	},
});
