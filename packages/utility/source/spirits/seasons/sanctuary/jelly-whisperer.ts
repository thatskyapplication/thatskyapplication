import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritCall, SpiritId } from "../../../utility/spirits.js";

const call = SpiritCall.Jellyfish;

export default new SeasonalSpirit({
	id: SpiritId.JellyWhisperer,
	seasonId: SeasonId.Sanctuary,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.CallJellyfish },
			{
				cosmetic: Cosmetic.JellyWhispererMusicSheet,
				cost: { seasonalCandles: 6 },
			},
			{ cosmetic: Cosmetic.JellyWhispererBlessing1 },
			{
				cosmetic: Cosmetic.JellyWhispererHair,
				cost: { seasonalCandles: 8 },
			},
			{ cosmetic: Cosmetic.JellyWhispererBlessing2 },
			{
				cosmetic: Cosmetic.JellyWhispererBlessing3,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.JellyWhispererOutfit },
			{
				cosmetic: Cosmetic.JellyWhispererSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.CallJellyfish },
			{
				cosmetic: Cosmetic.JellyWhispererBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.JellyWhispererMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.JellyWhispererSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.JellyWhispererWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.JellyWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.JellyWhispererUmbrella,
				cost: { hearts: 15 },
			},
			{
				cosmetic: Cosmetic.JellyWhispererHair,
				cost: { candles: 42 },
			},
			{
				cosmetic: Cosmetic.JellyWhispererOutfit,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 11, 25), end: skyDate(2021, 11, 29) },
			{ start: skyDate(2023, 8, 31), end: skyDate(2023, 9, 4) },
		],
	},
});
