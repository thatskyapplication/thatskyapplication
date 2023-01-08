import process from "node:process";
import type { ApplicationCommandData, ChatInputCommandInteraction, Snowflake } from "discord.js";
import {
	EmbedBuilder,
	makeURLSearchParams,
	PermissionFlagsBits,
	ApplicationCommandOptionType,
	ApplicationCommandType,
} from "discord.js";
import { request } from "undici";
import pg, { Table } from "../../pg.js";
import type { ChatInputCommand, TenorResponse } from "../index.js";

interface FightPacket {
	user_id: Snowflake;
	count: number;
}

const { TENOR_KEY } = process.env;
if (!TENOR_KEY) throw new Error("Tenor API key missing.");

const QUERIES = [
	"anime fight",
	"manga fight",
	"anime sword fight",
	"anime fist fight",
	"anime magic fight",
	"anime gun fight",
	"anime fighting",
	"anime kill",
	"anime destroy",
	"anime slam",
	"anime smash",
] as const satisfies Readonly<string[]>;

export default class implements ChatInputCommand {
	public readonly name = "fight";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, client, guild, locale, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: `No harm self! No no no!`, ephemeral: true });
			return;
		}

		if (!member) {
			await interaction.reply({ content: `${user} is not in this server to fight.`, ephemeral: true });
			return;
		}

		if (
			channel &&
			"user" in member &&
			!channel.isDMBased() &&
			!channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)
		) {
			await interaction.reply({ content: `${user} is not around for the fight!`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty durable. Immune to fights, I'd say.`,
				ephemeral: true,
			});

			return;
		}

		const response: TenorResponse = await request(
			`https://tenor.googleapis.com/v2/search?${makeURLSearchParams({
				key: TENOR_KEY,
				// eslint-disable-next-line id-length
				q: QUERIES[Math.floor(Math.random() * QUERIES.length)],
				client_key: client.user.username,
				locale,
				media_filter: "gif",
				random: true,
				limit: 1,
			})}`,
		).then(async ({ body }) => body.json());

		let fightMessage = `${interaction.user} is fighting ${user}!`;

		const embed = new EmbedBuilder()
			.setColor((await guild?.members.fetchMe())?.displayColor ?? 0)
			.setImage(response.results[0].media_formats.gif.url);

		const [{ count }] = await pg<FightPacket>(Table.Fights)
			.insert({ user_id: user.id, count: 1 })
			.onConflict("user_id")
			.merge({ count: pg.raw("?? + 1", `${Table.Fights}.count`) })
			.returning("count");

		if (count % 25 === 0) fightMessage += `\n${user} has been fought ${count} times!`;
		await interaction.reply({ content: fightMessage, embeds: [embed] });
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "Fight someone!",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: "user",
					description: "The individual to fight.",
					required: true,
				},
			],
			dmPermission: false,
		};
	}
}
