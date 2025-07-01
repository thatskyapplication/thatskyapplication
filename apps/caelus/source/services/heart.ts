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
import {
	formatEmoji,
	getRandomElement,
	isDuring,
	resolveCurrencyEmoji,
	skyNow,
	Table,
	TIME_ZONE,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import type { HeartPacket } from "../models/Heart.js";
import pg from "../pg.js";
import {
	APPLICATION_ID,
	DEFAULT_EMBED_COLOUR,
	DELETED_USER_TEXT,
	HEART_HISTORY_BACK,
	HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER,
	HEART_HISTORY_NEXT,
	HEARTS,
	MAXIMUM_HEARTS_PER_DAY,
} from "../utility/constants.js";
import { HEART_EXTRA_DATES } from "../utility/dates.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker, isChatInputCommand } from "../utility/functions.js";
import { cannotUseUserInstallable } from "../utility/permissions.js";

async function totalGifted(userId: Snowflake) {
	const result = await pg<HeartPacket>(Table.Hearts)
		.where({ gifter_id: userId })
		.sum({ heartsExtra: "hearts_extra" })
		.count({ totalRows: "*" })
		.first();

	if (!result) {
		return 0;
	}

	const totalRows = Number(result.totalRows);
	const heartsExtra = Number(result.heartsExtra ?? 0);
	return totalRows + heartsExtra;
}

export async function totalReceived(userId: Snowflake) {
	const result = await pg<HeartPacket>(Table.Hearts)
		.where({ giftee_id: userId })
		.sum({ heartsExtra: "hearts_extra" })
		.count({ totalRows: "*" })
		.first();

	if (!result) {
		return 0;
	}

	const totalRows = Number(result.totalRows);
	const heartsExtra = Number(result.heartsExtra ?? 0);
	return totalRows + heartsExtra;
}

export async function gift(
	interaction: APIChatInputApplicationCommandInteraction | APIUserApplicationCommandInteraction,
	user: APIUser,
	member: APIInteractionDataResolvedGuildMember | null,
) {
	const invoker = interactionInvoker(interaction);

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `You cannot gift a ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} to yourself!`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (
		await cannotUseUserInstallable(
			interaction,
			t("heart.missing-external-apps-permission", {
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

	const now = skyNow();
	const today = now.startOf("day");

	const extraHearts = HEART_EXTRA_DATES.find((heartsExtra) =>
		isDuring(heartsExtra.start, heartsExtra.end, now),
	);

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
		hearts_extra: extraHearts?.count ?? 0,
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
	let heartsLeftToGiftText = `You can gift ${heartsLeftToGift} more ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} today.`;

	if (extraHearts) {
		const startDate = Intl.DateTimeFormat(interaction.locale, {
			timeZone: TIME_ZONE,
			dateStyle: "short",
		}).format(extraHearts.start.toMillis());

		const endDate = Intl.DateTimeFormat(interaction.locale, {
			timeZone: TIME_ZONE,
			dateStyle: "short",
		}).format(extraHearts.end.toMillis());

		heartsLeftToGiftText += `\nThere is currently a double heart event from ${startDate} to ${endDate}!`;
	}

	await client.api.interactions.followUp(APPLICATION_ID, interaction.token, {
		content: heartsLeftToGift === 0 ? noMoreHeartsLeft : heartsLeftToGiftText,
		flags: MessageFlags.Ephemeral,
	});
}

export async function history(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
) {
	const { locale } = interaction;
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
						label: t("navigation-back", { lng: locale, ns: "general" }),
						style: ButtonStyle.Secondary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${HEART_HISTORY_NEXT}§${page + 1}`,
						disabled: !hasNextPage,
						emoji: { name: "➡️" },
						label: t("navigation-next", { lng: locale, ns: "general" }),
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
					let name = gifted ? "Gifted" : "Received";

					if (heartPacket.hearts_extra > 0) {
						name += ` ${resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: heartPacket.hearts_extra + 1 })}`;
					}

					const user = gifted ? heartPacket.giftee_id : heartPacket.gifter_id;

					return {
						name,
						value: [
							`${user ? `<@${user}>` : DELETED_USER_TEXT}`,
							`<t:${Math.floor(heartPacket.timestamp.getTime() / 1_000)}:d>`,
							`(<t:${Math.floor(heartPacket.timestamp.getTime() / 1_000)}:R>)`,
						].join("\n"),
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
