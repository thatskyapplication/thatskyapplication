import { Collection } from "@discordjs/collection";
import type { Snowflake } from "@discordjs/core";
import type { Guild } from "../models/discord/guild.js";

export const GUILD_IDS_FROM_READY = new Set<Snowflake>();
export const GUILD_CACHE = new Collection<Snowflake, Guild>();

let readyCount = 0;
let totalShards = 0;

export function readyCountIncrement() {
	readyCount++;
}

export function readyCountReset() {
	readyCount = 0;
}

export function totalShardsSet(total: number) {
	totalShards = total;
}

export function allShardsReady() {
	return readyCount === totalShards;
}
