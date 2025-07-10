import { Cosmetic } from "../../../cosmetics.js";
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
			{ cosmetic: Cosmetic.EmoteBlush1 },
			{
				cosmetic: Cosmetic.EmoteBlush2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.BlushingProspectorBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.BlushingProspectorHair,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.BlushingProspectorHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.BlushingProspectorWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				cosmetic: Cosmetic.EmoteBlush3,
				cost: { candles: 4 },
			},
			{
				cosmetic: Cosmetic.EmoteBlush4,
				cost: { candles: 4 },
			},
			{
				cosmetic: Cosmetic.BlushingProspectorBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.BlushingProspectorDrum,
				cost: { hearts: 5 },
			},
		],
	},
});
