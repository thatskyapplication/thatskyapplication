import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritCall, SpiritId } from "../../../utility/spirits.js";

const call = SpiritCall.Manta;

export default new StandardSpirit({
	id: SpiritId.MantaWhisperer,
	call,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallManta },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MantaWhispererBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MantaWhispererHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.MantaWhispererWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MantaWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.MantaWhispererMusicSheet,
				cost: { hearts: 3 },
			},
		],
	},
});
