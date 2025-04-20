import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type ApplicationCommandOptionType,
	ComponentType,
	type Locale,
	MessageFlags,
	SeparatorSpacingSize,
} from "@discordjs/core";
import {
	type ElderSpirit,
	type GuideSpirit,
	SeasonId,
	type SeasonalSpirit,
	type SeasonalSpiritVisitReturningData,
	type SeasonalSpiritVisitTravellingData,
	type SeasonalSpiritVisitTravellingErrorData,
	type SpiritIds,
	type StandardSpirit,
	TIME_ZONE,
	formatEmoji,
	skyNow,
	spirits,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import { GUIDE_SPIRIT_IN_PROGRESS_TEXT, resolveCostToString } from "../utility/catalogue.js";
import { DEFAULT_EMBED_COLOUR } from "../utility/constants.js";
import { SeasonIdToSeasonalEmoji } from "../utility/emojis.js";
import type { AutocompleteFocusedOption, OptionResolver } from "../utility/option-resolver.js";

export async function searchAutocomplete(
	interaction: APIApplicationCommandAutocompleteInteraction,
	option: AutocompleteFocusedOption<ApplicationCommandOptionType.Integer>,
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

export async function search(
	interaction: APIChatInputApplicationCommandInteraction,
	options: OptionResolver,
) {
	const query = options.getInteger("query", true);
	const spirit = spirits().get(query as SpiritIds);

	if (!spirit) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Woah, it seems we have not encountered that spirit yet. How strange!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await searchResponse(interaction, spirit);
}

function visitField(
	seasonalSpiritVisit: SeasonalSpiritVisitTravellingData | SeasonalSpiritVisitReturningData,
	locale: Locale,
) {
	const maxLength = seasonalSpiritVisit.lastKey()!.toString().length;

	return seasonalSpiritVisit
		.reduce<string[]>((visits, { start }, visit) => {
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
			return visits;
		}, [])
		.join("\n");
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

async function searchResponse(
	interaction: APIChatInputApplicationCommandInteraction,
	spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
) {
	const { locale } = interaction;
	const isSeasonalSpirit = spirit.isSeasonalSpirit();
	const isGuideSpirit = spirit.isGuideSpirit();
	const spiritSeason = isSeasonalSpirit || isGuideSpirit ? spirit.seasonId : null;
	const description = [];
	const visits = [];

	if (isSeasonalSpirit) {
		const { travelling, travellingErrors, returning } = spirit.visits;
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
		totalOffer.push(resolveCostToString(spirit.totalCost).join(""));
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

	await client.api.interactions.reply(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: containerComponents,
			},
		],
		flags: MessageFlags.IsComponentsV2,
	});
}
