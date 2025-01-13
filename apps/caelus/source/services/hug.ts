import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionDataResolvedGuildMember,
	type APIUser,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import { t } from "i18next";
import { client } from "../discord.js";
import { CDN_URL, DEFAULT_EMBED_COLOUR, MAX_HUG_NO } from "../utility/constants.js";
import { interactionInvoker } from "../utility/functions.js";

export async function hug(
	interaction: APIChatInputApplicationCommandInteraction,
	user: APIUser,
	member: APIInteractionDataResolvedGuildMember | null,
) {
	const invoker = interactionInvoker(interaction);
	const resolvedLocale = interaction.guild_locale ?? Locale.EnglishGB;

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("hug.hug-self", { lng: resolvedLocale, ns: "commands" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (interaction.guild_id && !member) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("hug.not-in-server", {
				lng: resolvedLocale,
				ns: "commands",
				user: `<@${user.id}>`,
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (member) {
		const permissions = BigInt(member.permissions);

		if ((permissions & PermissionFlagsBits.ViewChannel) === 0n) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: t("hug.not-around", {
					lng: resolvedLocale,
					ns: "commands",
					user: `<@${user.id}>`,
				}),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	if (user.bot) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("hug.bot", { lng: resolvedLocale, ns: "commands", user: `<@${user.id}>` }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		allowed_mentions: { users: [user.id] },
		content: t("hug.message", {
			lng: resolvedLocale,
			ns: "commands",
			user: `<@${user.id}>`,
			invoker: `<@${invoker.id}>`,
		}),
		embeds: [
			{
				color: DEFAULT_EMBED_COLOUR,
				image: {
					url: String(new URL(`hugs/${Math.floor(Math.random() * MAX_HUG_NO + 1)}.gif`, CDN_URL)),
				},
			},
		],
	});
}
