import process from "node:process";
import { type Collection, type Guild, type Snowflake, Client, Events, GatewayIntentBits } from "discord.js";
import knex from "knex";

interface GuessPacket {
	user_id: string;
	streak: number | null;
	streak_hard: number | null;
	guild_ids: string[];
}

const { DATABASE_URL } = process.env;
const databaseURL = DATABASE_URL;
if (!databaseURL) throw new Error("Database URL missing.");
const TABLE = "guess" as const;
const client = new Client({ intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMembers });
const pg = knex({ client: "pg", connection: databaseURL, pool: { min: 0 } });
const userIds = (await pg<GuessPacket>(TABLE).select("user_id")).map((row) => row.user_id);
const data: Record<Snowflake, GuessPacket["guild_ids"]> = {};

client.on(Events.ClientReady, async () => {
	await setGuildIds(client.guilds.cache);
});

client.on(Events.GuildMembersChunk, (members, guild) => {
	for (const member of members.values()) {
		if (userIds.includes(member.user.id)) {
			data[member.user.id] ??= [];
			data[member.user.id].push(guild.id);
		}
	}
});

async function setGuildIds(guilds: Collection<Snowflake, Guild>) {
	for (const guild of guilds.values()) {
		await guild.members.fetch({ user: userIds });
	}

	const formattedData = Object.keys(data).map((user_id) => ({ user_id, guild_ids: JSON.stringify(data[user_id]) }));

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

void client.login();
