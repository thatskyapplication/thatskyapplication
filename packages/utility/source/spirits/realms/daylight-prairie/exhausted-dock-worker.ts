import { Cosmetic } from "../../../cosmetics.js";
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
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWipeBrow1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteWipeBrow2,
				cost: { candles: 1 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ExhaustedDockWorkerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ExhaustedDockWorkerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ExhaustedDockWorkerWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWipeBrow3,
				cost: { candles: 5 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteWipeBrow4,
				cost: { candles: 5 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ExhaustedDockWorkerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ExhaustedDockWorkerFaceAccessory,
				cost: { hearts: 3 },
			},
		],
	},
});
