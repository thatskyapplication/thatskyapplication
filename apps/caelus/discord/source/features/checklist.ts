import {
	type APIButtonComponentWithCustomId,
	type APIComponentInContainer,
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	ButtonStyle,
	ComponentType,
	type Locale,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import {
	type ChecklistPacket,
	type ChecklistSetData,
	shardEruption,
	skyCurrentEvents,
	skyCurrentSeason,
	skyNow,
	skyToday,
	Table,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import pg from "../pg.js";
import { CustomId } from "../utility/custom-id.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker } from "../utility/functions.js";
import { resolveShardEruptionEmoji } from "../utility/shard-eruption.js";

interface ChecklistOptions {
	userId: Snowflake;
	locale: Locale;
}

export async function checklist({
	userId,
	locale,
}: ChecklistOptions): Promise<[APIMessageTopLevelComponent]> {
	let checklistPacket = await pg<ChecklistPacket>(Table.Checklist)
		.where({ user_id: userId })
		.first();

	if (checklistPacket) {
		const updatedChecklistPacket = await checklistRefresh(checklistPacket);

		if (updatedChecklistPacket) {
			checklistPacket = updatedChecklistPacket;
		}
	}

	const shard = shardEruption();

	const shardEruptionButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		style: ButtonStyle.Secondary,
		custom_id: CustomId.ChecklistShardEruptionsShow,
		label: t("checklist.shard-eruptions-show-button-label", {
			lng: locale,
			ns: "features",
		}),
	};

	if (shard) {
		shardEruptionButton.emoji = resolveShardEruptionEmoji(shard.strong);
	}

	const now = skyNow();
	const season = skyCurrentSeason(now);

	const isAnyEventWithEventTickets = skyCurrentEvents(now).some(
		({ eventTickets }) => eventTickets && now < eventTickets.end,
	);

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## ${t("checklist.title", { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.Section,
			accessory: checklistPacket?.daily_quests
				? {
						type: ComponentType.Button,
						style: ButtonStyle.Danger,
						custom_id: `${CustomId.ChecklistDailyQuestsComplete}§1`,
						label: t("checklist.reset", {
							lng: locale,
							ns: "features",
						}),
					}
				: {
						type: ComponentType.Button,
						style: ButtonStyle.Secondary,
						custom_id: `${CustomId.ChecklistDailyQuestsComplete}§0`,
						label: t("checklist.complete", {
							lng: locale,
							ns: "features",
						}),
					},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: checklistPacket?.daily_quests
						? t("checklist.daily-quests-message-complete", { lng: locale, ns: "features" })
						: t("checklist.daily-quests-message-incomplete", { lng: locale, ns: "features" }),
				},
			],
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Secondary,
					custom_id: CustomId.ChecklistDailyQuestsShow,
					label: t("checklist.daily-quests-show-button-label", {
						lng: locale,
						ns: "features",
					}),
					emoji: MISCELLANEOUS_EMOJIS.DailyQuest,
				},
			],
		},
	];

	if (season) {
		containerComponents.push(
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.Section,
				accessory: checklistPacket?.seasonal_candles
					? {
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: `${CustomId.ChecklistSeasonalCandlesComplete}§1`,
							label: t("checklist.reset", {
								lng: locale,
								ns: "features",
							}),
						}
					: {
							type: ComponentType.Button,
							style: ButtonStyle.Secondary,
							custom_id: `${CustomId.ChecklistSeasonalCandlesComplete}§0`,
							label: t("checklist.complete", {
								lng: locale,
								ns: "features",
							}),
						},
				components: [
					{
						type: ComponentType.TextDisplay,
						content: checklistPacket?.seasonal_candles
							? t("checklist.seasonal-candles-message-complete", {
									lng: locale,
									ns: "features",
								})
							: season.isDuringDoubleSeasonalLightEvent(now)
								? t("checklist.seasonal-candles-message-incomplete-double", {
										lng: locale,
										ns: "features",
									})
								: t("checklist.seasonal-candles-message-incomplete", {
										lng: locale,
										ns: "features",
									}),
					},
				],
			},
		);
	}

	containerComponents.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.Section,
			accessory: checklistPacket?.eye_of_eden
				? {
						type: ComponentType.Button,
						style: ButtonStyle.Danger,
						custom_id: `${CustomId.ChecklistEyeOfEdenComplete}§1`,
						label: t("checklist.reset", {
							lng: locale,
							ns: "features",
						}),
					}
				: {
						type: ComponentType.Button,
						style: ButtonStyle.Secondary,
						custom_id: `${CustomId.ChecklistEyeOfEdenComplete}§0`,
						label: t("checklist.complete", {
							lng: locale,
							ns: "features",
						}),
					},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: checklistPacket?.eye_of_eden
						? t("checklist.eye-of-eden-message-complete", { lng: locale, ns: "features" })
						: t("checklist.eye-of-eden-message-incomplete", { lng: locale, ns: "features" }),
				},
			],
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.Section,
			accessory: checklistPacket?.shard_eruptions
				? {
						type: ComponentType.Button,
						style: ButtonStyle.Danger,
						custom_id: `${CustomId.ChecklistShardEruptionsComplete}§1`,
						label: t("checklist.reset", {
							lng: locale,
							ns: "features",
						}),
					}
				: {
						type: ComponentType.Button,
						style: ButtonStyle.Secondary,
						custom_id: `${CustomId.ChecklistShardEruptionsComplete}§0`,
						label: t("checklist.complete", {
							lng: locale,
							ns: "features",
						}),
						disabled: shard === null,
					},
			components: [
				{
					type: ComponentType.TextDisplay,
					content:
						shard === null
							? t("checklist.shard-eruptions-message-none", { lng: locale, ns: "features" })
							: checklistPacket?.shard_eruptions
								? t("checklist.shard-eruptions-message-complete", {
										lng: locale,
										ns: "features",
									})
								: t("checklist.shard-eruptions-message-incomplete", {
										lng: locale,
										ns: "features",
									}),
				},
			],
		},
		{
			type: ComponentType.ActionRow,
			components: [shardEruptionButton],
		},
	);

	if (isAnyEventWithEventTickets) {
		containerComponents.push(
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.Section,
				accessory: checklistPacket?.event_tickets
					? {
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: `${CustomId.ChecklistEventTicketsComplete}§1`,
							label: t("checklist.reset", {
								lng: locale,
								ns: "features",
							}),
						}
					: {
							type: ComponentType.Button,
							style: ButtonStyle.Secondary,
							custom_id: `${CustomId.ChecklistEventTicketsComplete}§0`,
							label: t("checklist.complete", {
								lng: locale,
								ns: "features",
							}),
						},
				components: [
					{
						type: ComponentType.TextDisplay,
						content: checklistPacket?.event_tickets
							? t("checklist.event-tickets-message-complete", {
									lng: locale,
									ns: "features",
								})
							: t("checklist.event-tickets-message-incomplete", {
									lng: locale,
									ns: "features",
								}),
					},
				],
			},
		);
	}

	return [{ type: ComponentType.Container, components: containerComponents }];
}

async function checklistRefresh(checklistPacket: ChecklistPacket) {
	const lastUpdatedTimestamp = checklistPacket.last_updated_at.getTime();
	const payload: ChecklistSetData = { last_updated_at: new Date() };
	const today = skyToday();

	if (today.toMillis() > lastUpdatedTimestamp) {
		payload.daily_quests = false;
		payload.seasonal_candles = false;
		payload.shard_eruptions = false;
		payload.event_tickets = false;
	}

	if (today.minus({ days: today.weekday % 7 }).toMillis() > lastUpdatedTimestamp) {
		payload.eye_of_eden = false;
	}

	if (Object.keys(payload).length === 2) {
		return;
	}

	const [updatedChecklistPacket] = await pg<ChecklistPacket>(Table.Checklist)
		.update(payload, "*")
		.where({ user_id: checklistPacket.user_id });

	return updatedChecklistPacket!;
}

export async function checklistHandleDailyQuests(
	interaction: APIMessageComponentButtonInteraction,
) {
	const customId = interaction.data.custom_id;

	await pg<ChecklistPacket>(Table.Checklist)
		.insert({
			user_id: interactionInvoker(interaction).id,
			daily_quests: customId.slice(customId.indexOf("§") + 1) === "0",
			last_updated_at: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
		})
		.onConflict("user_id")
		.merge();

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: await checklist({
			userId: interactionInvoker(interaction).id,
			locale: interaction.locale,
		}),
	});
}

export async function checklistHandleSeasonalCandles(
	interaction: APIMessageComponentButtonInteraction,
) {
	const customId = interaction.data.custom_id;
	const userId = interactionInvoker(interaction).id;

	await pg<ChecklistPacket>(Table.Checklist)
		.insert({
			user_id: userId,
			seasonal_candles: customId.slice(customId.indexOf("§") + 1) === "0",
			last_updated_at: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
		})
		.onConflict("user_id")
		.merge();

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: await checklist({ userId: userId, locale: interaction.locale }),
	});
}

export async function checklistHandleEyeOfEden(interaction: APIMessageComponentButtonInteraction) {
	const customId = interaction.data.custom_id;

	await pg<ChecklistPacket>(Table.Checklist)
		.insert({
			user_id: interactionInvoker(interaction).id,
			eye_of_eden: customId.slice(customId.indexOf("§") + 1) === "0",
			last_updated_at: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
		})
		.onConflict("user_id")
		.merge();

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: await checklist({
			userId: interactionInvoker(interaction).id,
			locale: interaction.locale,
		}),
	});
}

export async function checklistHandleShardEruptions(
	interaction: APIMessageComponentButtonInteraction,
) {
	const customId = interaction.data.custom_id;

	await pg<ChecklistPacket>(Table.Checklist)
		.insert({
			user_id: interactionInvoker(interaction).id,
			shard_eruptions: customId.slice(customId.indexOf("§") + 1) === "0",
			last_updated_at: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
		})
		.onConflict("user_id")
		.merge();

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: await checklist({
			userId: interactionInvoker(interaction).id,
			locale: interaction.locale,
		}),
	});
}

export async function checklistHandleEventTickets(
	interaction: APIMessageComponentButtonInteraction,
) {
	const customId = interaction.data.custom_id;

	await pg<ChecklistPacket>(Table.Checklist)
		.insert({
			user_id: interactionInvoker(interaction).id,
			event_tickets: customId.slice(customId.indexOf("§") + 1) === "0",
			last_updated_at: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
		})
		.onConflict("user_id")
		.merge();

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: await checklist({
			userId: interactionInvoker(interaction).id,
			locale: interaction.locale,
		}),
	});
}
