import { Map } from "./Constants.js";
import { resolveShardEruptionMapURL } from "./Utility.js";

export const SHARD_ERUPTION_PREDICTION_DATA = [
	{
		noShardWeekDay: [6, 7], // Saturday, Sunday
		interval: 8,
		// 1 hour and 50 minutes.
		offset: 6_600_000,
		area: [Map.ButterflyFields, Map.ForestBrook, Map.IceRink, Map.BrokenTemple, Map.StarlightDesert].map((map) => ({
			map,
			url: resolveShardEruptionMapURL(map),
			reward: 200,
		})),
	},
	{
		noShardWeekDay: [7, 1], // Sunday, Monday
		interval: 8,
		// 2 hours and 10 minutes.
		offset: 7_800_000,
		area: [Map.KoiPond, Map.Boneyard, Map.IceRink, Map.Battlefield, Map.StarlightDesert].map((map) => ({
			map,
			url: resolveShardEruptionMapURL(map),
			reward: 200,
		})),
	},
	{
		noShardWeekDay: [1, 2], // Monday, Tuesday
		interval: 6,
		// 7 hours and 40 minutes.
		offset: 27_600_000,
		area: [
			{ map: Map.Cave, url: resolveShardEruptionMapURL(Map.Cave), reward: 2 },
			{ map: Map.ForestEnd, url: resolveShardEruptionMapURL(Map.ForestEnd), reward: 2.5 },
			{ map: Map.VillageOfDreams, url: resolveShardEruptionMapURL(Map.VillageOfDreams), reward: 2.5 },
			{ map: Map.Graveyard, url: resolveShardEruptionMapURL(Map.Graveyard), reward: 2 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
	{
		noShardWeekDay: [2, 3], // Tuesday, Wednesday
		interval: 6,
		// 2 hours and 20 minutes.
		offset: 8_400_000,
		area: [
			{ map: Map.BirdNest, url: resolveShardEruptionMapURL(Map.BirdNest), reward: 2.5 },
			{ map: Map.Treehouse, url: resolveShardEruptionMapURL(Map.Treehouse), reward: 3.5 },
			{ map: Map.VillageOfDreams, url: resolveShardEruptionMapURL(Map.VillageOfDreams), reward: 2.5 },
			{ map: Map.CrabFields, url: resolveShardEruptionMapURL(Map.CrabFields), reward: 2.5 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
	{
		noShardWeekDay: [3, 4], // Wednesday, Thursday
		interval: 6,
		// 3 hours and 30 minutes.
		offset: 12_600_000,
		area: [
			{ map: Map.SanctuaryIslands, url: resolveShardEruptionMapURL(Map.SanctuaryIslands), reward: 3.5 },
			{ map: Map.ElevatedClearing, url: resolveShardEruptionMapURL(Map.ElevatedClearing), reward: 3.5 },
			{ map: Map.HermitValley, url: resolveShardEruptionMapURL(Map.HermitValley), reward: 3.5 },
			{ map: Map.ForgottenArk, url: resolveShardEruptionMapURL(Map.ForgottenArk), reward: 3.5 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
] as const;
