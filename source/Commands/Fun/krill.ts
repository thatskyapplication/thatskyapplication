import { URL } from "node:url";
import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	PermissionFlagsBits,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	EmbedBuilder,
} from "discord.js";
import { CDN_URL, DEFAULT_EMBED_COLOUR, MAX_KRILL_NO } from "../../Utility/Constants.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "krill",
		description: "Krill someone!",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: "user",
				description: "The individual to be krilled.",
				required: true,
			},
		],
		dmPermission: false,
	} as const satisfies Readonly<ApplicationCommandData>;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: "Self-krilling is no joke.", ephemeral: true });
			return;
		}

		if (!member) {
			await interaction.reply({ content: `${user} is not in this server to be krilled.`, ephemeral: true });
			return;
		}

		if (
			channel &&
			"user" in member &&
			!channel.isDMBased() &&
			!channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)
		) {
			await interaction.reply({ content: `${user} is not around to be krilled!`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty strong. Immune to krills, I'd say.`,
				ephemeral: true,
			});

			return;
		}

		await interaction.reply({
			content: `${user} has been krilled by ${interaction.user}!`,
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setImage(String(new URL(`krills/${Math.floor(Math.random() * MAX_KRILL_NO + 1)}.gif`, CDN_URL))),
			],
		});
	}
})();
