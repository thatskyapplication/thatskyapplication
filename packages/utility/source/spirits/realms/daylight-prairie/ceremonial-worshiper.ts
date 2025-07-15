import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Teamwork;

export default new StandardSpirit({
	id: SpiritId.CeremonialWorshiper,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmoteTeamwork },
			{
				cosmetic: Cosmetic.CeremonialWorshipperBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.CeremonialWorshipperHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.CeremonialWorshipperWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				cosmetic: Cosmetic.CeremonialWorshipperBlessing2,
				cost: { candles: 5 },
			},
		],
	},
});
