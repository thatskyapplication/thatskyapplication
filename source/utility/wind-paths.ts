import { DateTime } from "luxon";
import pino from "../pino.js";
import { type RealmName, type SkyMap, WIND_PATHS_URL } from "./constants.js";

interface ShardEruptionTimestampsRawData {
	start: string;
	end: string;
}

interface ShardEruptionRawData {
	realm: RealmName;
	sky_map: SkyMap;
	strong: boolean;
	reward: number;
	timestamps: ShardEruptionTimestampsRawData[];
	url: URL;
}

interface ShardEruptionTimestampsData {
	start: DateTime;
	end: DateTime;
}

export interface ShardEruptionData {
	realm: RealmName;
	skyMap: SkyMap;
	strong: boolean;
	reward: number;
	timestamps: ShardEruptionTimestampsData[];
	url: URL;
}

if (!WIND_PATHS_URL) {
	pino.fatal("Missing Discord token.");
	process.exit(1);
}

export async function shardEruption(offset = 0): Promise<ShardEruptionData | null> {
	const queryParameters = new URLSearchParams({ offset: offset.toString() });

	const response = await fetch(new URL(`shard-eruption?${queryParameters}`, WIND_PATHS_URL), {
		method: "GET",
	});

	const json = (await response.json()) as ShardEruptionRawData | null;

	return json
		? {
				realm: json.realm,
				skyMap: json.sky_map,
				strong: json.strong,
				reward: json.reward,
				timestamps: json.timestamps.map(({ start, end }) => ({
					start: DateTime.fromISO(start),
					end: DateTime.fromISO(end),
				})),
				url: json.url,
			}
		: null;
}
