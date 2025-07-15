import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Cheer;

export default new StandardSpirit({
	id: SpiritId.CheerfulSpectator,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmoteCheer1 },
			{
				cosmetic: Cosmetic.EmoteCheer2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.CheerfulSpectatorBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.CheerfulSpectatorHair,
				cost: { hearts: 5 },
			},
			{
				cosmetic: Cosmetic.CheerfulSpectatorHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.CheerfulSpectatorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteCheer3,
				cost: { candles: 4 },
			},
			{
				cosmetic: Cosmetic.EmoteCheer4,
				cost: { candles: 4 },
			},
			{
				cosmetic: Cosmetic.CheerfulSpectatorBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.CheerfulSpectatorPiano,
				cost: { hearts: 10 },
			},
		],
	},
});
