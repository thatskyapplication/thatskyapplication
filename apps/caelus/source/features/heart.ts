import { Collection } from "@discordjs/collection";
import {
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
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
	skyDate,
	skyNow,
	Table,
	TIME_ZONE,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { client } from "../discord.js";
import pg from "../pg.js";
import {
	DELETED_USER_TEXT,
	HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER,
	MAXIMUM_HEARTS_PER_DAY,
} from "../utility/constants.js";
import { CustomId } from "../utility/custom-id.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker, isChatInputCommand } from "../utility/functions.js";
import { cannotUseUserInstallable } from "../utility/permissions.js";

export interface HeartPacket {
	user_id: Snowflake | null;
	giftee_id: Snowflake | null;
	timestamp: Date;
	count: number;
}

interface HeartsExtra {
	start: DateTime;
	/**
	 * The end date is exclusive.
	 */
	end: DateTime;
	/**
	 * The count of extra hearts.
	 */
	count: number;
}

// Extra hearts.
const HEART_EXTRA_DATES = new Collection<number, HeartsExtra>()
	.set(1, {
		start: skyDate(2_024, 12, 9),
		end: skyDate(2_024, 12, 23),
		count: 1,
	})
	.set(2, {
		start: skyDate(2_025, 2, 10),
		end: skyDate(2_025, 2, 24),
		count: 1,
	})
	.set(3, {
		start: skyDate(2_025, 11, 17),
		end: skyDate(2_025, 12, 1),
		count: 1,
	});

async function totalGifted(userId: Snowflake) {
	// The types are wrong.
	// A row is always returned and the count is a string or null.
	const result = (await pg<HeartPacket>(Table.Hearts)
		.where({ user_id: userId })
		.sum("count")
		.first()) as unknown as { sum: string | null };

	return Number(result.sum ?? 0);
}

export async function totalReceived(userId: Snowflake) {
	// The types are wrong.
	// A row is always returned and the count is a string or null.
	const result = (await pg<HeartPacket>(Table.Hearts)
		.where({ giftee_id: userId })
		.sum("count")
		.first()) as unknown as { sum: string | null };

	return Number(result.sum ?? 0);
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
		.where({ user_id: invoker.id })
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
		user_id: invoker.id,
		giftee_id: user.id,
		timestamp: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
		count: 1 + (extraHearts?.count ?? 0),
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

	await client.api.interactions.followUp(interaction.application_id, interaction.token, {
		content:
			heartsLeftToGift === 0
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
		.where({ user_id: invoker.id })
		.orWhere({ giftee_id: invoker.id })
		.orderBy("timestamp", "desc")
		.limit(HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER)
		.offset(offset);

	if (heartPackets.length === 0) {
		const components: APIMessageTopLevelComponent[] = [
			{
				type: ComponentType.TextDisplay,
				content: t("heart.history-no-hearts", {
					lng: locale,
					ns: "features",
					emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
				}),
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
			.where({ user_id: invoker.id })
			.orWhere({ giftee_id: invoker.id })
			.count({ totalRows: "*" })
			.first()
			.then((result) => Number(result?.totalRows ?? 0)),
	]);

	const maximumPage = Math.ceil(total / HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER);

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## ${t("heart.history-title", { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: t("heart.history-summary", {
				lng: locale,
				ns: "features",
				gifted,
				received,
				emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
			}),
		},
		{
			type: ComponentType.TextDisplay,
			content: heartPackets
				.map((heartPacket) => {
					const gifted = heartPacket.user_id === invoker.id;
					const timestamp = Math.floor(heartPacket.timestamp.getTime() / 1_000);

					const message = t(
						heartPacket.count > 1
							? gifted
								? "heart.history-gifted-message-extra"
								: "heart.history-received-message-extra"
							: gifted
								? "heart.history-gifted-message"
								: "heart.history-received-message",
						{
							lng: locale,
							ns: "features",
							amount: heartPacket.count,
							emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
							user: gifted
								? heartPacket.giftee_id
									? `<@${heartPacket.giftee_id}>`
									: DELETED_USER_TEXT
								: heartPacket.user_id
									? `<@${heartPacket.user_id}>`
									: DELETED_USER_TEXT,
							timestamp1: `<t:${timestamp}:d>`,
							timestamp2: `<t:${timestamp}:R>`,
						},
					);

					return `- ${message}`;
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
	];

	if (maximumPage > 1) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Secondary,
					custom_id: `${CustomId.HeartHistoryBack}§${page === 1 ? maximumPage : page - 1}`,
					label: t("navigation-back", { lng: locale, ns: "general" }),
					emoji: { name: "⬅️" },
				},
				{
					type: ComponentType.Button,
					style: ButtonStyle.Secondary,
					custom_id: `${CustomId.HeartHistoryNext}§${page === maximumPage ? 1 : page + 1}`,
					label: t("navigation-next", { lng: locale, ns: "general" }),
					emoji: { name: "➡️" },
				},
			],
		});
	}

	const components: APIMessageTopLevelComponent[] = [
		{ type: ComponentType.Container, components: containerComponents },
	];

	if (isChatInput) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			allowed_mentions: { parse: [] },
			components,
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, { components });
	}
}
