import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import {
	type APIComponentInContainer,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APISelectMenuOption,
	ButtonStyle,
	ComponentType,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import {
	ELDER_SPIRITS,
	type ElderSpirit,
	type Event,
	type EventIds,
	type GuideSpirit,
	REALMS,
	STANDARD_SPIRITS,
	type SeasonIds,
	type SeasonalSpirit,
	type SpiritIds,
	type StandardSpirit,
	formatEmoji,
	resolveReturningSpirits,
	skyCurrentSeason,
	skyEventYears,
	skyEvents,
	skyNow,
	skySeasons,
	spirits,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { NESTING_WORKSHOP } from "../data/nesting-workshop.js";
import { PERMANENT_EVENT_STORE } from "../data/permanent-event-store.js";
import { SECRET_AREA } from "../data/secret-area.js";
import { STARTER_PACKS } from "../data/starter-packs.js";
import { client } from "../discord.js";
import { type CataloguePacket, start } from "../features/catalogue.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	CatalogueType,
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
	NO_EVENT_INFOGRAPHIC_YET,
	NO_EVENT_OFFER_TEXT,
	NO_FRIENDSHIP_TREE_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
} from "../utility/catalogue.js";
import {
	CATALOGUE_EVENTS_THRESHOLD,
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE_COMPONENTS_V2,
	MAXIMUM_TEXT_DISPLAY_LENGTH,
} from "../utility/constants.js";
import {
	CosmeticToEmoji,
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalEmoji,
} from "../utility/emojis.js";
import {
	interactionInvoker,
	isButton,
	isRealm,
	resolveStringSelectMenu,
} from "../utility/functions.js";

interface CatalogueData {
	userId: CataloguePacket["user_id"];
	data: Set<number>;
}

type CataloguePatchData = Omit<CataloguePacket, "user_id">;

export class Catalogue {
	public readonly userId: CatalogueData["userId"];

	public data!: CatalogueData["data"];

	public constructor(catalogue: CataloguePacket) {
		this.userId = catalogue.user_id;
		this.patch(catalogue);
	}

	private patch(data: CataloguePatchData) {
		this.data = new Set(data.data);
	}

	public static async fetch(userId: Snowflake) {
		const [cataloguePacket] = await pg<CataloguePacket>(Table.Catalogue).where("user_id", userId);

		if (!cataloguePacket) {
			throw new Error("No catalogue data found.");
		}

		return new this(cataloguePacket);
	}

	public static async viewSeasons(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);
		const currentSeason = skyCurrentSeason(skyNow());
		const containerComponents: APIComponentInContainer[] = [];

		if (currentSeason) {
			containerComponents.push({
				type: ComponentType.Section,
				accessory: {
					type: ComponentType.Button,
					custom_id: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${currentSeason.id}`,
					emoji: SeasonIdToSeasonalEmoji[currentSeason.id],
					style: ButtonStyle.Primary,
				},
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Seasons \n-# Catalogue",
					},
				],
			});
		} else {
			containerComponents.push({
				type: ComponentType.TextDisplay,
				content: "## Seasons \n-# Catalogue",
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
				content: "Behold, the entirety of seasons! Select a season using the select menu!",
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: CATALOGUE_VIEW_SEASON_CUSTOM_ID,
						max_values: 1,
						min_values: 0,
						options: skySeasons().map((season) => {
							const percentage = catalogue.seasonProgress([season], true);

							return {
								emoji: SeasonIdToSeasonalEmoji[season.id],
								label: `${t(`seasons.${season.id}`, { lng: locale, ns: "general" })}${
									percentage === null ? "" : ` (${percentage}%)`
								}`,
								value: String(season.id),
							};
						}),
						placeholder: "Select a season!",
					},
				],
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.ActionRow,
				components: [
					BACK_TO_START_BUTTON,
					{
						type: ComponentType.Button,
						custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
						emoji: { name: "⏪" },
						label: "Back",
						style: ButtonStyle.Secondary,
					},
				],
			},
		);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: containerComponents,
				},
			],
		});
	}

	public static async viewSeason(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
		seasonId: SeasonIds,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const seasons = skySeasons();
		const season = seasons.get(seasonId);

		if (!season) {
			pino.error(interaction, "Failed to view a season.");

			await client.api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				ERROR_RESPONSE_COMPONENTS_V2,
			);

			return;
		}

		const catalogue = await this.fetch(invoker.id);
		const title = `## ${formatEmoji(SeasonIdToSeasonalEmoji[season.id])} [${t(`seasons.${season.id}`, { lng: locale, ns: "general" })}](${t(`season-wiki.${season.id}`, { lng: locale, ns: "general" })})\n-# Catalogue → Seasons`;

		const containerComponents: APIComponentInContainer[] = [
			season.patchNotesURL
				? {
						type: ComponentType.Section,
						accessory: {
							type: ComponentType.Button,
							label: "Patch notes",
							style: ButtonStyle.Link,
							url: season.patchNotesURL,
						},
						components: [
							{
								type: ComponentType.TextDisplay,
								content: title,
							},
						],
					}
				: {
						type: ComponentType.TextDisplay,
						content: title,
					},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
		];

		const { hasEverything, remainingCurrency, offerProgress, itemsOfferProgress } =
			catalogue.offerData({
				spirits: [season.guide, ...season.spirits.values()],
				items: season.items,
				locale,
				limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length,
				includePercentage: true,
				includeTotalRemainingCurrency: true,
				includeTitles: true,
			});

		if (remainingCurrency) {
			containerComponents.push({ type: ComponentType.TextDisplay, content: remainingCurrency });
		}

		for (const [id, text] of offerProgress.spirits) {
			containerComponents.push({
				type: ComponentType.Section,
				accessory: {
					type: ComponentType.Button,
					style: ButtonStyle.Primary,
					custom_id: `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${id}`,
					label: t("view", { lng: locale, ns: "general" }),
				},
				components: [{ type: ComponentType.TextDisplay, content: text }],
			});
		}

		if (itemsOfferProgress) {
			containerComponents.push({ type: ComponentType.TextDisplay, content: itemsOfferProgress });
		}

		if (season.items.length > 0) {
			const itemsOptions = season.items.map(({ name, cosmetics, cosmeticDisplay }) => {
				const stringSelectMenuOption: APISelectMenuOption = {
					default: cosmetics.every((cosmetic) => catalogue.data.has(cosmetic)),
					label: name,
					value: JSON.stringify(cosmetics),
				};

				const emoji = CosmeticToEmoji[cosmeticDisplay];

				if (emoji) {
					stringSelectMenuOption.emoji = emoji;
				}

				return stringSelectMenuOption;
			});

			containerComponents.push({
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: `${CATALOGUE_SET_SEASON_ITEMS_CUSTOM_ID}§${seasonId}`,
						max_values: itemsOptions.length,
						min_values: 0,
						options: itemsOptions,
						placeholder: "What items do you have?",
					},
				],
			});
		}

		const before = seasons.get((season.id - 1) as SeasonIds);
		const after = seasons.get((season.id + 1) as SeasonIds);

		containerComponents.push(
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID}§${seasonId}`,
						disabled: hasEverything,
						emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
						label: "I have everything!",
						style: ButtonStyle.Success,
					},
				],
			},
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
						custom_id: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${before?.id}`,
						disabled: !before,
						emoji: before ? SeasonIdToSeasonalEmoji[before.id] : MISCELLANEOUS_EMOJIS.No,
						label: "Previous season",
						style: ButtonStyle.Secondary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${after?.id}`,
						disabled: !after,
						emoji: after ? SeasonIdToSeasonalEmoji[after.id] : MISCELLANEOUS_EMOJIS.No,
						label: "Next season",
						style: ButtonStyle.Secondary,
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					BACK_TO_START_BUTTON,
					{
						type: ComponentType.Button,
						custom_id: CATALOGUE_VIEW_SEASONS_CUSTOM_ID,
						emoji: { name: "⏪" },
						label: "Back",
						style: ButtonStyle.Secondary,
					},
				],
			},
		);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: containerComponents,
				},
			],
		});
	}

	public static async viewEventYears(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: [
						{
							type: ComponentType.TextDisplay,
							content: "## Events By Year\n-# Catalogue",
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.TextDisplay,
							content: "Events are grouped by year.",
						},
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID,
									max_values: 1,
									min_values: 0,
									options: skyEventYears().map((year) => {
										const percentage = catalogue.eventProgress(
											[
												...skyEvents()
													.filter((event) => event.start.year === year)
													.values(),
											],
											true,
										);

										return {
											label: `${year}${percentage === null ? "" : ` (${percentage}%)`}`,
											value: String(year),
										};
									}),
									placeholder: "Select a year!",
								},
							],
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.ActionRow,
							components: [
								BACK_TO_START_BUTTON,
								{
									type: ComponentType.Button,
									custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
									emoji: { name: "⏪" },
									label: "Back",
									style: ButtonStyle.Secondary,
								},
							],
						},
					],
				},
			],
		});
	}

	public static async viewEvents(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
		yearString: string,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const year = Number(yearString);
		const catalogue = await this.fetch(invoker.id);
		const events = skyEvents().filter((event) => event.start.year === year);
		const eventsYears = skyEventYears();
		const index = eventsYears.indexOf(year);
		const before = eventsYears[index - 1];
		const after = eventsYears[index + 1];
		const title = `## ${year}\n-# Catalogue → Events By Year`;

		const containerComponents: APIComponentInContainer[] = [
			{
				type: ComponentType.TextDisplay,
				content: title,
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
		];

		const { offerProgress } = catalogue.offerData({
			events: [...events.values()],
			locale,
			limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length,
			includePercentage: true,
			includeTitles: true,
		});

		if (offerProgress.events.size > CATALOGUE_EVENTS_THRESHOLD) {
			containerComponents.push(
				{
					type: ComponentType.TextDisplay,
					content: [...offerProgress.events.values()].join("\n"),
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.StringSelect,
							custom_id: CATALOGUE_VIEW_EVENT_CUSTOM_ID,
							max_values: 1,
							min_values: 0,
							options: events.map((event) => {
								const { id } = event;

								const stringSelectMenuOption: APISelectMenuOption = {
									label: t(`events.${id}`, { lng: locale, ns: "general" }),
									value: String(id),
								};

								const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

								if (eventTicketEmoji) {
									stringSelectMenuOption.emoji = eventTicketEmoji;
								}

								return stringSelectMenuOption;
							}),
							placeholder: "Select an event!",
						},
					],
				},
			);
		} else {
			for (const [id, text] of offerProgress.events) {
				containerComponents.push({
					type: ComponentType.Section,
					accessory: {
						type: ComponentType.Button,
						style: ButtonStyle.Primary,
						custom_id: `${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${id}`,
						label: t("view", { lng: locale, ns: "general" }),
					},
					components: [{ type: ComponentType.TextDisplay, content: text }],
				});
			}
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
						custom_id: `${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${before}`,
						disabled: !before,
						emoji: { name: "⬅️" },
						label: "Previous year",
						style: ButtonStyle.Secondary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${after}`,
						disabled: !after,
						emoji: { name: "➡️" },
						label: "Next year",
						style: ButtonStyle.Secondary,
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					BACK_TO_START_BUTTON,
					{
						type: ComponentType.Button,
						custom_id: CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID,
						emoji: { name: "⏪" },
						label: "Back",
						style: ButtonStyle.Secondary,
					},
				],
			},
		);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: containerComponents,
				},
			],
		});
	}

	public static async viewReturningSpirits(interaction: APIMessageComponentButtonInteraction) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);
		const spirits = resolveReturningSpirits(skyNow());

		if (!spirits) {
			await start({ locale, userId: invoker.id });
			return;
		}

		const title = "## Returning Spirits\n-# Catalogue";

		const containerComponents: APIComponentInContainer[] = [
			{
				type: ComponentType.TextDisplay,
				content: title,
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
		];

		const { remainingCurrency, offerProgress } = catalogue.offerData({
			spirits: [...spirits.values()],
			locale,
			limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length,
			includePercentage: true,
			includeTotalRemainingCurrency: true,
			includeTitles: true,
		});

		if (remainingCurrency) {
			containerComponents.push({ type: ComponentType.TextDisplay, content: remainingCurrency });
		}

		for (const [id, text] of offerProgress.spirits) {
			containerComponents.push({
				type: ComponentType.Section,
				accessory: {
					type: ComponentType.Button,
					style: ButtonStyle.Primary,
					custom_id: `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${id}`,
					label: t("view", { lng: locale, ns: "general" }),
				},
				components: [{ type: ComponentType.TextDisplay, content: text }],
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
				components: [BACK_TO_START_BUTTON],
			},
		);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: containerComponents,
				},
			],
		});
	}

	public static async parseViewSpirit(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const spiritId = Number(
			isButton(interaction)
				? interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1)
				: interaction.data.values[0]!,
		);

		const spirit = spirits().get(spiritId as SpiritIds);

		if (!spirit) {
			pino.error(interaction, `Invalid spirit id: ${spiritId}`);

			await client.api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				ERROR_RESPONSE_COMPONENTS_V2,
			);

			return;
		}

		await catalogue.viewSpirit(interaction, spirit);
	}

	private async viewSpirit(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
		spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
	) {
		const { locale } = interaction;
		const isStandardSpirit = spirit.isStandardSpirit();
		const isElderSpirit = spirit.isElderSpirit();
		const isSeasonalSpirit = spirit.isSeasonalSpirit();
		const isGuideSpirit = spirit.isGuideSpirit();
		const seasonalParsing = isSeasonalSpirit && spirit.current.length === 0;
		const offer = seasonalParsing ? spirit.seasonal : spirit.current;
		const imageURL = seasonalParsing ? spirit.imageURLSeasonal : spirit.imageURL;

		const { hasEverything, offerProgress } = this.offerData({
			spirits: [spirit],
			locale,
			limit: MAXIMUM_TEXT_DISPLAY_LENGTH,
			includePercentage: false,
		});

		let spirits:
			| ReadonlyCollection<SpiritIds, StandardSpirit>
			| ReadonlyCollection<SpiritIds, ElderSpirit>
			| ReadonlyCollection<SpiritIds, SeasonalSpirit | GuideSpirit>
			| undefined;

		if (isStandardSpirit) {
			spirits = REALMS.find(({ name }) => name === spirit.realm)?.spirits;
		} else if (isElderSpirit) {
			spirits = ELDER_SPIRITS;
		} else if (isSeasonalSpirit || isGuideSpirit) {
			const season = skySeasons().get(spirit.seasonId);

			if (season) {
				spirits = new Collection<SpiritIds, SeasonalSpirit | GuideSpirit>()
					.set(season.guide.id, season.guide)
					.concat(season.spirits);
			}
		}

		const breadcrumbs = `Catalogue → ${isStandardSpirit ? `Realms → ${t(`realms.${spirit.realm}`, { lng: locale, ns: "general" })}` : isElderSpirit ? "Elders" : `Seasons → ${t(`seasons.${spirit.seasonId}`, { lng: locale, ns: "general" })}`}`;

		const containerComponents: APIComponentInContainer[] = [
			{
				type: ComponentType.TextDisplay,
				content: `## [${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}](${t(`spirit-wiki.${spirit.id}`, { lng: locale, ns: "general" })})\n-# ${breadcrumbs}`,
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
		];

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: offerProgress.spirits.first() ?? NO_FRIENDSHIP_TREE_TEXT,
		});

		if (imageURL) {
			containerComponents.push({
				type: ComponentType.MediaGallery,
				items: [{ media: { url: imageURL } }],
			});
		} else if (offer.length > 0) {
			containerComponents.push({
				type: ComponentType.TextDisplay,
				content: `-# ${NO_FRIENDSHIP_TREE_YET_TEXT}`,
			});
		}

		if (isGuideSpirit && spirit.inProgress) {
			containerComponents.push({
				type: ComponentType.TextDisplay,
				content: `-# ${GUIDE_SPIRIT_IN_PROGRESS_TEXT}`,
			});
		}

		if (offer.length > 0) {
			const itemSelectionOptions = offer.map(({ name, cosmetics, cosmeticDisplay }) => {
				const stringSelectMenuOption: APISelectMenuOption = {
					default: cosmetics.every((cosmetic) => this.data.has(cosmetic)),
					label: name,
					value: JSON.stringify(cosmetics),
				};

				const emoji = CosmeticToEmoji[cosmeticDisplay];

				if (emoji) {
					stringSelectMenuOption.emoji = emoji;
				}

				return stringSelectMenuOption;
			});

			const itemSelectionOptionsMaximumLimit = itemSelectionOptions.slice(
				0,
				CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
			);

			containerComponents.push({
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§spirit:${spirit.id}`,
						max_values: itemSelectionOptionsMaximumLimit.length,
						min_values: 0,
						options: itemSelectionOptionsMaximumLimit,
						placeholder: "Select what you have!",
					},
				],
			});

			if (itemSelectionOptions.length > CATALOGUE_MAXIMUM_OPTIONS_LIMIT) {
				const itemSelectionOverflowOptionsMaximumLimit = itemSelectionOptions.slice(
					CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
				);

				containerComponents.push({
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.StringSelect,
							custom_id: `${CATALOGUE_VIEW_OFFER_2_CUSTOM_ID}§spirit:${spirit.id}`,
							max_values: itemSelectionOverflowOptionsMaximumLimit.length,
							min_values: 0,
							options: itemSelectionOverflowOptionsMaximumLimit,
							placeholder: "Select what you have!",
						},
					],
				});
			}
		}

		containerComponents.push({
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		});

		if (spirits) {
			const index = [...spirits.values()].findIndex(({ id }) => id === spirit.id);
			const beforeIndex = index - 1;
			const before = beforeIndex >= 0 ? spirits.at(beforeIndex) : null;
			const after = spirits.at(index + 1);

			containerComponents.push({
				type: ComponentType.ActionRow,
				// It is possible that for 1 spirit, the custom ids will be the same, leading to an error.
				// We use the nullish coalescing operator to fallback to some default values to mitigate this.
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${before?.id ?? "before"}`,
						disabled: !before,
						emoji: { name: "⬅️" },
						label: "Previous spirit",
						style: ButtonStyle.Secondary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${after?.id ?? "after"}`,
						disabled: !after,
						emoji: { name: "➡️" },
						label: "Next spirit",
						style: ButtonStyle.Secondary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§spirit:${spirit.id}`,
						disabled: hasEverything,
						emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
						label: "I have everything!",
						style: ButtonStyle.Success,
					},
				],
			});
		}

		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				BACK_TO_START_BUTTON,
				{
					type: ComponentType.Button,
					custom_id: isElderSpirit
						? CATALOGUE_VIEW_ELDERS_CUSTOM_ID
						: isStandardSpirit
							? `${CATALOGUE_VIEW_REALM_CUSTOM_ID}§${spirit.realm}`
							: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${spirit.seasonId}`,
					emoji:
						isSeasonalSpirit || isGuideSpirit
							? SeasonIdToSeasonalEmoji[spirit.seasonId]
							: { name: "⏪" },
					label: "Back",
					style: ButtonStyle.Secondary,
				},
			],
		});

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: containerComponents,
				},
			],
		});
	}

	public static async parseViewEvent(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const eventId = Number(
			isButton(interaction)
				? interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1)
				: interaction.data.values[0],
		);

		const event = skyEvents().get(eventId as EventIds);

		if (!event) {
			pino.error(interaction, "Could not parse an event for the catalogue.");

			await client.api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				ERROR_RESPONSE_COMPONENTS_V2,
			);

			return;
		}

		await catalogue.viewEvent(interaction, event);
	}

	private async viewEvent(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
		event: Event,
	) {
		const { locale } = interaction;
		const { id, start, offer, offerInfographicURL, patchNotesURL } = event;
		const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

		const containerComponents: APIComponentInContainer[] = [
			{
				type: ComponentType.TextDisplay,
				content: `## [${eventTicketEmoji ? formatEmoji(eventTicketEmoji) : ""}${t(`events.${id}`, { lng: locale, ns: "general" })}](${t(`event-wiki.${id}`, { lng: locale, ns: "general" })})\n-# Catalogue → Events By Year → ${event.start.year}`,
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
		];

		let description: string;

		if (offer.length > 0) {
			const { offerDescription } = this.progress(offer);
			description = offerDescription.join("\n");
		} else {
			description = NO_EVENT_OFFER_TEXT;
		}

		if (patchNotesURL) {
			containerComponents.push({
				type: ComponentType.Section,
				accessory: {
					type: ComponentType.Button,
					label: "Patch notes",
					style: ButtonStyle.Link,
					url: patchNotesURL,
				},
				components: [
					{
						type: ComponentType.TextDisplay,
						content: description,
					},
				],
			});
		} else {
			containerComponents.push({
				type: ComponentType.TextDisplay,
				content: description,
			});
		}

		if (offerInfographicURL) {
			containerComponents.push({
				type: ComponentType.MediaGallery,
				items: [{ media: { url: offerInfographicURL } }],
			});
		} else if (offer.length > 0) {
			containerComponents.push({
				type: ComponentType.TextDisplay,
				content: `-# ${NO_EVENT_INFOGRAPHIC_YET}`,
			});
		}

		if (offer.length > 0) {
			const itemSelectionOptions = offer.map(({ name, cosmetics, cosmeticDisplay }) => {
				const stringSelectMenuOption: APISelectMenuOption = {
					default: cosmetics.every((cosmetic) => this.data.has(cosmetic)),
					label: name,
					value: JSON.stringify(cosmetics),
				};

				const emoji = CosmeticToEmoji[cosmeticDisplay];

				if (emoji) {
					stringSelectMenuOption.emoji = emoji;
				}

				return stringSelectMenuOption;
			});

			containerComponents.push({
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§event:${id}`,
						max_values: itemSelectionOptions.length,
						min_values: 0,
						options: itemSelectionOptions,
						placeholder: "Select what you have!",
					},
				],
			});
		}

		const events = skyEvents().filter((event) => event.start.year === start.year);
		const before = events.get((id - 1) as EventIds);
		const after = events.get((id + 1) as EventIds);

		containerComponents.push(
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.ActionRow,
				// It is possible that for the first event of a year, the custom ids will be the same, leading to an error.
				// We use the nullish coalescing operator to fallback to some default values to mitigate this.
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${before?.id ?? "before"}`,
						disabled: !before,
						emoji: { name: "⬅️" },
						label: "Previous event",
						style: ButtonStyle.Secondary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${after?.id ?? "after"}`,
						disabled: !after,
						emoji: { name: "➡️" },
						label: "Next event",
						style: ButtonStyle.Secondary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§event:${id}`,
						disabled: this.eventProgress([event]) === 100,
						emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
						label: "I have everything!",
						style: ButtonStyle.Success,
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					BACK_TO_START_BUTTON,
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${start.year}`,
						emoji: { name: "⏪" },
						label: "Back",
						style: ButtonStyle.Secondary,
					},
				],
			},
		);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: containerComponents,
				},
			],
		});
	}

	private static async viewStarterPacks(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const itemSelectionOptions = STARTER_PACKS.items.map(({ name, cosmetics, cosmeticDisplay }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue.data.has(cosmetic)),
				label: name,
				value: JSON.stringify(cosmetics),
			};

			const emoji = CosmeticToEmoji[cosmeticDisplay];

			if (emoji) {
				stringSelectMenuOption.emoji = emoji;
			}

			return stringSelectMenuOption;
		});

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: [
						{
							type: ComponentType.TextDisplay,
							content: "## Starter Packs\n-# Catalogue",
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.TextDisplay,
							content: catalogue.progress(STARTER_PACKS.items).offerDescription.join("\n"),
						},
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.StarterPacks}`,
									max_values: itemSelectionOptions.length,
									min_values: 0,
									options: itemSelectionOptions,
									placeholder: "Select what you have!",
								},
							],
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.ActionRow,
							components: [
								BACK_TO_START_BUTTON,
								{
									type: ComponentType.Button,
									custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
									emoji: { name: "⏪" },
									label: "Back",
									style: ButtonStyle.Secondary,
								},
								{
									type: ComponentType.Button,
									custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.StarterPacks}`,
									disabled: catalogue.starterPackProgress() === 100,
									emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
									label: "I have everything!",
									style: ButtonStyle.Success,
								},
							],
						},
					],
				},
			],
		});
	}

	private static async viewSecretArea(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const itemSelectionOptions = SECRET_AREA.items.map(({ name, cosmetics, cosmeticDisplay }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue.data.has(cosmetic)),
				label: name,
				value: JSON.stringify(cosmetics),
			};

			const emoji = CosmeticToEmoji[cosmeticDisplay];

			if (emoji) {
				stringSelectMenuOption.emoji = emoji;
			}

			return stringSelectMenuOption;
		});

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: [
						{
							type: ComponentType.TextDisplay,
							content: "## Secret Area\n-# Catalogue",
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.TextDisplay,
							content: catalogue.progress(SECRET_AREA.items).offerDescription.join("\n"),
						},
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.SecretArea}`,
									max_values: itemSelectionOptions.length,
									min_values: 0,
									options: itemSelectionOptions,
									placeholder: "Select what you have!",
								},
							],
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.ActionRow,
							components: [
								BACK_TO_START_BUTTON,
								{
									type: ComponentType.Button,
									custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
									emoji: { name: "⏪" },
									label: "Back",
									style: ButtonStyle.Secondary,
								},
								{
									type: ComponentType.Button,
									custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.SecretArea}`,
									disabled: catalogue.secretAreaProgress() === 100,
									emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
									label: "I have everything!",
									style: ButtonStyle.Success,
								},
							],
						},
					],
				},
			],
		});
	}

	private static async viewPermanentEventStore(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const itemSelectionOptions = PERMANENT_EVENT_STORE.items.map(
			({ name, cosmetics, cosmeticDisplay }) => {
				const stringSelectMenuOption: APISelectMenuOption = {
					default: cosmetics.every((cosmetic) => catalogue.data.has(cosmetic)),
					label: name,
					value: JSON.stringify(cosmetics),
				};

				const emoji = CosmeticToEmoji[cosmeticDisplay];

				if (emoji) {
					stringSelectMenuOption.emoji = emoji;
				}

				return stringSelectMenuOption;
			},
		);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: [
						{
							type: ComponentType.TextDisplay,
							content: "## Permanent Event Store\n-# Catalogue",
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.TextDisplay,
							content: catalogue.progress(PERMANENT_EVENT_STORE.items).offerDescription.join("\n"),
						},
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.PermanentEventStore}`,
									max_values: itemSelectionOptions.length,
									min_values: 0,
									options: itemSelectionOptions,
									placeholder: "Select what you have!",
								},
							],
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.ActionRow,
							components: [
								BACK_TO_START_BUTTON,
								{
									type: ComponentType.Button,
									custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
									emoji: { name: "⏪" },
									label: "Back",
									style: ButtonStyle.Secondary,
								},
								{
									type: ComponentType.Button,
									custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.PermanentEventStore}`,
									disabled: catalogue.permanentEventStoreProgress() === 100,
									emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
									label: "I have everything!",
									style: ButtonStyle.Success,
								},
							],
						},
					],
				},
			],
		});
	}

	private static async viewNestingWorkshop(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const itemSelectionOptions = NESTING_WORKSHOP.items.map(
			({ name, cosmetics, cosmeticDisplay }) => {
				const stringSelectMenuOption: APISelectMenuOption = {
					default: cosmetics.every((cosmetic) => catalogue.data.has(cosmetic)),
					label: name,
					value: JSON.stringify(cosmetics),
				};

				const emoji = CosmeticToEmoji[cosmeticDisplay];

				if (emoji) {
					stringSelectMenuOption.emoji = emoji;
				}

				return stringSelectMenuOption;
			},
		);

		const itemSelectionOptions1 = itemSelectionOptions.slice(0, CATALOGUE_MAXIMUM_OPTIONS_LIMIT);

		const itemSelectionOptions2 = itemSelectionOptions.slice(
			CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
			CATALOGUE_MAXIMUM_OPTIONS_LIMIT * 2,
		);

		const itemSelectionOptions3 = itemSelectionOptions.slice(
			CATALOGUE_MAXIMUM_OPTIONS_LIMIT * 2,
			CATALOGUE_MAXIMUM_OPTIONS_LIMIT * 3,
		);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: [
						{
							type: ComponentType.TextDisplay,
							content: "## Nesting Workshop\n-# Catalogue",
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.TextDisplay,
							content: catalogue.progress(NESTING_WORKSHOP.items).offerDescription.join("\n"),
						},
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`,
									max_values: itemSelectionOptions1.length,
									min_values: 0,
									options: itemSelectionOptions1,
									placeholder: "Select what you have!",
								},
							],
						},
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: `${CATALOGUE_VIEW_OFFER_2_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`,
									max_values: itemSelectionOptions2.length,
									min_values: 0,
									options: itemSelectionOptions2,
									placeholder: "Select what you have!",
								},
							],
						},
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: `${CATALOGUE_VIEW_OFFER_3_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`,
									max_values: itemSelectionOptions3.length,
									min_values: 0,
									options: itemSelectionOptions3,
									placeholder: "Select what you have!",
								},
							],
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.ActionRow,
							components: [
								BACK_TO_START_BUTTON,
								{
									type: ComponentType.Button,
									custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
									emoji: { name: "⏪" },
									label: "Back",
									style: ButtonStyle.Secondary,
								},
								{
									type: ComponentType.Button,
									custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`,
									disabled: catalogue.nestingWorkshopProgress() === 100,
									emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
									label: "I have everything!",
									style: ButtonStyle.Success,
								},
							],
						},
					],
				},
			],
		});
	}

	public static async setRealm(interaction: APIMessageComponentButtonInteraction) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);
		const realm = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);

		if (!isRealm(realm)) {
			throw new Error("Unknown realm.");
		}

		await this.update(invoker.id, {
			data: [
				...new Set([
					...STANDARD_SPIRITS.filter((spirit) => spirit.realm === realm).reduce<number[]>(
						(data, spirit) => {
							data.push(...spirit.allCosmetics);
							return data;
						},
						[],
					),
					...catalogue.data,
				]),
			],
		});

		await Catalogue.viewRealm(interaction, realm);
	}

	public static async setElders(interaction: APIMessageComponentButtonInteraction) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		await this.update(invoker.id, {
			data: [
				...new Set([
					...ELDER_SPIRITS.reduce<number[]>((data, spirit) => {
						data.push(...spirit.allCosmetics);
						return data;
					}, []),
					...catalogue.data,
				]),
			],
		});

		await Catalogue.viewElders(interaction);
	}

	public static async setSeason(interaction: APIMessageComponentButtonInteraction) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const parsedCustomId = Number(
			interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1),
		);

		const season = skySeasons().get(parsedCustomId as SeasonIds);

		if (!season) {
			pino.error(interaction, "Unknown season.");
			throw new Error("Unknown season.");
		}

		await this.update(invoker.id, {
			data: [
				...new Set([
					...season.guide.allCosmetics,
					...season.spirits.reduce<number[]>((totalCosmetics, spirit) => {
						totalCosmetics.push(...spirit.allCosmetics);
						return totalCosmetics;
					}, []),
					...season.allCosmetics,
					...catalogue.data,
				]),
			],
		});

		await Catalogue.viewSeason(interaction, season.id);
	}

	public static async setSeasonItems(interaction: APIMessageComponentSelectMenuInteraction) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);
		const parsedCustomId = Number(
			interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1),
		);
		const season = skySeasons().get(parsedCustomId as SeasonIds);

		if (!season) {
			pino.error(interaction, "Unknown season.");
			throw new Error("Unknown season.");
		}

		await this.update(invoker.id, {
			data: catalogue.calculateSetItems(interaction, season.allCosmetics),
		});

		await Catalogue.viewSeason(interaction, season.id);
	}

	public static async parseSetItems(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const resolvedCustomId = interaction.data.custom_id.slice(
			interaction.data.custom_id.indexOf("§") + 1,
		);

		const resolvedCustomIdForSpirits = resolvedCustomId.startsWith("spirit:")
			? Number(resolvedCustomId.slice(7))
			: null;

		const resolvedCustomIdNumberForEvents = resolvedCustomId.startsWith("event:")
			? Number(resolvedCustomId.slice(6))
			: null;

		const spirit = spirits().get(resolvedCustomIdForSpirits as SpiritIds);

		const event =
			resolvedCustomIdNumberForEvents === null
				? null
				: skyEvents().get(resolvedCustomIdNumberForEvents as EventIds);

		if (spirit) {
			await catalogue.setSpiritItems(interaction, spirit);
		} else if (event) {
			await catalogue.setEventItems(interaction, event);
		} else {
			switch (Number(resolvedCustomId)) {
				case CatalogueType.StarterPacks: {
					await catalogue.setStarterPacksItems(interaction);
					return;
				}
				case CatalogueType.SecretArea: {
					await catalogue.setSecretAreaItems(interaction);
					return;
				}
				case CatalogueType.PermanentEventStore: {
					await catalogue.setPermanentEventStoreItems(interaction);
					return;
				}
				case CatalogueType.NestingWorkshop: {
					await catalogue.setNestingWorkshopItems(interaction);
					return;
				}
				default: {
					pino.error(interaction, "Could not parse items to set.");
					await client.api.interactions.updateMessage(
						interaction.id,
						interaction.token,
						ERROR_RESPONSE_COMPONENTS_V2,
					);
				}
			}
		}
	}

	private calculateSetItems(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
		allCosmetics: readonly number[],
	) {
		let cosmetics: number[];

		if (isButton(interaction)) {
			const combinedSet = new Set(this.data);

			for (const cosmetic of allCosmetics) {
				combinedSet.add(cosmetic);
			}

			cosmetics = [...combinedSet];
		} else {
			// Get the select menu where this interaction came from.
			const component = resolveStringSelectMenu(
				interaction.message.components!,
				interaction.data.custom_id,
			)!;

			// Retrieve all cosmetics in this select menu.
			const selectMenuCosmetics = component.options.reduce((computedCosmetics, { value }) => {
				for (const parsedValue of JSON.parse(value) as readonly number[]) {
					computedCosmetics.add(parsedValue);
				}

				return computedCosmetics;
			}, new Set<number>());

			// Remove the cosmetics from the data.
			const modifiedData = this.data.difference(selectMenuCosmetics);

			// Calculate the new data.
			cosmetics = [
				...modifiedData,
				...interaction.data.values.reduce<number[]>((computedCosmetics, value) => {
					const parsedValue = JSON.parse(value) as readonly number[];
					computedCosmetics.push(...parsedValue);
					return computedCosmetics;
				}, []),
			];
		}

		return cosmetics;
	}

	private async setSpiritItems(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
		spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
	) {
		const invoker = interactionInvoker(interaction);

		const [cataloguePacket] = await Catalogue.update(invoker.id, {
			data: this.calculateSetItems(interaction, spirit.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await this.viewSpirit(interaction, spirit);
	}

	private async setEventItems(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
		event: Event,
	) {
		const invoker = interactionInvoker(interaction);

		const [cataloguePacket] = await Catalogue.update(invoker.id, {
			data: this.calculateSetItems(interaction, event.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await this.viewEvent(interaction, event);
	}

	private async setStarterPacksItems(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);

		const [cataloguePacket] = await Catalogue.update(invoker.id, {
			data: this.calculateSetItems(interaction, STARTER_PACKS.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await Catalogue.viewStarterPacks(interaction);
	}

	private async setSecretAreaItems(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);

		const [cataloguePacket] = await Catalogue.update(invoker.id, {
			data: this.calculateSetItems(interaction, SECRET_AREA.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await Catalogue.viewSecretArea(interaction);
	}

	private async setPermanentEventStoreItems(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);

		const [cataloguePacket] = await Catalogue.update(invoker.id, {
			data: this.calculateSetItems(interaction, PERMANENT_EVENT_STORE.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await Catalogue.viewPermanentEventStore(interaction);
	}

	private async setNestingWorkshopItems(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);

		const [cataloguePacket] = await Catalogue.update(invoker.id, {
			data: this.calculateSetItems(interaction, NESTING_WORKSHOP.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await Catalogue.viewNestingWorkshop(interaction);
	}

	private static update(userId: Catalogue["userId"], data: CataloguePatchData) {
		return pg<CataloguePacket>(Table.Catalogue)
			.update({ data: data.data })
			.where({ user_id: userId })
			.returning("*");
	}
}
