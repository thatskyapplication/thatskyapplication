import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionDataResolvedGuildMember,
	type APIMessageComponentButtonInteraction,
	type APIUser,
	type APIUserApplicationCommandInteraction,
	ButtonStyle,
	ComponentType,
	type InteractionsAPI,
	MessageFlags,
	PermissionFlagsBits,
	type Snowflake,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { client } from "../discord.js";
import type { HeartPacket } from "../models/Heart.js";
import pg, { Table } from "../pg.js";
import {
	APPLICATION_ID,
	DEFAULT_EMBED_COLOUR,
	DELETED_USER_TEXT,
	HEARTS,
	HEART_HISTORY_BACK,
	HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER,
	HEART_HISTORY_NEXT,
	MAXIMUM_HEARTS_PER_DAY,
} from "../utility/constants.js";
import { skyToday } from "../utility/dates.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji, resolveCurrencyEmoji } from "../utility/emojis.js";
import { getRandomElement, interactionInvoker, isChatInputCommand } from "../utility/functions.js";
import { cannotUsePermissions } from "../utility/permissions.js";

async function totalGifted(userId: Snowflake) {
	return Number(
		(await pg<HeartPacket>(Table.Hearts).count().where({ gifter_id: userId }))[0]!.count,
	);
}

export async function totalReceived(userId: Snowflake) {
	return Number(
		(await pg<HeartPacket>(Table.Hearts).count().where({ giftee_id: userId }))[0]!.count,
	);
}

export async function gift(
	interaction: APIChatInputApplicationCommandInteraction | APIUserApplicationCommandInteraction,
	user: APIUser,
	member: APIInteractionDataResolvedGuildMember | null,
) {
	if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
		return;
	}

	const invoker = interactionInvoker(interaction);

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `You cannot gift a ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} to yourself!`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (interaction.guild_id && !member) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `<@${user.id}> is not in this server to gift a ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} to.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (member) {
		const permissions = BigInt(member.permissions);

		if ((permissions & PermissionFlagsBits.ViewChannel) === 0n) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: `<@${user.id}> is not around to receive a ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)}!`,
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	if (user.bot) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `<@${user.id}> is a bot. They're pretty emotionless. Immune to love, I'd say.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const today = skyToday();
	const tomorrowTimestamp = `<t:${Math.floor(today.plus({ day: 1 }).toUnixInteger())}:R>`;

	const heartPackets = await pg<HeartPacket>(Table.Hearts)
		.where({ gifter_id: invoker.id })
		.andWhere("timestamp", ">=", today.toISO())
		.orderBy("timestamp", "desc")
		.limit(MAXIMUM_HEARTS_PER_DAY);

	if (heartPackets.some((heartPacket) => heartPacket.giftee_id === user.id)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `You've already sent <@${user.id}> a ${formatEmoji(
				MISCELLANEOUS_EMOJIS.Heart,
			)} today!\nYou can gift another one to them ${tomorrowTimestamp}.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const noMoreHeartsLeft = `You have no more ${formatEmoji(
		MISCELLANEOUS_EMOJIS.Heart,
	)} left to gift today.\nYou can gift more ${tomorrowTimestamp}.`;

	if (heartPackets.length >= MAXIMUM_HEARTS_PER_DAY) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: noMoreHeartsLeft,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await pg<HeartPacket>(Table.Hearts).insert({
		gifter_id: invoker.id,
		giftee_id: user.id,
		timestamp: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
	});

	const hearts = await totalReceived(user.id);

	const heartMessage = getRandomElement(HEARTS)!
		.replaceAll("heart", formatEmoji(MISCELLANEOUS_EMOJIS.Heart))
		.replaceAll("{{gifter}}", `<@${invoker.id}>`)
		.replaceAll("{{giftee}}", `<@${user.id}>`);

	await client.api.interactions.reply(interaction.id, interaction.token, {
		allowed_mentions: { users: [user.id] },
		content: `${heartMessage}\n<@${user.id}> now has ${resolveCurrencyEmoji({
			emoji: MISCELLANEOUS_EMOJIS.Heart,
			number: hearts,
		})}.`,
	});

	const heartsLeftToGift = MAXIMUM_HEARTS_PER_DAY - heartPackets.length - 1;

	await client.api.interactions.followUp(APPLICATION_ID, interaction.token, {
		content:
			heartsLeftToGift === 0
				? noMoreHeartsLeft
				: `You can gift ${heartsLeftToGift} more ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} today.`,
		flags: MessageFlags.Ephemeral,
	});
}

export async function history(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
) {
	if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
		return;
	}

	const invoker = interactionInvoker(interaction);
	const isChatInput = isChatInputCommand(interaction);

	const page = isChatInput
		? 1
		: Number(interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1));

	const offset = (page - 1) * HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER;

	const heartPackets = await pg<HeartPacket>(Table.Hearts)
		.where({ gifter_id: invoker.id })
		.orWhere({ giftee_id: invoker.id })
		.orderBy("timestamp", "desc")
		.limit(HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER + 1)
		.offset(offset);

	if (heartPackets.length === 0) {
		const response = {
			components: [],
			content: `You have ${resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: 0 })}.`,
			embeds: [],
			flags: MessageFlags.Ephemeral,
		};

		if (isChatInput) {
			await client.api.interactions.reply(interaction.id, interaction.token, response);
		} else {
			await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
		}

		return;
	}

	const hasPreviousPage = offset > 0;
	const hasNextPage = heartPackets.length > HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER;

	if (hasNextPage) {
		heartPackets.pop();
	}

	const [gifted, received] = await Promise.all([
		totalGifted(invoker.id),
		totalReceived(invoker.id),
	]);

	const response:
		| Parameters<InteractionsAPI["reply"]>[2]
		| Parameters<InteractionsAPI["updateMessage"]>[2] = {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${HEART_HISTORY_BACK}§${page - 1}`,
						disabled: !hasPreviousPage,
						emoji: { name: "⬅️" },
						label: "Back",
						style: ButtonStyle.Secondary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${HEART_HISTORY_NEXT}§${page + 1}`,
						disabled: !hasNextPage,
						emoji: { name: "➡️" },
						label: "Next",
						style: ButtonStyle.Secondary,
					},
				],
			},
		],
		embeds: [
			{
				color: DEFAULT_EMBED_COLOUR,
				description: `Gifted: ${resolveCurrencyEmoji({
					emoji: MISCELLANEOUS_EMOJIS.Heart,
					number: gifted,
				})}\nReceived: ${resolveCurrencyEmoji({
					emoji: MISCELLANEOUS_EMOJIS.Heart,
					number: received,
				})}`,
				fields: heartPackets.map((heartPacket) => {
					const gifted = heartPacket.gifter_id === invoker.id;
					const user = gifted ? heartPacket.giftee_id : heartPacket.gifter_id;

					return {
						name: gifted ? "Gifted" : "Received",
						value: `${user ? `<@${user}>` : DELETED_USER_TEXT}\n<t:${Math.floor(heartPacket.timestamp.getTime() / 1_000)}:d>\n(<t:${Math.floor(heartPacket.timestamp.getTime() / 1_000)}:R>)`,
						inline: true,
					};
				}),
				title: "Heart History",
			},
		],
		flags: MessageFlags.Ephemeral,
	};

	if (isChatInput) {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	}
}
