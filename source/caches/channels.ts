import { Collection } from "@discordjs/collection";
import type { APIChannel, Snowflake } from "@discordjs/core";

export const CHANNEL_CACHE = new Collection<Snowflake, APIChannel>();
