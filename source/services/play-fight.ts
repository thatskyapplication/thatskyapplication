import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionDataResolvedGuildMember,
	type APIUser,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import { client } from "../discord.js";
import { CDN_URL, DEFAULT_EMBED_COLOUR, MAX_PLAY_FIGHT_NO } from "../utility/constants.js";
import { interactionInvoker } from "../utility/functions.js";

export async function playFight(
	interaction: APIChatInputApplicationCommandInteraction,
	user: APIUser,
	member: APIInteractionDataResolvedGuildMember | null,
) {
	const invoker = interactionInvoker(interaction);

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Play with others!",
			flags: MessageFlags.Ephemeral,
		});
		return;
	}

	if (interaction.guild_id && !member) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `<@${user.id}> is not in this server to fight.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (member) {
		const permissions = BigInt(member.permissions);

		if ((permissions & PermissionFlagsBits.ViewChannel) === 0n) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: `<@${user.id}> is not around to be fought!`,
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	if (user.bot) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `<@${user.id}> is a bot. They're pretty durable. Immune to fights, I'd say.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: `<@${invoker.id}> is fighting <@${user.id}>!`,
		embeds: [
			{
				color: DEFAULT_EMBED_COLOUR,
				image: {
					url: String(
						new URL(
							`play_fights/${Math.floor(Math.random() * MAX_PLAY_FIGHT_NO + 1)}.gif`,
							CDN_URL,
						),
					),
				},
			},
		],
	});
}
