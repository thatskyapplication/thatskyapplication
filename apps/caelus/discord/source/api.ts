import { serve } from "@hono/node-server";
import type { APIGuildsMeResponse } from "@thatskyapplication/utility";
import { Hono } from "hono";
import { GUILD_CACHE } from "./caches/guilds.js";
import pino from "./pino.js";

const hono = new Hono();
const port = Number(process.env.HONO_PORT) || 3000;

hono.get("/api/guilds/:guildId/@me", (context) =>
	context.json({
		present: GUILD_CACHE.has(context.req.param("guildId")),
	} satisfies APIGuildsMeResponse),
);

serve({ fetch: hono.fetch, port }, () =>
	pino.info(`Internal API server listening on port ${port}.`),
);
