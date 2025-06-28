import type { ReadonlyCollection } from "@discordjs/collection";
import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteractionDataIntegerOption,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	ButtonStyle,
	ComponentType,
	type Locale,
	MessageFlags,
	SeparatorSpacingSize,
} from "@discordjs/core";
import {
	type ElderSpirit,
	formatEmoji,
	type GuideSpirit,
	type SeasonalSpirit,
	type SeasonalSpiritVisitReturningData,
	type SeasonalSpiritVisitTravellingErrorData,
	SeasonId,
	type StandardSpirit,
	skyNow,
	spirits,
	TIME_ZONE,
	TRAVELLING_DATES,
	type TravellingDatesData,
	VISITS_ABSENT,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import { GUIDE_SPIRIT_IN_PROGRESS_TEXT, resolveCostToString } from "../utility/catalogue.js";
import { DEFAULT_EMBED_COLOUR } from "../utility/constants.js";
import { SeasonIdToSeasonalEmoji } from "../utility/emojis.js";
import { isChatInputCommand } from "../utility/functions.js";

export const SPIRITS_VIEW_SPIRIT_CUSTOM_ID = "SPIRITS_VIEW_SPIRIT_CUSTOM_ID";
export const SPIRITS_HISTORY_BACK_CUSTOM_ID = "SPIRITS_HISTORY_BACK_CUSTOM_ID";
export const SPIRITS_HISTORY_NEXT_CUSTOM_ID = "SPIRITS_HISTORY_NEXT_CUSTOM_ID";
const MAXIMUM_SPIRITS_HISTORY_DISPLAY_NUMBER = 10 as const;

enum SpiritsHistoryOrderType {
	Natural = 0,
	Absence = 1,
}

export async function searchAutocomplete<
	Interaction extends APIApplicationCommandAutocompleteInteraction,
>(
	interaction: Interaction,
	option: APIApplicationCommandInteractionDataIntegerOption<Interaction["type"]>,
) {
	const { locale } = interaction;
	const value = option.value.toUpperCase();

	await client.api.interactions.createAutocompleteResponse(interaction.id, interaction.token, {
		choices:
			value === ""
				? []
				: spirits()
						.filter((spirit) => {
							const { id, keywords } = spirit;
							const localisedName = t(`spirits.${id}`, { lng: locale, ns: "general" });
							let emote = null;
							let stance = null;
							let call = null;
							let action = null;
							const isSeasonalSpirit = spirit.isSeasonalSpirit();

							if (spirit.isStandardSpirit() || isSeasonalSpirit) {
								emote = spirit.emote?.toUpperCase() ?? null;
								stance = spirit.stance?.toUpperCase() ?? null;
								call = spirit.call?.toUpperCase() ?? null;
								action = spirit.action?.toUpperCase() ?? null;
							}

							const seasonName =
								isSeasonalSpirit || spirit.isGuideSpirit()
									? t(`seasons.${spirit.seasonId}`, { lng: locale, ns: "general" }).toUpperCase()
									: null;

							return (
								localisedName.toUpperCase().includes(value) ||
								keywords.some((keyword) => keyword.toUpperCase().includes(value)) ||
								emote?.toUpperCase().includes(value) ||
								stance?.toUpperCase().includes(value) ||
								call?.toUpperCase().includes(value) ||
								action?.toUpperCase().includes(value) ||
								seasonName?.includes(value)
							);
						})
						.map(({ id }) => ({
							name: t(`spirits.${id}`, { lng: locale, ns: "general" }),
							value: id,
						}))
						.slice(0, 25),
	});
}

function visitField(
	seasonalSpiritVisit:
		| ReadonlyCollection<number, TravellingDatesData>
		| SeasonalSpiritVisitReturningData,
	locale: Locale,
) {
	const maxLength = seasonalSpiritVisit.lastKey()!.toString().length;
	const visits = [];

	for (const [visit, { start }] of seasonalSpiritVisit) {
		const startFormatOptions: Intl.DateTimeFormatOptions = {
			timeZone: TIME_ZONE,
			dateStyle: "short",
		};

		if (start.hour !== 0 || start.minute !== 0) {
			startFormatOptions.timeStyle = "short";
		}

		const dateString = Intl.DateTimeFormat(locale, startFormatOptions).format(start.toMillis());

		visits.push(
			`\`#${String(visit).padStart(maxLength, "0")}\` \`${dateString}\` (<t:${start.toUnixInteger()}:R>)`,
		);
	}

	return visits.join("\n");
}

function visitErrorField(
	seasonalSpiritVisit: SeasonalSpiritVisitTravellingErrorData,
	locale: Locale,
) {
	return seasonalSpiritVisit
		.reduce<string[]>((visits, start) => {
			const dateString = Intl.DateTimeFormat(locale, {
				timeZone: TIME_ZONE,
				dateStyle: "short",
			}).format(start.toMillis());

			visits.push(`\`Error\` \`${dateString}\` (<t:${start.toUnixInteger()}:R>)`);
			return visits;
		}, [])
		.join("\n");
}

interface SpiritSearchOptions {
	spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit;
	locale: Locale;
}

export function search({ spirit, locale }: SpiritSearchOptions): [APIMessageTopLevelComponent] {
	const isSeasonalSpirit = spirit.isSeasonalSpirit();
	const isGuideSpirit = spirit.isGuideSpirit();
	const spiritSeason = isSeasonalSpirit || isGuideSpirit ? spirit.seasonId : null;
	const description = [];
	const visits = [];

	if (isSeasonalSpirit) {
		const { travellingErrors, returning } = spirit.visits;
		const travelling = TRAVELLING_DATES.filter(({ spiritId }) => spiritId === spirit.id);
		const travellingValue = [];

		if (travelling.size > 0) {
			travellingValue.push(visitField(travelling, locale));
		}

		if (travellingErrors.size > 0) {
			travellingValue.push(visitErrorField(travellingErrors, locale));
		}

		if (travellingValue.length > 0) {
			visits.push(`### Travelling\n${travellingValue.join("\n")}`);
		}

		if (returning.size > 0) {
			visits.push(`### Returning\n${visitField(returning, locale)}`);
		}

		if (!spirit.visit(skyNow()).visited) {
			description.push(
				`⚠️ This ${
					spiritSeason === SeasonId.Shattering || spiritSeason === SeasonId.Nesting
						? "entity"
						: spiritSeason === SeasonId.Revival
							? "shop"
							: "spirit"
				} has not yet returned.`,
			);
		}
	}

	const totalOffer = [];

	if (isSeasonalSpirit) {
		totalOffer.push(resolveCostToString(spirit.totalCostSeasonal).join(""));
	}

	if (spirit.totalCost) {
		const totalCostString = resolveCostToString(spirit.totalCost).join("");

		if (totalCostString.length > 0) {
			totalOffer.push(totalCostString);
		}
	}

	if (totalOffer.length > 0) {
		description.push(totalOffer.join("\n"));
	}

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## ${spiritSeason !== null ? `${formatEmoji(SeasonIdToSeasonalEmoji[spiritSeason])} ` : ""}[${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}](${t(`spirit-wiki.${spirit.id}`, { lng: locale, ns: "general" })})`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	if (description.length > 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: description.join("\n"),
		});
	}

	if (visits.length > 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: visits.join("\n"),
		});
	}

	const mediaItems = [
		isSeasonalSpirit && spirit.imageURLSeasonal,
		spirit.imageURL,
		isSeasonalSpirit && spirit.marketingVideoURL,
	]
		.filter((url) => typeof url === "string")
		.map((url) => ({ media: { url } }));

	if (mediaItems.length > 0) {
		containerComponents.push({
			type: ComponentType.MediaGallery,
			items: mediaItems,
		});
	}

	if (isGuideSpirit && spirit.inProgress) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `-# ${GUIDE_SPIRIT_IN_PROGRESS_TEXT}`,
		});
	}

	return [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: containerComponents,
		},
	];
}

export async function handleSearchButton(interaction: APIMessageComponentButtonInteraction) {
	const [, typeString, index] = interaction.data.custom_id.split("§") as [string, string, string];
	const type = Number(typeString) as SpiritsHistoryOrderType;

	const visit = (type === SpiritsHistoryOrderType.Natural ? TRAVELLING_DATES : VISITS_ABSENT).at(
		Number(index),
	);

	const spirit = visit && spirits().get(visit.spiritId);

	if (!spirit) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("spirits.not-encountered-spirit", { lng: interaction.locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		components: search({ spirit, locale: interaction.locale }),
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	});
}

export async function spiritsHistory(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
) {
	const { locale } = interaction;
	const isChatInput = isChatInputCommand(interaction);
	let page: number;
	let type: SpiritsHistoryOrderType;

	if (isChatInput) {
		page = 1;
		type = SpiritsHistoryOrderType.Natural;
	} else {
		const [, priorPage, priorType] = interaction.data.custom_id.split("§") as [
			string,
			string,
			string,
		];

		page = Number(priorPage);
		type = Number(priorType);
	}

	const offset = (page - 1) * MAXIMUM_SPIRITS_HISTORY_DISPLAY_NUMBER;
	const limit = offset + MAXIMUM_SPIRITS_HISTORY_DISPLAY_NUMBER;
	let spirits: typeof TRAVELLING_DATES | typeof VISITS_ABSENT;
	let maximumPage: number;

	if (type === SpiritsHistoryOrderType.Natural) {
		spirits = TRAVELLING_DATES;
		maximumPage = Math.ceil(spirits.size / MAXIMUM_SPIRITS_HISTORY_DISPLAY_NUMBER);
	} else {
		spirits = VISITS_ABSENT;
		maximumPage = Math.ceil(spirits.length / MAXIMUM_SPIRITS_HISTORY_DISPLAY_NUMBER);
	}

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## ${t("spirits.title", { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	for (let travellingIndex = offset; travellingIndex < limit; travellingIndex++) {
		const travelling = spirits.at(travellingIndex);

		if (!travelling) {
			break;
		}

		const { spiritId, start, visit } = travelling;

		// Need to escape # otherwise Discord will not render the heading correctly.
		const heading = `###${type === SpiritsHistoryOrderType.Natural ? ` \\#${visit}` : ""} ${t(`spirits.${spiritId}`, { lng: locale, ns: "general" })}`;

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
				style: ButtonStyle.Secondary,
				custom_id: `${SPIRITS_VIEW_SPIRIT_CUSTOM_ID}§${type}§${travellingIndex}`,
				label: t("view", { lng: locale, ns: "general" }),
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
			type: ComponentType.TextDisplay,
			content: `-# ${t("spirits.page", { lng: locale, ns: "features" })} ${page}/${maximumPage}`,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${SPIRITS_HISTORY_BACK_CUSTOM_ID}§${page === 1 ? maximumPage : page - 1}§${type}`,
					emoji: { name: "⬅️" },
					label: t("navigation-back", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
				{
					type: ComponentType.Button,
					custom_id: `${SPIRITS_HISTORY_NEXT_CUSTOM_ID}§1§${type === SpiritsHistoryOrderType.Natural ? SpiritsHistoryOrderType.Absence : SpiritsHistoryOrderType.Natural}`,
					label:
						type === SpiritsHistoryOrderType.Natural
							? t("spirits.order-absence", { lng: locale, ns: "features" })
							: t("spirits.order-natural", { lng: locale, ns: "features" }),
					style: ButtonStyle.Primary,
				},
				{
					type: ComponentType.Button,
					custom_id: `${SPIRITS_HISTORY_NEXT_CUSTOM_ID}§${page === maximumPage ? 1 : page + 1}§${type}`,
					emoji: { name: "➡️" },
					label: t("navigation-next", { lng: locale, ns: "general" }),
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
