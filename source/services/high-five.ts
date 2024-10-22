import {
	type ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	PermissionFlagsBits,
} from "discord.js";
import { CDN_URL, DEFAULT_EMBED_COLOUR, MAX_HIGH_FIVE_NO } from "../utility/constants.js";

export async function highFive(interaction: ChatInputCommandInteraction) {
	const { channel, options } = interaction;
	const user = options.getUser("user", true);
	const member = options.getMember("user");

	if (user.id === interaction.user.id) {
		await interaction.reply({
			content: "You may have two hands, but... try someone else!.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (interaction.inGuild() && !member) {
		await interaction.reply({
			content: `${user} is not in this server to high-five.`,
			flags: MessageFlags.Ephemeral,
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
			flags: MessageFlags.Ephemeral,
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
						new URL(`high_fives/${Math.floor(Math.random() * MAX_HIGH_FIVE_NO + 1)}.gif`, CDN_URL),
					),
				),
		],
	});
}
