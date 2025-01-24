import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionDataResolvedGuildMember,
	type APIUser,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import { client } from "../discord.js";
import { CDN_URL, DEFAULT_EMBED_COLOUR, MAX_HAIR_TOUSLE_NO } from "../utility/constants.js";
import { interactionInvoker } from "../utility/functions.js";

export async function hairTousle(
	interaction: APIChatInputApplicationCommandInteraction,
	user: APIUser,
	member: APIInteractionDataResolvedGuildMember | null,
) {
	const invoker = interactionInvoker(interaction);

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Mess someone else's hair up!",
			flags: MessageFlags.Ephemeral,
		});

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
		content: `<@${user.id}>, <@${invoker.id}> tousled your hair!`,
		embeds: [
			{
				color: DEFAULT_EMBED_COLOUR,
				image: {
					url: String(
						new URL(
							`hair_tousles/${Math.floor(Math.random() * MAX_HAIR_TOUSLE_NO + 1)}.gif`,
							CDN_URL,
						),
					),
				},
			},
		],
	});
}
