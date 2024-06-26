import { URL } from "node:url";
import {
	type ApplicationCommandData,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type ChatInputCommandInteraction,
	EmbedBuilder,
	PermissionFlagsBits,
} from "discord.js";
import { CDN_URL, DEFAULT_EMBED_COLOUR, MAX_HIGH_FIVE_NO } from "../../Utility/Constants.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "high-five",
		description: "High-five someone!",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: "user",
				description: "The individual to high-five.",
				required: true,
			},
		],
		integrationTypes: [0, 1],
		contexts: [0, 2],
	} as const satisfies Readonly<ApplicationCommandData>;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({
				content: "You may have two hands, but... try someone else!.",
				ephemeral: true,
			});

			return;
		}

		if (interaction.inGuild() && !member) {
			await interaction.reply({
				content: `${user} is not in this server to high-five.`,
				ephemeral: true,
			});

			return;
		}

		if (
			channel &&
			!channel.isDMBased() &&
			member &&
			"user" in member &&
			!channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)
		) {
			await interaction.reply({ content: `${user} is not around to high-five!`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty cold. Immune to high-fives, I'd say.`,
				ephemeral: true,
			});

			return;
		}

		await interaction.reply({
			content: `${user}, ${interaction.user} high-fived you!`,
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setImage(
						String(
							new URL(
								`high_fives/${Math.floor(Math.random() * MAX_HIGH_FIVE_NO + 1)}.gif`,
								CDN_URL,
							),
						),
					),
			],
		});
	}
})();
