import {
	type APIActionRowComponent,
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteractionDataIntegerOption,
	type APIButtonComponent,
	type APIChatInputApplicationCommandInteraction,
	type APIEmbed,
	type APIMessageComponentButtonInteraction,
	ButtonStyle,
	ComponentType,
	type Locale,
	MessageFlags,
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
	currentSeasonalSpirits,
	formatEmoji,
	isSpiritId,
	skyNow,
	spirits,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import pino from "../pino.js";
import {
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
	NO_FRIENDSHIP_TREE_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	resolveCostToString,
} from "../utility/catalogue.js";
import { DEFAULT_EMBED_COLOUR, ERROR_RESPONSE } from "../utility/constants.js";
import { SeasonIdToSeasonalEmoji } from "../utility/emojis.js";
import { isChatInputCommand } from "../utility/functions.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import {
	FriendActionToEmoji,
	SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID,
	SpiritCallToEmoji,
	SpiritEmoteToEmoji,
	SpiritStanceToEmoji,
} from "../utility/spirits.js";

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

	await searchResponse(
		interaction,
		spirit,
		spirit.isSeasonalSpirit() && spirit.current.length === 0,
	);
}

export async function parseSpiritSwitch(interaction: APIMessageComponentButtonInteraction) {
	const data = interaction.data.custom_id.split("§");
	const spiritId = Number(data[1]!);

	if (!isSpiritId(spiritId)) {
		pino.error(interaction, `Invalid spirit id: ${spiritId}`);
		await client.api.interactions.updateMessage(interaction.id, interaction.token, ERROR_RESPONSE);
		return;
	}

	const seasonalOffer = data[2] === "true";
	const spirit = currentSeasonalSpirits().get(spiritId);

	if (!spirit) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Woah, it seems we have not encountered that spirit yet. How strange!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await searchResponse(interaction, spirit, !seasonalOffer);
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

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This is fine.
async function searchResponse(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
	seasonalOffer = false,
) {
	const { locale } = interaction;
	const isSeasonalSpirit = spirit.isSeasonalSpirit();
	const isGuideSpirit = spirit.isGuideSpirit();
	const seasonalParsing = isSeasonalSpirit && seasonalOffer;
	const spiritSeason = isSeasonalSpirit || isGuideSpirit ? spirit.seasonId : null;
	const totalCost = seasonalParsing ? spirit.totalCostSeasonal : spirit.totalCost;
	const totalOffer = totalCost ? resolveCostToString(totalCost).join("") : null;

	const embed: APIEmbed = {
		color: DEFAULT_EMBED_COLOUR,
		title: t(`spirits.${spirit.id}`, { lng: locale, ns: "general" }),
		url: t(`spirit-wiki.${spirit.id}`, { lng: locale, ns: "general" }),
	};

	const fields = [];

	if (spirit.realm) {
		fields.push({
			name: "Realm",
			value: t(`realms.${spirit.realm}`, { lng: locale, ns: "general" }),
			inline: true,
		});
	}

	if (spiritSeason !== null) {
		fields.push({
			name: "Season",
			value: `${formatEmoji(SeasonIdToSeasonalEmoji[spiritSeason])}${t(`seasons.${spiritSeason}`, {
				lng: locale,
				ns: "general",
			})}`,
			inline: true,
		});
	}

	if (spirit.isStandardSpirit() || isSeasonalSpirit) {
		if (spirit.emote) {
			fields.push({
				name: "Emote",
				value: formatEmoji(SpiritEmoteToEmoji[spirit.emote]),
				inline: true,
			});
		}

		if (spirit.stance) {
			fields.push({
				name: "Stance",
				value: formatEmoji(SpiritStanceToEmoji[spirit.stance]),
				inline: true,
			});
		}

		if (spirit.call) {
			fields.push({
				name: "Call",
				value: formatEmoji(SpiritCallToEmoji[spirit.call]),
				inline: true,
			});
		}

		if (spirit.action) {
			fields.push({
				name: "Action",
				value: formatEmoji(FriendActionToEmoji[spirit.action]),
				inline: true,
			});
		}
	}

	const components: APIActionRowComponent<APIButtonComponent>[] = [];
	const description = [];
	const imageURL = seasonalParsing ? spirit.imageURLSeasonal : spirit.imageURL;

	if (isSeasonalSpirit) {
		const { travelling, travellingErrors, returning } = spirit.visits;
		const travellingFieldValue = [];

		if (travelling.size > 0) {
			travellingFieldValue.push(visitField(travelling, locale));
		}

		if (travellingErrors.size > 0) {
			travellingFieldValue.push(visitErrorField(travellingErrors, locale));
		}

		if (travellingFieldValue.length > 0) {
			fields.push({ name: "Travelling", value: travellingFieldValue.join("\n") });
		}

		if (returning.size > 0) {
			fields.push({ name: "Returning", value: visitField(returning, locale) });
		}

		if (spirit.visit(skyNow()).visited) {
			components.push({
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID}§${spirit.id}§${seasonalOffer}`,
						label: `${seasonalOffer ? "Current" : "Seasonal"} Friendship Tree`,
						style: ButtonStyle.Primary,
					},
				],
			});
		} else {
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

	if (totalOffer && totalOffer.length > 0) {
		description.push(totalOffer);
	}

	if (imageURL) {
		embed.image = { url: imageURL };
	} else {
		const offer = seasonalParsing ? spirit.seasonal : spirit.current;
		description.push(offer.length > 0 ? NO_FRIENDSHIP_TREE_YET_TEXT : NO_FRIENDSHIP_TREE_TEXT);
	}

	if (isGuideSpirit && spirit.inProgress) {
		embed.footer = { text: GUIDE_SPIRIT_IN_PROGRESS_TEXT };
	}

	if (isSeasonalSpirit && spirit.marketingVideoURL) {
		description.push(`[Promotional Video](${spirit.marketingVideoURL})`);
	}

	if (description.length > 0) {
		embed.description = description.join("\n");
	}

	embed.fields = fields;

	if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components,
			embeds: [embed],
		});
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components,
			embeds: [embed],
		});
	}
}
