import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionDataResolvedGuildMember,
	type APIUser,
	ComponentType,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import { getRandomElement, HUGS } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import { interactionInvoker } from "../utility/functions.js";
import { cannotUseUserInstallable } from "../utility/permissions.js";

export async function hug(
	interaction: APIChatInputApplicationCommandInteraction,
	user: APIUser,
	member: APIInteractionDataResolvedGuildMember | null,
) {
	const invoker = interactionInvoker(interaction);
	const userLocale = interaction.locale;

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("hug.hug-self", { lng: userLocale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (
		await cannotUseUserInstallable(
			interaction,
			t("hug.missing-external-apps-permission", {
				lng: userLocale,
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
				lng: userLocale,
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
					lng: userLocale,
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
			content: t("hug.hug-bot", { lng: userLocale, ns: "features", user: `<@${user.id}>` }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		allowed_mentions: { users: [user.id] },
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t("hug.message", {
							lng: interaction.guild_locale ?? Locale.EnglishGB,
							ns: "features",
							user: `<@${user.id}>`,
							invoker: `<@${invoker.id}>`,
						}),
					},
					{
						type: ComponentType.MediaGallery,
						items: [{ media: { url: getRandomElement(HUGS)!.url } }],
					},
				],
			},
		],
		flags: MessageFlags.IsComponentsV2,
	});
}
