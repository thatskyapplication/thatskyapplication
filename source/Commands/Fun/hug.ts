import process from "node:process";
import type { ApplicationCommandData, ChatInputCommandInteraction, Snowflake } from "discord.js";
import {
	EmbedBuilder,
	PermissionFlagsBits,
	makeURLSearchParams,
	ApplicationCommandOptionType,
	ApplicationCommandType,
} from "discord.js";
import { request } from "undici";
import pg, { Table } from "../../pg.js";
import type { ChatInputCommand, TenorResponse } from "../index.js";

interface HugPacket {
	user_id: Snowflake;
	count: number;
}

const { TENOR_KEY } = process.env;
if (!TENOR_KEY) throw new Error("Tenor API key missing.");

const QUERIES = [
	"anime hug",
	"anime hugs",
	"manga hug",
	"anime cuddle",
	"manga cuddle",
	"anime boy hug",
	"anime girl hug",
	"anime tight hug",
	"anime long hug",
	"anime sudden hug",
	"anime hug sad",
	"anime hug happy",
	"anime wholesome hug",
	"anime jump hug",
] as const satisfies Readonly<string[]>;

export default class implements ChatInputCommand {
	public readonly name = "hug";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, client, guild, locale, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: `Share the love! Hug someone other than yourself!`, ephemeral: true });
			return;
		}

		if (!member) {
			await interaction.reply({ content: `${user} is not in this server to be hugged.`, ephemeral: true });
			return;
		}

		if (
			channel &&
			"user" in member &&
			!channel.isDMBased() &&
			!channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)
		) {
			await interaction.reply({ content: `${user} is not around for the hug!`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty emotionless. Immune to hugs, I'd say.`,
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

		let hugMessage = `${user}, ${interaction.user} hugged you!`;

		const embed = new EmbedBuilder()
			.setColor((await guild?.members.fetchMe())?.displayColor ?? 0)
			.setImage(response.results[0].media_formats.gif.url);

		const [{ count }] = await pg<HugPacket>(Table.Hugs)
			.insert({ user_id: user.id, count: 1 })
			.onConflict("user_id")
			.merge({ count: pg.raw("?? + 1", `${Table.Hugs}.count`) })
			.returning("count");

		if (count % 25 === 0) hugMessage += `\n${user} has been hugged ${count} times!`;
		await interaction.reply({ content: hugMessage, embeds: [embed] });
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "Hug someone!",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: "user",
					description: "The individual to be hugged.",
					required: true,
				},
			],
			dmPermission: false,
		};
	}
}
