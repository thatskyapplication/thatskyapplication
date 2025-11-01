import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { GUILD_CACHE } from "./caches/guilds.js";
import pino from "./pino.js";

const hono = new Hono();
const port = Number(process.env.HONO_PORT) || 3000;

hono.get("/api/guilds/:guildId", (context) => {
	const guild = GUILD_CACHE.get(context.req.param("guildId"));

	if (!guild) {
		return context.json(null, 404);
	}

	return context.json({ id: guild.id, name: guild.name });
});

serve({ fetch: hono.fetch, port }, () =>
	pino.info(`Internal API server listening on port ${port}.`),
);
