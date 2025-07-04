import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionDataResolvedGuildMember,
	type APIUser,
	ComponentType,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import { getRandomElement, KRILLS } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import { DEFAULT_EMBED_COLOUR } from "../utility/constants.js";
import { interactionInvoker } from "../utility/functions.js";
import { cannotUseUserInstallable } from "../utility/permissions.js";

export async function krill(
	interaction: APIChatInputApplicationCommandInteraction,
	user: APIUser,
	member: APIInteractionDataResolvedGuildMember | null,
) {
	const invoker = interactionInvoker(interaction);
	const userLocale = interaction.locale;

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Self-krilling is no joke.",
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	if (
		await cannotUseUserInstallable(
			interaction,
			t("krill.missing-external-apps-permission", {
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
			content: `<@${user.id}> is not in this server to be krilled.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (member) {
		const permissions = BigInt(member.permissions);

		if ((permissions & PermissionFlagsBits.ViewChannel) === 0n) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: `<@${user.id}> is not around to be krilled!`,
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	if (user.bot) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `<@${user.id}> is a bot. They're pretty strong. Immune to krills, I'd say.`,
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
						content: `<@${user.id}> has been krilled by <@${invoker.id}>!`,
					},
					{
						type: ComponentType.MediaGallery,
						items: [{ media: { url: getRandomElement(KRILLS)!.url } }],
					},
				],
			},
		],
		flags: MessageFlags.IsComponentsV2,
	});
}
