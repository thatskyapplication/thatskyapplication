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
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteClap1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteClap2,
				cost: { candles: 1 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ApplaudingBellmakerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ApplaudingBellmakerHair,
				cost: { hearts: 3 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ApplaudingBellmakerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ApplaudingBellmakerWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteClap3,
				cost: { candles: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteClap4,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ApplaudingBellmakerBlessing2,
				cost: { candles: 5 },
			},
		],
	},
});
