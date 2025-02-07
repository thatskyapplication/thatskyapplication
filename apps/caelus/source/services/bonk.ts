import {
	type APIChatInputApplicationCommandInteraction,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import { t } from "i18next";
import { client } from "../discord.js";
import { BONKS } from "../utility/constants.js";
import { interactionInvoker } from "../utility/functions.js";
import { OptionResolver } from "../utility/option-resolver.js";
import { cannotUseUserInstallable } from "../utility/permissions.js";

export async function bonk(interaction: APIChatInputApplicationCommandInteraction) {
	const options = new OptionResolver(interaction);
	const user = options.getUser("user", true);
	const member = options.getMember("user");
	const invoker = interactionInvoker(interaction);

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "No self-bonking! Bad!",
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	if (
		await cannotUseUserInstallable(
			interaction,
			t("bonk.missing-external-apps-permission", {
				lng: interaction.locale,
				ns: "features",
				user: `<@${user.id}>`,
			}),
		)
	) {
		return;
	}

	if (interaction.guild_id && !member) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `<@${user.id}> is not in this server to be bonked.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (member) {
		const permissions = BigInt(member.permissions);

		if ((permissions & PermissionFlagsBits.ViewChannel) === 0n) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: `<@${user.id}> is not around for the bonk!`,
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	if (user.bot) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `<@${user.id}> is a bot. They're pretty tough. Immune to bonks, I'd say.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const decidingBonk = Math.random() < 0.1 ? BONKS.unsuccessful : BONKS.successful;
	const bonk = decidingBonk[Math.floor(Math.random() * decidingBonk.length)]!;
	const { message } = bonk;

	let bonkMessage = message
		.replaceAll("{{bonker}}", `<@${invoker.id}>`)
		.replaceAll("{{bonkee}}", `<@${user.id}>`);

	if ("entries" in bonk) {
		const { entries } = bonk;
		const [entry1, entry2, entry3] = entries[Math.floor(Math.random() * entries.length)]!;

		bonkMessage = bonkMessage
			.replace("{{entry1}}", entry1)
			.replace("{{entry2}}", entry2)
			.replace("{{entry3}}", entry3);
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		allowed_mentions: { users: [user.id] },
		content: bonkMessage,
	});
}
