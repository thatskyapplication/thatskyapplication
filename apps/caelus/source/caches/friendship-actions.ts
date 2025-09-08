import { Collection } from "@discordjs/collection";
import type { Snowflake } from "@discordjs/core";

export const FRIENDSHIP_ACTIONS_CACHE = new Collection<Snowflake, Snowflake>();
