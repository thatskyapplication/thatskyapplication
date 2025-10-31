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
	isSpiritsHistoryOrderType,
	type SeasonalSpirit,
	type SeasonalSpiritVisitReturningData,
	type SeasonalSpiritVisitTravellingErrorData,
	SeasonId,
	type SpiritIds,
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
	type StandardSpirit,
	skyNow,
	spirits,
	TIME_ZONE,
	TRAVELLING_DATES,
	VISITS_ABSENT,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import { resolveCostToString } from "../utility/catalogue.js";
import { CustomId } from "../utility/custom-id.js";
import { SeasonIdToSeasonalEmoji } from "../utility/emojis.js";

const MAXIMUM_SPIRITS_HISTORY_DISPLAY_NUMBER = 10 as const;

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

								stance = spirit.stance
									? t(`cosmetic-names.${spirit.stance}`, { lng: locale, ns: "general" })
									: null;

								call = spirit.call
									? t(`cosmetic-names.${spirit.call}`, { lng: locale, ns: "general" })
									: null;

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
	seasonalSpiritVisit: typeof TRAVELLING_DATES | SeasonalSpiritVisitReturningData,
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

		const startUnix = start.toUnixInteger();
		visits.push(
			`\`#${String(visit).padStart(maxLength, "0")}\` <t:${startUnix}:s> (<t:${startUnix}:R>)`,
		);
	}

	return visits.join("\n");
}

function visitErrorField(seasonalSpiritVisit: SeasonalSpiritVisitTravellingErrorData) {
	return seasonalSpiritVisit
		.reduce<string[]>((visits, start) => {
			const startUnix = start.toUnixInteger();
			visits.push(`\`Error\` <t:${start.toUnixInteger()}:s> (<t:${startUnix}:R>)`);
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
			travellingValue.push(visitField(travelling));
		}

		if (travellingErrors.size > 0) {
			travellingValue.push(visitErrorField(travellingErrors));
		}

		if (travellingValue.length > 0) {
			visits.push(`### Travelling\n${travellingValue.join("\n")}`);
		}

		if (returning.size > 0) {
			visits.push(`### Returning\n${visitField(returning)}`);
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

	const seasonEmoji = spiritSeason && SeasonIdToSeasonalEmoji[spiritSeason];

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `##${seasonEmoji ? ` ${formatEmoji(seasonEmoji)}` : ""} [${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}](${t(`spirit-wiki.${spirit.id}`, { lng: locale, ns: "general" })})`,
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
			content: `-# ${t("catalogue.spirit-not-fully-revealed", { lng: locale, ns: "features" })}`,
		});
	}

	return [{ type: ComponentType.Container, components: containerComponents }];
}

interface SpiritsViewSpiritOptions {
	flags?: MessageFlags;
}

export async function spiritsViewSpirit(
	interaction: APIMessageComponentButtonInteraction,
	spiritId: SpiritIds,
	{ flags }: SpiritsViewSpiritOptions = {},
) {
	const { locale } = interaction;
	const spirit = spirits().get(spiritId);

	if (!spirit) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("spirits.not-encountered-spirit", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	let resolvedFlags = MessageFlags.IsComponentsV2;

	if (flags) {
		resolvedFlags |= flags;
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		components: search({ spirit, locale }),
		flags: resolvedFlags,
	});
}

interface SpiritsGenerateSpiritsHistoryCustomIdOptions {
	prefix: string;
	type: SpiritsHistoryOrderTypes;
	page: number;
}

function generateSpiritsHistoryCustomId({
	prefix,
	type,
	page,
}: SpiritsGenerateSpiritsHistoryCustomIdOptions) {
	return `${prefix}§${type}§${page}`;
}

export function spiritsParseSpiritsHistoryCustomId(customId: string) {
	const [prefix, rawType, rawPage] = customId.split("§") as [
		string,
		`${SpiritsHistoryOrderTypes}`,
		`${number}`,
	];

	const type = Number(rawType);
	const page = Number(rawPage);

	if (!isSpiritsHistoryOrderType(type)) {
		throw new Error(`Invalid spirits history order type: ${type}`);
	}

	return { prefix, type, page };
}

interface SpiritsHistoryOptions {
	page: number;
	type: SpiritsHistoryOrderTypes;
	ephemeral?: boolean | undefined;
	newMessage?: boolean;
}

export async function spiritsHistory(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	{ page, type, ephemeral, newMessage }: SpiritsHistoryOptions,
) {
	const { locale } = interaction;
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
			content: `## ${t(`spirits.title.${type}`, { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	for (let index = offset; index < limit; index++) {
		const visitData = spirits.at(index);

		if (!visitData) {
			break;
		}

		const { spiritId, start, visit } = visitData;

		// Need to escape # otherwise Discord will not render the heading correctly.
		const heading = `###${type === SpiritsHistoryOrderType.Natural ? ` \\#${visit}` : ""} ${t(`spirits.${spiritId}`, { lng: locale, ns: "general" })}`;

		const startFormatOptions: Intl.DateTimeFormatOptions = {
			timeZone: TIME_ZONE,
			dateStyle: "short",
		};

		if (start.hour !== 0 || start.minute !== 0) {
			startFormatOptions.timeStyle = "short";
		}

		const startUnix = start.toUnixInteger();
		const lastVisited = `<t:${startUnix}:s> (<t:${startUnix}:R>)`;

		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Secondary,
				// We add the index to prevent custom id duplication.
				custom_id: `${CustomId.SpiritsViewSpirit}§${spiritId}§${index}`,
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
			content: `-# ${t("page", { lng: locale, ns: "general" })} ${page}/${maximumPage}`,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: generateSpiritsHistoryCustomId({
						prefix: CustomId.SpiritsHistoryBack,
						type,
						page: page === 1 ? maximumPage : page - 1,
					}),
					emoji: { name: "⬅️" },
					label: t("navigation-back", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
				{
					type: ComponentType.Button,
					custom_id: generateSpiritsHistoryCustomId({
						prefix: CustomId.SpiritsHistoryNext,
						type:
							type === SpiritsHistoryOrderType.Natural
								? SpiritsHistoryOrderType.Rarity
								: SpiritsHistoryOrderType.Natural,
						page: 1,
					}),
					label:
						type === SpiritsHistoryOrderType.Natural
							? t("spirits.order-rarity", { lng: locale, ns: "features" })
							: t("spirits.order-natural", { lng: locale, ns: "features" }),
					style: ButtonStyle.Primary,
				},
				{
					type: ComponentType.Button,
					custom_id: generateSpiritsHistoryCustomId({
						prefix: CustomId.SpiritsHistoryNext,
						type,
						page: page === maximumPage ? 1 : page + 1,
					}),
					emoji: { name: "➡️" },
					label: t("navigation-next", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	const response = {
		components: [{ type: ComponentType.Container, components: containerComponents }],
		flags: MessageFlags.IsComponentsV2,
	} satisfies APIInteractionResponseCallbackData;

	if (ephemeral) {
		response.flags |= MessageFlags.Ephemeral;
	}

	if (newMessage) {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	}
}
