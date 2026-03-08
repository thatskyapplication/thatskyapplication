import { Collection } from "@discordjs/collection";
import type { Snowflake } from "@discordjs/core";
import type { Guild } from "../models/discord/guild.js";

export const GUILD_IDS_FROM_READY = new Set<Snowflake>();
export const GUILD_CACHE = new Collection<Snowflake, Guild>();

export let READY_COUNT = 0;
export let TOTAL_SHARDS = 0;

export function readyCountIncrement() {
	READY_COUNT++;
}

export function readyCountReset() {
	READY_COUNT = 0;
}

export function totalShardsSet(total: number) {
	TOTAL_SHARDS = total;
}
