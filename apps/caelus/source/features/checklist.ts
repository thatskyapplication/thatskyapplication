import {
	type APIButtonComponentWithCustomId,
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	ButtonStyle,
	ComponentType,
	type Locale,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { shardEruption, Table } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import pg from "../pg.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker } from "../utility/functions.js";
import { resolveShardEruptionEmoji } from "../utility/shard-eruption.js";

interface ChecklistPacket {
	user_id: Snowflake;
	daily_quests: boolean;
	eye_of_eden: boolean;
}

export const CHECKLIST_DAILY_QUESTS_COMPLETE_CUSTOM_ID =
	"CHECKLIST_DAILY_QUESTS_COMPLETE_CUSTOM_ID";

export const CHECKLIST_DAILY_QUESTS_SHOW_CUSTOM_ID = "CHECKLIST_DAILY_QUESTS_SHOW_CUSTOM_ID";
export const CHECKLIST_EYE_OF_EDEN_COMPLETE_CUSTOM_ID = "CHECKLIST_EYE_OF_EDEN_COMPLETE_CUSTOM_ID";
export const CHECKLIST_EYE_OF_EDEN_SHOW_CUSTOM_ID = "CHECKLIST_EYE_OF_EDEN_SHOW_CUSTOM_ID";

interface ChecklistOptions {
	userId: Snowflake;
	locale: Locale;
}

export async function checklist({
	userId,
	locale,
}: ChecklistOptions): Promise<[APIMessageTopLevelComponent]> {
	const checklistPacket = await pg<ChecklistPacket>(Table.Checklist)
		.where({ user_id: userId })
		.first();

	const shard = shardEruption();

	const shardEruptionButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		style: ButtonStyle.Secondary,
		custom_id: CHECKLIST_EYE_OF_EDEN_SHOW_CUSTOM_ID,
		label: t("checklist.eye-of-eden-show-button-label", {
			lng: locale,
			ns: "features",
		}),
	};

	if (shard) {
		shardEruptionButton.emoji = resolveShardEruptionEmoji(shard.strong);
	}

	return [
		{
			type: ComponentType.Container,
			components: [
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
								custom_id: `${CHECKLIST_DAILY_QUESTS_COMPLETE_CUSTOM_ID}§1`,
								label: t("checklist.reset", {
									lng: locale,
									ns: "features",
								}),
							}
						: {
								type: ComponentType.Button,
								style: ButtonStyle.Secondary,
								custom_id: `${CHECKLIST_DAILY_QUESTS_COMPLETE_CUSTOM_ID}§0`,
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
							custom_id: CHECKLIST_DAILY_QUESTS_SHOW_CUSTOM_ID,
							label: t("checklist.daily-quests-show-button-label", {
								lng: locale,
								ns: "features",
							}),
							emoji: MISCELLANEOUS_EMOJIS.DailyQuest,
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
					accessory: checklistPacket?.eye_of_eden
						? {
								type: ComponentType.Button,
								style: ButtonStyle.Danger,
								custom_id: `${CHECKLIST_EYE_OF_EDEN_COMPLETE_CUSTOM_ID}§1`,
								label: t("checklist.reset", {
									lng: locale,
									ns: "features",
								}),
							}
						: {
								type: ComponentType.Button,
								style: ButtonStyle.Secondary,
								custom_id: `${CHECKLIST_EYE_OF_EDEN_COMPLETE_CUSTOM_ID}§0`,
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
					type: ComponentType.ActionRow,
					components: [shardEruptionButton],
				},
			],
		},
	];
}

export async function checklistHandleDailyQuests(
	interaction: APIMessageComponentButtonInteraction,
) {
	const customId = interaction.data.custom_id;

	await pg<ChecklistPacket>(Table.Checklist)
		.insert({
			user_id: interactionInvoker(interaction).id,
			daily_quests: customId.slice(customId.indexOf("§") + 1) === "0",
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

export async function checklistHandleEyeOfEden(interaction: APIMessageComponentButtonInteraction) {
	const customId = interaction.data.custom_id;

	await pg<ChecklistPacket>(Table.Checklist)
		.insert({
			user_id: interactionInvoker(interaction).id,
			eye_of_eden: customId.slice(customId.indexOf("§") + 1) === "0",
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

export async function checklistResetDailyQuests() {
	await pg<ChecklistPacket>(Table.Checklist).update({ daily_quests: false });
}

export async function checklistResetEyeOfEden() {
	await pg<ChecklistPacket>(Table.Checklist).update({ eye_of_eden: false });
}
