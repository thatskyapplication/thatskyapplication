import process from "node:process";
import { Collection } from "@discordjs/collection";
import {
	Client,
	GatewayDispatchEvents,
	type GatewayGuildCreateDispatchData,
	GatewayIntentBits,
	type Snowflake,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import knex from "knex";

interface GuessPacket {
	user_id: string;
	streak: number | null;
	streak_hard: number | null;
	guild_ids: string[];
}

const { DATABASE_URL, DISCORD_TOKEN } = process.env;

if (!(DATABASE_URL && DISCORD_TOKEN)) {
	throw new Error("Credentials missing.");
}

const TABLE = "guess" as const;
const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

export const gateway = new WebSocketManager({
	intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMembers,
	rest,
	token: DISCORD_TOKEN,
});

const client = new Client({ rest, gateway });
const GUILD_IDS_FROM_READY = new Set<Snowflake>();
const GUILD_CACHE = new Collection<Snowflake, GatewayGuildCreateDispatchData>();
const pg = knex({ client: "pg", connection: DATABASE_URL, pool: { min: 0 } });
const userIds = (await pg<GuessPacket>(TABLE).select("user_id")).map((row) => row.user_id);
const data: Record<Snowflake, GuessPacket["guild_ids"]> = {};

client.on(GatewayDispatchEvents.GuildCreate, async ({ data }) => {
	if (GUILD_IDS_FROM_READY.has(data.id)) {
		GUILD_CACHE.set(data.id, data);
		GUILD_IDS_FROM_READY.delete(data.id);
	}

	if (GUILD_IDS_FROM_READY.size === 0) {
		await setGuildIds();
	}
});

client.on(GatewayDispatchEvents.Ready, ({ data }) => {
	for (const guild of data.guilds) {
		GUILD_IDS_FROM_READY.add(guild.id);
	}
});

async function setGuildIds() {
	for (const guild of GUILD_CACHE.values()) {
		const { members } = await client.requestGuildMembers({ user_ids: userIds, guild_id: guild.id });

		for (const member of members) {
			if (userIds.includes(member.user.id)) {
				data[member.user.id] ??= [];
				data[member.user.id].push(guild.id);
			}
		}
	}

	const formattedData = Object.keys(data).map((user_id) => ({
		user_id,
		guild_ids: JSON.stringify(data[user_id]),
	}));

	await pg.raw(`
		WITH updated_data (user_id, guild_ids) AS (
			VALUES ${formattedData.map(({ user_id, guild_ids }) => `('${user_id}', '${guild_ids}'::jsonb)`).join(", ")}
		)
		UPDATE ${TABLE}
		SET guild_ids = updated_data.guild_ids
		FROM updated_data
		WHERE ${TABLE}.user_id = updated_data.user_id;
	`);

	process.exit();
}

void gateway.connect();
