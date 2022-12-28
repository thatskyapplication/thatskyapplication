import process from "node:process";
import type { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import { makeURLSearchParams, ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { request } from "undici";
import type { ChatInputCommand } from "../index.js";

const { TENOR_KEY } = process.env;
if (!TENOR_KEY) throw new Error("Tenor API key missing.");

export default class implements ChatInputCommand {
	public readonly name = "hug";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: `No self-hugging! Bad!`, ephemeral: true });
			return;
		}

		if (!member) {
			await interaction.reply({ content: `${user} is not in this server to be hugged.`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty tough. Immune to hugs, I'd say.`,
				ephemeral: true,
			});

			return;
		}

		const response = await request(
			`https://tenor.googleapis.com/v2/search?${makeURLSearchParams({
				key: TENOR_KEY,
				// eslint-disable-next-line id-length
				q: "anime hug",
				client_key: "Caelus",
				country: "LT",
				locale: "en-GB",
				media_filter: "gif",
				random: true,
				limit: 1,
			})}`,
		).then(async ({ body }) => body.json());

		await interaction.reply({
			content: `${user}, ${interaction.user} hugged you!`,
			files: [response.results[0].media_formats.gif.url],
		});
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
