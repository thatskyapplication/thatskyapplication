import type { RealmName, SkyMap } from "~/utility/constants";
import { WIND_PATHS_URL } from "./config.server";

interface ShardEruptionTimestampsData {
	start: string;
	end: string;
}

export interface ShardEruptionRaw {
	realm: RealmName;
	sky_map: SkyMap;
	strong: boolean;
	reward: number;
	timestamps: ShardEruptionTimestampsData[];
	url: string;
}

export type ShardEruption = (ShardEruptionRaw & { offset: number }) | { offset: number };

export async function shardEruption(offset = 0): Promise<ShardEruption> {
	const queryParameters = new URLSearchParams({ offset: offset.toString() });

	const response = await fetch(new URL(`shard-eruption?${queryParameters}`, WIND_PATHS_URL), {
		method: "GET",
	});

	const json = (await response.json()) as ShardEruptionRaw | null;

	if (!json) {
		return { offset };
	}

	return { ...json, offset };
}
