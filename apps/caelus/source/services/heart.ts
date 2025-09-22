import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionDataResolvedGuildMember,
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	type APIUser,
	type APIUserApplicationCommandInteraction,
	ButtonStyle,
	ComponentType,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import {
	formatEmoji,
	getRandomElement,
	resolveCurrencyEmoji,
	skyNow,
	Table,
	TIME_ZONE,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import type { HeartPacket } from "../models/Heart.js";
import pg from "../pg.js";
import { APPLICATION_ID } from "../utility/configuration.js";
import {
	DELETED_USER_TEXT,
	HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER,
	MAXIMUM_HEARTS_PER_DAY,
} from "../utility/constants.js";
import { HEART_EXTRA_DATES } from "../utility/dates.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker, isChatInputCommand } from "../utility/functions.js";
import { cannotUseUserInstallable } from "../utility/permissions.js";

export const HEART_HISTORY_BACK_CUSTOM_ID = "HEART_HISTORY_BACK_CUSTOM_ID" as const;
export const HEART_HISTORY_NEXT_CUSTOM_ID = "HEART_HISTORY_NEXT_CUSTOM_ID" as const;

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
	const userLocale = interaction.locale;

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("heart.gift-self", {
				lng: userLocale,
				ns: "features",
				emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (
		await cannotUseUserInstallable(
			interaction,
			t("heart.gift-missing-external-apps-permission", {
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
			content: t("heart.gift-not-in-server", {
				lng: userLocale,
				ns: "features",
				user: `<@${user.id}>`,
				emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (member) {
		const permissions = BigInt(member.permissions);

		if ((permissions & PermissionFlagsBits.ViewChannel) === 0n) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: t("heart.gift-not-around", {
					lng: userLocale,
					ns: "features",
					user: `<@${user.id}>`,
					emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
				}),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	if (user.bot) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("heart.gift-app", {
				lng: userLocale,
				ns: "features",
				user: `<@${user.id}>`,
				emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const now = skyNow();
	const today = now.startOf("day");

	const extraHearts = HEART_EXTRA_DATES.findLast(
		(heartsExtra) => now >= heartsExtra.start && now < heartsExtra.end,
	);

	const tomorrowTimestamp = `<t:${Math.floor(today.plus({ day: 1 }).toUnixInteger())}:R>`;

	const heartPackets = await pg<HeartPacket>(Table.Hearts)
		.where({ gifter_id: invoker.id })
		.andWhere("timestamp", ">=", today.toISO());

	if (heartPackets.some((heartPacket) => heartPacket.giftee_id === user.id)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("heart.gift-duplicate-user", {
				lng: userLocale,
				ns: "features",
				user: `<@${user.id}>`,
				emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
				timestamp: tomorrowTimestamp,
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (heartPackets.length >= MAXIMUM_HEARTS_PER_DAY) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("heart.gift-no-hearts-left", {
				lng: userLocale,
				ns: "features",
				emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
				timestamp: tomorrowTimestamp,
			}),
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
	const guildLocale = interaction.guild_locale ?? Locale.EnglishGB;

	const messages = t("heart.gift-messages", {
		lng: guildLocale,
		ns: "features",
		returnObjects: true,
		gifter: `<@${invoker.id}>`,
		giftee: `<@${user.id}>`,
	}) as readonly string[];

	const heartResult = t("heart.gift-message-heart-result", {
		lng: guildLocale,
		ns: "features",
		user: `<@${user.id}>`,
		number: hearts,
		emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
	});

	await client.api.interactions.reply(interaction.id, interaction.token, {
		allowed_mentions: { users: [user.id] },
		content: `${getRandomElement(messages)!}\n${heartResult}`,
	});

	const heartsLeftToGift = MAXIMUM_HEARTS_PER_DAY - heartPackets.length - 1;

	await client.api.interactions.followUp(APPLICATION_ID, interaction.token, {
		content:
			// Also handle negative numbers.
			// Could happen if we, for example, gift hearts through the database such that they are over the limit.
			heartsLeftToGift <= 0
				? t("heart.gift-no-hearts-left", {
						lng: userLocale,
						ns: "features",
						emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
						timestamp: tomorrowTimestamp,
					})
				: extraHearts
					? t("heart.gift-hearts-left-to-gift-double", {
							lng: guildLocale,
							ns: "features",
							number: heartsLeftToGift,
							emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
							date1: Intl.DateTimeFormat(interaction.locale, {
								timeZone: TIME_ZONE,
								dateStyle: "short",
							}).format(extraHearts.start.toMillis()),
							date2: Intl.DateTimeFormat(interaction.locale, {
								timeZone: TIME_ZONE,
								dateStyle: "short",
							}).format(extraHearts.end.toMillis()),
						})
					: t("heart.gift-hearts-left-to-gift", {
							lng: guildLocale,
							ns: "features",
							number: heartsLeftToGift,
							emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
						}),
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
		.limit(HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER)
		.offset(offset);

	if (heartPackets.length === 0) {
		const components: APIMessageTopLevelComponent[] = [
			{
				type: ComponentType.TextDisplay,
				content: `You have ${resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: 0 })}.`,
			},
		];

		if (isChatInput) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				components,
				flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
			});
		} else {
			await client.api.interactions.updateMessage(interaction.id, interaction.token, {
				components,
			});
		}

		return;
	}

	const [gifted, received, total] = await Promise.all([
		totalGifted(invoker.id),
		totalReceived(invoker.id),
		pg<HeartPacket>(Table.Hearts)
			.where({ gifter_id: invoker.id })
			.orWhere({ giftee_id: invoker.id })
			.count({ totalRows: "*" })
			.first()
			.then((result) => Number(result?.totalRows ?? 0)),
	]);

	const maximumPage = Math.ceil(total / HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER);

	const components: APIMessageTopLevelComponent[] = [
		{
			type: ComponentType.Container,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: "## Heart history",
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: `Gifted: ${resolveCurrencyEmoji({
						emoji: MISCELLANEOUS_EMOJIS.Heart,
						includeSpaceInEmoji: true,
						number: gifted,
					})}\nReceived: ${resolveCurrencyEmoji({
						emoji: MISCELLANEOUS_EMOJIS.Heart,
						includeSpaceInEmoji: true,
						number: received,
					})}`,
				},
				{
					type: ComponentType.TextDisplay,
					content: heartPackets
						.map((heartPacket) => {
							const gifted = heartPacket.gifter_id === invoker.id;
							const amount = `${heartPacket.hearts_extra > 0 ? `${heartPacket.hearts_extra + 1}` : ""} ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} ${gifted ? "to" : "from"}`;
							const user = gifted ? heartPacket.giftee_id : heartPacket.gifter_id;
							return `- ${amount} ${user ? `<@${user}>` : DELETED_USER_TEXT} on <t:${Math.floor(heartPacket.timestamp.getTime() / 1_000)}:d> (<t:${Math.floor(heartPacket.timestamp.getTime() / 1_000)}:R>)`;
						})
						.join("\n"),
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: `-# ${t("page", { lng: locale, ns: "general" })} ${page}/${maximumPage}`,
				},
			],
		},
	];

	if (maximumPage > 1) {
		components.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Secondary,
					custom_id: `${HEART_HISTORY_BACK_CUSTOM_ID}§${page === 1 ? maximumPage : page - 1}`,
					label: t("navigation-back", { lng: locale, ns: "general" }),
					emoji: { name: "⬅️" },
				},
				{
					type: ComponentType.Button,
					style: ButtonStyle.Secondary,
					custom_id: `${HEART_HISTORY_NEXT_CUSTOM_ID}§${page === maximumPage ? 1 : page + 1}`,
					label: t("navigation-next", { lng: locale, ns: "general" }),
					emoji: { name: "➡️" },
				},
			],
		});
	}

	if (isChatInput) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components,
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, { components });
	}
}
