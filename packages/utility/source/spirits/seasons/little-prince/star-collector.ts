import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.HandRub;

export default new SeasonalSpirit({
	id: SpiritId.StarCollector,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHandRub1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteHandRub2 },
			{
				name: "Necktie",
				cosmetic: Cosmetic.StarCollectorNecktie,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.StarCollectorBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHandRub3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteHandRub4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.StarCollectorBlessing2,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Cape", cosmetic: Cosmetic.StarCollectorCape },
			{
				name: "Prop",
				cosmetic: Cosmetic.StarCollectorProp,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.StarCollectorBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.StarCollectorSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHandRub1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteHandRub2,
				cost: { hearts: 4 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.StarCollectorSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.StarCollectorBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Necktie",
				cosmetic: Cosmetic.StarCollectorNecktie,
				cost: { candles: 40 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.StarCollectorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHandRub3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteHandRub4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.StarCollectorBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.StarCollectorCape,
				cost: { candles: 75 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.StarCollectorProp,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [96],
		returning: [8],
	},
});
