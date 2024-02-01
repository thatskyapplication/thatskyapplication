import { URL } from "node:url";
import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	PermissionFlagsBits,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	EmbedBuilder,
} from "discord.js";
import { CDN_URL, DEFAULT_EMBED_COLOUR, MAX_PLAY_FIGHT_NO } from "../../Utility/Constants.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "play-fight",
		description: "Fight someone!",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: "user",
				description: "The individual to play fight.",
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
			await interaction.reply({ content: "Play with others!", ephemeral: true });
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
			await interaction.reply({ content: `${user} is not around to be fought!`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty durable. Immune to fights, I'd say.`,
				ephemeral: true,
			});

			return;
		}

		await interaction.reply({
			content: `${interaction.user} is fighting ${user}!`,
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setImage(String(new URL(`play-fights/${Math.floor(Math.random() * MAX_PLAY_FIGHT_NO + 1)}.gif`, CDN_URL))),
			],
		});
	}
})();
