import { Cosmetic } from "../../../cosmetics.js";
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
			{ name: emote, cosmetic: Cosmetic.EmoteTeamwork },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CeremonialWorshipperBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CeremonialWorshipperHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.CeremonialWorshipperWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CeremonialWorshipperBlessing2,
				cost: { candles: 5 },
			},
		],
	},
});
