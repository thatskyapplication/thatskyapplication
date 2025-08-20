import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionDataResolvedGuildMember,
	type APIUser,
	ComponentType,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import { getRandomElement, HAIR_TOUSLES } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import { interactionInvoker } from "../utility/functions.js";
import { cannotUseUserInstallable } from "../utility/permissions.js";

export async function hairTousle(
	interaction: APIChatInputApplicationCommandInteraction,
	user: APIUser,
	member: APIInteractionDataResolvedGuildMember | null,
) {
	const invoker = interactionInvoker(interaction);
	const userLocale = interaction.locale;

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Mess someone else's hair up!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (
		await cannotUseUserInstallable(
			interaction,
			t("hair-tousle.missing-external-apps-permission", {
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
			content: `<@${user.id}> is not in this server to hair tousle.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (member) {
		const permissions = BigInt(member.permissions);

		if ((permissions & PermissionFlagsBits.ViewChannel) === 0n) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: `<@${user.id}> is not around to hair tousle!`,
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	if (user.bot) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `<@${user.id}> is a bot. They're pretty cold. Immune to hair tousle, I'd say.`,
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
						content: `<@${user.id}>, <@${invoker.id}> tousled your hair!`,
					},
					{
						type: ComponentType.MediaGallery,
						items: [{ media: { url: getRandomElement(HAIR_TOUSLES)!.url } }],
					},
				],
			},
		],
		flags: MessageFlags.IsComponentsV2,
	});
}
