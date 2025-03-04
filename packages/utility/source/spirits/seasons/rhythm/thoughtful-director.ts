import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Thinking;

export default new SeasonalSpirit({
	id: SpiritId.ThoughtfulDirector,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteThinking1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteThinking2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ThoughtfulDirectorBlessing1,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Mask", cosmetic: Cosmetic.ThoughtfulDirectorMask },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteThinking3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteThinking4 },
			{
				name: "Xylophone",
				cosmetic: Cosmetic.ThoughtfulDirectorXylophone,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ThoughtfulDirectorBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ThoughtfulDirectorBlessing3,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Cape", cosmetic: Cosmetic.ThoughtfulDirectorCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ThoughtfulDirectorSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteThinking1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteThinking2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ThoughtfulDirectorBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ThoughtfulDirectorMask,
				cost: { candles: 42 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ThoughtfulDirectorSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ThoughtfulDirectorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteThinking3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteThinking4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ThoughtfulDirectorBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Xylophone",
				cosmetic: Cosmetic.ThoughtfulDirectorXylophone,
				cost: { candles: 65 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ThoughtfulDirectorCape,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [35, 67, 116],
		returning: [3],
	},
});
