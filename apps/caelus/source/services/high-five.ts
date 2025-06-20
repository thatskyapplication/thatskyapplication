import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionDataResolvedGuildMember,
	type APIUser,
	ComponentType,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import { MAXIMUM_HIGH_FIVE_GIF } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import { CDN_URL, DEFAULT_EMBED_COLOUR } from "../utility/constants.js";
import { interactionInvoker } from "../utility/functions.js";
import { cannotUseUserInstallable } from "../utility/permissions.js";

export async function highFive(
	interaction: APIChatInputApplicationCommandInteraction,
	user: APIUser,
	member: APIInteractionDataResolvedGuildMember | null,
) {
	const invoker = interactionInvoker(interaction);
	const userLocale = interaction.locale;

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "You may have two hands, but... try someone else!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (
		await cannotUseUserInstallable(
			interaction,
			t("high-five.missing-external-apps-permission", {
				lng: userLocale,
				ns: "commands",
				user: `<@${user.id}>`,
			}),
		)
	) {
		return;
	}

	if (interaction.guild_id && !member) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `<@${user.id}> is not in this server to high-five.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (member) {
		const permissions = BigInt(member.permissions);

		if ((permissions & PermissionFlagsBits.ViewChannel) === 0n) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: `<@${user.id}> is not around to high-five!`,
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	if (user.bot) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `<@${user.id}> is a bot. They're pretty cold. Immune to high-fives, I'd say.`,
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
						content: `<@${user.id}>, <@${invoker.id}> high-fived you!`,
					},
					{
						type: ComponentType.MediaGallery,
						items: [
							{
								media: {
									url: String(
										new URL(
											`high_fives/${Math.floor(Math.random() * MAXIMUM_HIGH_FIVE_GIF + 1)}.gif`,
											CDN_URL,
										),
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
