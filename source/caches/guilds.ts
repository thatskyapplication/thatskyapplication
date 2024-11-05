import { Collection } from "@discordjs/collection";
import type { GatewayGuildCreateDispatchData, Snowflake } from "@discordjs/core";

export const GUILD_IDS_FROM_READY = new Set<Snowflake>();
export const GUILD_CACHE = new Collection<Snowflake, GatewayGuildCreateDispatchData>();
