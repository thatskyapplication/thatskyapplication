import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionDataResolvedGuildMember,
	type APIUser,
	ComponentType,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import { MAXIMUM_HUG_GIF } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import { CDN_URL, DEFAULT_EMBED_COLOUR } from "../utility/constants.js";
import { interactionInvoker } from "../utility/functions.js";
import { cannotUseUserInstallable } from "../utility/permissions.js";

export async function hug(
	interaction: APIChatInputApplicationCommandInteraction,
	user: APIUser,
	member: APIInteractionDataResolvedGuildMember | null,
) {
	const resolvedLocale = interaction.guild_locale ?? Locale.EnglishGB;
	const invoker = interactionInvoker(interaction);

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("hug.hug-self", { lng: resolvedLocale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (
		await cannotUseUserInstallable(
			interaction,
			t("hug.missing-external-apps-permission", {
				lng: resolvedLocale,
				ns: "features",
				user: `<@${user.id}>`,
			}),
		)
	) {
		return;
	}

	if (interaction.guild_id && !member) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("hug.not-in-server", {
				lng: resolvedLocale,
				ns: "features",
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
					ns: "features",
					user: `<@${user.id}>`,
				}),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	if (user.bot) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("hug.hug-bot", { lng: resolvedLocale, ns: "features", user: `<@${user.id}>` }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		allowed_mentions: { users: [user.id] },
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t("hug.message", {
							lng: resolvedLocale,
							ns: "features",
							user: `<@${user.id}>`,
							invoker: `<@${invoker.id}>`,
						}),
					},
					{
						type: ComponentType.MediaGallery,
						items: [
							{
								media: {
									url: String(
										new URL(`hugs/${Math.floor(Math.random() * MAXIMUM_HUG_GIF + 1)}.gif`, CDN_URL),
									),
								},
							},
						],
					},
				],
			},
		],
		flags: MessageFlags.IsComponentsV2,
	});
}
