import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Clap;

export default new StandardSpirit({
	id: SpiritId.ApplaudingBellmaker,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmoteClap1 },
			{
				cosmetic: Cosmetic.EmoteClap2,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.ApplaudingBellmakerBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.ApplaudingBellmakerHair,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.ApplaudingBellmakerHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.ApplaudingBellmakerWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				cosmetic: Cosmetic.EmoteClap3,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteClap4,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.ApplaudingBellmakerBlessing2,
				cost: { candles: 5 },
			},
		],
	},
});
