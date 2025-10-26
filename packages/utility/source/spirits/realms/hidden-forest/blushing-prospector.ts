import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Shy;

export default new StandardSpirit({
	id: SpiritId.BlushingProspector,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteBlush1 },
				{
					cosmetic: Cosmetic.EmoteBlush2,
					cost: { candles: 3 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BlushingProspectorBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.BlushingProspectorHair,
					cost: { hearts: 3 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.BlushingProspectorHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.BlushingProspectorWingBuff,
					cost: { ascendedCandles: 1 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBlush3,
					cost: { candles: 4 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteBlush4,
					cost: { candles: 4 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BlushingProspectorBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.BlushingProspectorDrum,
					cost: { hearts: 5 },
				},
			],
		],
	},
});
