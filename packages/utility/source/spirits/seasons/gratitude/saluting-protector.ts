import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Acknowledge;

export default new SeasonalSpirit({
	id: SpiritId.SalutingProtector,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAcknowledge1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteAcknowledge2 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SalutingProtectorMusicSheet,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing", cosmetic: Cosmetic.SalutingProtectorBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAcknowledge3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteAcknowledge4 },
			{
				name: "Cape",
				cosmetic: Cosmetic.SalutingProtectorCape,
				cost: { seasonalCandles: 20 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.SalutingProtectorMask,
				cost: { hearts: 5 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAcknowledge1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteAcknowledge2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SalutingProtectorBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SalutingProtectorMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SalutingProtectorHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SalutingProtectorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAcknowledge3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteAcknowledge4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SalutingProtectorBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.SalutingProtectorCape,
				cost: { candles: 75 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.SalutingProtectorMask,
				cost: { candles: 42 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2022, 1, 20), end: skyDate(2022, 1, 24) },
			{ start: skyDate(2024, 11, 21), end: skyDate(2024, 11, 25) },
			{ start: skyDate(2024, 12, 9), end: skyDate(2024, 12, 12) },
		],
		travellingErrors: [1],
	},
});
