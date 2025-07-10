import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Wave;

export default new StandardSpirit({
	id: SpiritId.WavingBellmaker,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmoteWave1 },
			{
				cosmetic: Cosmetic.EmoteWave2,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.WavingBellmakerBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.WavingBellmakerHair,
				cost: { hearts: 2 },
			},
			{
				cosmetic: Cosmetic.WavingBellmakerHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.WavingBellmakerWingBuff1,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteWave3,
				cost: { candles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteWave4,
				cost: { candles: 2 },
			},
			{
				cosmetic: Cosmetic.WavingBellmakerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.WavingBellmakerMask,
				cost: { hearts: 5 },
			},
			{
				cosmetic: Cosmetic.WavingBellmakerWingBuff2,
				cost: { ascendedCandles: 6 },
			},
			{
				cosmetic: Cosmetic.EmoteWave5,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteWave6,
				cost: { candles: 3 },
			},
		],
	},
});
