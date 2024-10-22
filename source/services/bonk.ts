import { type ChatInputCommandInteraction, MessageFlags, PermissionFlagsBits } from "discord.js";
import { BONKS } from "../utility/constants.js";

export async function bonk(interaction: ChatInputCommandInteraction) {
	const { channel, options } = interaction;
	const user = options.getUser("user", true);
	const member = options.getMember("user");

	if (user.id === interaction.user.id) {
		await interaction.reply({ content: "No self-bonking! Bad!", flags: MessageFlags.Ephemeral });
		return;
	}

	if (interaction.inGuild() && !member) {
		await interaction.reply({
			content: `${user} is not in this server to be bonked.`,
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
		await interaction.reply({
			content: `${user} is not around for the bonk!`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (user.bot) {
		await interaction.reply({
			content: `${user} is a bot. They're pretty tough. Immune to bonks, I'd say.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const decidingBonk = Math.random() < 0.1 ? BONKS.unsuccessful : BONKS.successful;
	const bonk = decidingBonk[Math.floor(Math.random() * decidingBonk.length)]!;
	const { message } = bonk;

	let bonkMessage = message
		.replaceAll("{{bonker}}", String(interaction.user))
		.replaceAll("{{bonkee}}", String(user));

	if ("entries" in bonk) {
		const { entries } = bonk;
		const [entry1, entry2, entry3] = entries[Math.floor(Math.random() * entries.length)]!;

		bonkMessage = bonkMessage
			.replace("{{entry1}}", entry1)
			.replace("{{entry2}}", entry2)
			.replace("{{entry3}}", entry3);
	}

	await interaction.reply(bonkMessage);
}
