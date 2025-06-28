import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Somersault;

export default new SeasonalSpirit({
	id: SpiritId.TumblingTroublemaker,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSomersault1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSomersault2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TumblingTroublemakerBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Hair", cosmetic: Cosmetic.TumblingTroublemakerHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSomersault3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSomersault4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TumblingTroublemakerBlessing2,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Cape", cosmetic: Cosmetic.TumblingTroublemakerCape },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.TumblingTroublemakerBlessing3,
				cost: { seasonalCandles: 32 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.TumblingTroublemakerFaceAccessory,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TumblingTroublemakerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSomersault1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSomersault2, cost: { hearts: 4 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TumblingTroublemakerBlessing1,
				cost: { candles: 5 },
			},
			{ name: "Hair", cosmetic: Cosmetic.TumblingTroublemakerHair, cost: { candles: 40 } },
			{
				name: "Heart",
				cosmetic: Cosmetic.TumblingTroublemakerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.TumblingTroublemakerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSomersault3,
				cost: { hearts: 3 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSomersault4, cost: { hearts: 6 } },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TumblingTroublemakerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.TumblingTroublemakerFaceAccessory,
				cost: { candles: 55 },
			},
			{ name: "Cape", cosmetic: Cosmetic.TumblingTroublemakerCape, cost: { candles: 80 } },
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 4, 24), end: skyDate(2025, 4, 28) }],
	},
});
