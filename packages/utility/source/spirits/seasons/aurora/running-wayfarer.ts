import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.WavingLight;

export default new SeasonalSpirit({
	id: SpiritId.RunningWayfarer,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWavingLight1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteWavingLight2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.RunningWayfarerMask,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.RunningWayfarerBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RunningWayfarerBlessing2,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Hair", cosmetic: Cosmetic.RunningWayfarerHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWavingLight3,
				cost: { seasonalCandles: 20 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteWavingLight4 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.RunningWayfarerBlessing3,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.RunningWayfarerMusicSheet },
			{
				name: "Cape",
				cosmetic: Cosmetic.RunningWayfarerCape,
				cost: { seasonalCandles: 30 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.RunningWayfarerBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RunningWayfarerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWavingLight1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteWavingLight2, cost: { hearts: 4 } },
			{ name: "Blessing 1", cosmetic: Cosmetic.RunningWayfarerBlessing1, cost: { candles: 5 } },
			{
				name: "Mask",
				cosmetic: Cosmetic.RunningWayfarerMask,
				cost: { candles: 35 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.RunningWayfarerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.RunningWayfarerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWavingLight3,
				cost: { hearts: 3 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteWavingLight4, cost: { hearts: 6 } },
			{ name: "Hair", cosmetic: Cosmetic.RunningWayfarerHair, cost: { candles: 40 } },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RunningWayfarerBlessing2,
				cost: { candles: 5 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.RunningWayfarerMusicSheet, cost: { candles: 15 } },
			{
				name: "Cape",
				cosmetic: Cosmetic.RunningWayfarerCape,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		returning: [9],
	},
});
