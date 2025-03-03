import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritCall, SpiritId } from "../../index.js";

const call = SpiritCall.Whale;

export default new StandardSpirit({
	id: SpiritId.WhaleWhisperer,
	call,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallWhale },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WhaleWhispererBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.WhaleWhispererHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.WhaleWhispererWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WhaleWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.WhaleWhispererMusicSheet,
				cost: { hearts: 2 },
			},
		],
	},
});
