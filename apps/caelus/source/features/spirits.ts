import {
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentButtonInteraction,
	ButtonStyle,
	ComponentType,
	MessageFlags,
	SeparatorSpacingSize,
} from "@discordjs/core";
import { TIME_ZONE, TRAVELLING_DATES, WEBSITE_URL } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import { isChatInputCommand } from "../utility/functions.js";

export const SPIRITS_HISTORY_BACK_CUSTOM_ID = "SPIRITS_HISTORY_BACK_CUSTOM_ID";
export const SPIRITS_HISTORY_NEXT_CUSTOM_ID = "SPIRITS_HISTORY_NEXT_CUSTOM_ID";
const MAXIMUM_SPIRITS_HISTORY_DISPLAY_NUMBER = 11 as const;

export async function spiritsHistory(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
) {
	const { locale } = interaction;
	const isChatInput = isChatInputCommand(interaction);

	const page = isChatInput
		? 1
		: Number(interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1));

	const offset = (page - 1) * MAXIMUM_SPIRITS_HISTORY_DISPLAY_NUMBER;
	const limit = offset + MAXIMUM_SPIRITS_HISTORY_DISPLAY_NUMBER;

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: "## Travelling Spirits history",
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	for (let travellingIndex = offset; travellingIndex < limit; travellingIndex++) {
		const travelling = TRAVELLING_DATES.at(travellingIndex);

		if (!travelling) {
			break;
		}

		const { spiritId, start } = travelling;

		// Need to escape # otherwise Discord will not render the heading correctly.
		const heading = `### \\#${TRAVELLING_DATES.keyAt(travellingIndex)!} ${t(`spirits.${spiritId}`, { lng: locale, ns: "general" })}`;

		const startFormatOptions: Intl.DateTimeFormatOptions = {
			timeZone: TIME_ZONE,
			dateStyle: "short",
		};

		if (start.hour !== 0 || start.minute !== 0) {
			startFormatOptions.timeStyle = "short";
		}

		const dateString = Intl.DateTimeFormat(locale, startFormatOptions).format(start.toMillis());
		const lastVisited = `\`${dateString}\` (<t:${start.toUnixInteger()}:R>)`;

		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: WEBSITE_URL,
				label: "View",
			},
			components: [{ type: ComponentType.TextDisplay, content: `${heading}\n\n${lastVisited}` }],
		});
	}

	containerComponents.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${SPIRITS_HISTORY_BACK_CUSTOM_ID}§${page - 1}`,
					disabled: page === 1,
					emoji: { name: "⬅️" },
					label: "Back",
					style: ButtonStyle.Secondary,
				},
				{
					type: ComponentType.Button,
					custom_id: `${SPIRITS_HISTORY_NEXT_CUSTOM_ID}§${page + 1}`,
					disabled:
						page === Math.ceil(TRAVELLING_DATES.size / MAXIMUM_SPIRITS_HISTORY_DISPLAY_NUMBER),
					emoji: { name: "➡️" },
					label: "Next",
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	const response: APIInteractionResponseCallbackData = {
		components: [{ type: ComponentType.Container, components: containerComponents }],
		flags: MessageFlags.IsComponentsV2,
	};

	if (isChatInput) {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	}
}
