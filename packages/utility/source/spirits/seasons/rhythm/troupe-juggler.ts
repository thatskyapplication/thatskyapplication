import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Juggle;

export default new SeasonalSpirit({
	id: SpiritId.TroupeJuggler,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteJuggle1,
				},
				{
					cosmetic: Cosmetic.EmoteJuggle2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TroupeJugglerHair,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TroupeJugglerBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteJuggle3,
					cost: { seasonalCandles: 14 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteJuggle4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TroupeJugglerBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{ cosmetic: Cosmetic.TroupeJugglerCape, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TroupeJugglerOutfit,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.TroupeJugglerBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TroupeJugglerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{
					cosmetic: Cosmetic.EmoteJuggle1,
				},
				{
					cosmetic: Cosmetic.EmoteJuggle2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.TroupeJugglerProp,
					cost: { hearts: 14 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TroupeJugglerBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.TroupeJugglerHair,
					cost: { candles: 42 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.TroupeJugglerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.TroupeJugglerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteJuggle3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteJuggle4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TroupeJugglerBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.TroupeJugglerCape,
					cost: { candles: 75 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TroupeJugglerOutfit,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 9, 16), end: skyDate(2021, 9, 20) },
			{ start: skyDate(2023, 10, 26), end: skyDate(2023, 10, 30) },
		],
		returning: [7],
	},
});
