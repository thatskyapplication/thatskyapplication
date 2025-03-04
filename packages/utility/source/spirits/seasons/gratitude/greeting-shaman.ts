import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.KungFu;

export default new SeasonalSpirit({
	id: SpiritId.GreetingShaman,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteKungFu1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteKungFu2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GreetingShamanBlessing1,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Large bell", cosmetic: Cosmetic.GreetingShamanLargeBell },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteKungFu3,
				cost: { seasonalCandles: 20 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteKungFu4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.GreetingShamanBlessing2,
				cost: { seasonalCandles: 22 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.GreetingShamanMask,
				cost: { hearts: 5 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteKungFu1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteKungFu2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GreetingShamanBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Large bell",
				cosmetic: Cosmetic.GreetingShamanLargeBell,
				cost: { candles: 45 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.GreetingShamanHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.GreetingShamanWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteKungFu3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteKungFu4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.GreetingShamanBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.GreetingShamanMask,
				cost: { candles: 54 },
			},
		],
	},
	visits: {
		travelling: [14, 62],
		returning: [3],
	},
});
