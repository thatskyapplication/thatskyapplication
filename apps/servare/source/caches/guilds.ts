import { Collection } from "@discordjs/collection";
import type { Snowflake } from "@discordjs/core";
import type { Guild } from "../models/discord/guild.js";

export const GUILD_IDS_FROM_READY = new Set<Snowflake>();
export const GUILD_CACHE = new Collection<Snowflake, Guild>();
