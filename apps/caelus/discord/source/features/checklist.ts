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
import {
	type ChecklistSetData,
	checklistRefresh,
	checklistResetPayload,
	shardEruption,
	skyCurrentEvents,
	skyCurrentSeason,
	skyNow,
	TIME_ZONE,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import database from "../database.js";
import { client } from "../discord.js";
import { ME_CHECKLIST_URL } from "../utility/constants.js";
import { CustomId } from "../utility/custom-id.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker, snowflakeDate } from "../utility/functions.js";
import { resolveShardEruptionEmoji } from "../utility/shard-eruption.js";

interface ChecklistOptions {
	userId: Snowflake;
	locale: Locale;
}

export async function checklist({
	userId,
	locale,
}: ChecklistOptions): Promise<[APIMessageTopLevelComponent]> {
	let checklistPacket = await database
		.selectFrom("checklist")
		.selectAll()
		.where("user_id", "=", userId)
		.executeTakeFirst();

	if (checklistPacket) {
		const updatedChecklistPacket = await checklistRefresh(database, checklistPacket);

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
		({ eventTickets }) => eventTickets && Temporal.ZonedDateTime.compare(now, eventTickets.end) < 0,
	);

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## [${new Intl.DateTimeFormat(locale, { timeZone: TIME_ZONE, dateStyle: "full" }).format(now.epochMilliseconds)}](${ME_CHECKLIST_URL})`,
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

async function checklistToggle(
	interaction: APIMessageComponentButtonInteraction,
	key: "daily_quests" | "event_tickets" | "eye_of_eden" | "seasonal_candles" | "shard_eruptions",
) {
	const userId = interactionInvoker(interaction).id;
	const customId = interaction.data.custom_id;
	const now = snowflakeDate(interaction.id);

	const checklistPacket = await database
		.selectFrom("checklist")
		.selectAll()
		.where("user_id", "=", userId)
		.executeTakeFirst();

	const payload: ChecklistSetData = checklistPacket
		? checklistResetPayload(checklistPacket.last_updated_at, now)
		: { last_updated_at: now };

	payload[key] = customId.slice(customId.indexOf("§") + 1) === "0";

	await database
		.insertInto("checklist")
		.values({ user_id: userId, ...payload })
		.onConflict((oc) => oc.column("user_id").doUpdateSet(payload))
		.execute();

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: await checklist({ userId, locale: interaction.locale }),
	});
}

export async function checklistHandleDailyQuests(
	interaction: APIMessageComponentButtonInteraction,
) {
	await checklistToggle(interaction, "daily_quests");
}

export async function checklistHandleSeasonalCandles(
	interaction: APIMessageComponentButtonInteraction,
) {
	await checklistToggle(interaction, "seasonal_candles");
}

export async function checklistHandleEyeOfEden(interaction: APIMessageComponentButtonInteraction) {
	await checklistToggle(interaction, "eye_of_eden");
}

export async function checklistHandleShardEruptions(
	interaction: APIMessageComponentButtonInteraction,
) {
	await checklistToggle(interaction, "shard_eruptions");
}

export async function checklistHandleEventTickets(
	interaction: APIMessageComponentButtonInteraction,
) {
	await checklistToggle(interaction, "event_tickets");
}
