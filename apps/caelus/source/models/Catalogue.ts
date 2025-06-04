import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import {
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIGuildInteractionWrapper,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentEmoji,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	type APISelectMenuOption,
	type APIUser,
	ButtonStyle,
	ChannelType,
	ComponentType,
	type InteractionsAPI,
	type Locale,
	MessageFlags,
	PermissionFlagsBits,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import {
	ELDER_SPIRITS,
	type ElderSpirit,
	type Event,
	type EventIds,
	type GuideSpirit,
	type Item,
	REALMS,
	REALM_SPIRITS,
	type RealmName,
	STANDARD_SPIRITS,
	type Season,
	type SeasonIds,
	type SeasonalSpirit,
	type SpiritIds,
	type StandardSpirit,
	addCosts,
	formatEmoji,
	isSeasonId,
	resolveAllCosmetics,
	resolveReturningSpirits,
	resolveTravellingSpirit,
	skyCurrentEvents,
	skyCurrentSeason,
	skyEventYears,
	skyEvents,
	skyNow,
	skySeasons,
	spirits,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { GUILD_CACHE } from "../caches/guilds.js";
import { NESTING_WORKSHOP } from "../data/nesting-workshop.js";
import { PERMANENT_EVENT_STORE } from "../data/permanent-event-store.js";
import { SECRET_AREA } from "../data/secret-area.js";
import { STARTER_PACKS } from "../data/starter-packs.js";
import { client } from "../discord.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	CatalogueType,
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
	NO_EVENT_INFOGRAPHIC_YET,
	NO_EVENT_OFFER_TEXT,
	NO_FRIENDSHIP_TREE_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	resolveCostToString,
} from "../utility/catalogue.js";
import {
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE_COMPONENTS_V2,
	MAXIMUM_TEXT_DISPLAY_LENGTH,
	NO_EVENTS_WITH_OFFER_TEXT,
} from "../utility/constants.js";
import {
	CUSTOM_EMOJI_REPLACEMENTS,
	CosmeticToEmoji,
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalEmoji,
} from "../utility/emojis.js";
import {
	interactionInvoker,
	isButton,
	isChatInputCommand,
	isRealm,
	resolveStringSelectMenu,
} from "../utility/functions.js";
import { cannotUsePermissions } from "../utility/permissions.js";
import Profile from "./Profile.js";

export interface CataloguePacket {
	user_id: Snowflake;
	data: number[];
}

interface CatalogueData {
	userId: CataloguePacket["user_id"];
	data: Set<number>;
}

type CataloguePatchData = Omit<CataloguePacket, "user_id">;

interface OfferDataOptions {
	spirits?: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[];
	events?: readonly Event[];
	items?: readonly Item[];
	locale: Locale;
	limit: number;
	includePercentage: boolean;
	performRemainingCurrency: boolean;
}

export const CATALOGUE_VIEW_START_CUSTOM_ID = "CATALOGUE_VIEW_START_CUSTOM_ID" as const;
export const CATALOGUE_BACK_TO_START_CUSTOM_ID = "CATALOGUE_BACK_TO_START_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_TYPE_CUSTOM_ID = "CATALOGUE_VIEW_TYPE_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_REALMS_CUSTOM_ID = "CATALOGUE_VIEW_REALMS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_ELDERS_CUSTOM_ID = "CATALOGUE_VIEW_ELDERS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_SEASONS_CUSTOM_ID = "CATALOGUE_VIEW_SEASONS_CUSTOM_ID" as const;
export const CATALOGUE_SET_SEASON_ITEMS_CUSTOM_ID = "CATALOGUE_SET_SEASON_ITEMS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID = "CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_REALM_CUSTOM_ID = "CATALOGUE_VIEW_REALM_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_SEASON_CUSTOM_ID = "CATALOGUE_VIEW_SEASON_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID = "CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID" as const;

export const CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID =
	"CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID" as const;

export const CATALOGUE_VIEW_SPIRIT_CUSTOM_ID = "CATALOGUE_VIEW_SPIRIT_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_EVENT_CUSTOM_ID = "CATALOGUE_VIEW_EVENT_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_OFFER_1_CUSTOM_ID = "CATALOGUE_VIEW_OFFER_1_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_OFFER_2_CUSTOM_ID = "CATALOGUE_VIEW_OFFER_2_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_OFFER_3_CUSTOM_ID = "CATALOGUE_VIEW_OFFER_3_CUSTOM_ID" as const;
const CATALOGUE_SHARE_REALMS_KEY = "realms" as const;
const CATALOGUE_SHARE_ELDER_KEY = "elders" as const;
export const CATALOGUE_SHARE_PROMPT_CUSTOM_ID = "CATALOGUE_SHARE_PROMPT_CUSTOM_ID" as const;
export const CATALOGUE_SHARE_SEND_CUSTOM_ID = "CATALOGUE_SHARE_SEND_CUSTOM_ID" as const;
export const CATALOGUE_REALM_EVERYTHING_CUSTOM_ID = "CATALOGUE_REALM_EVERYTHING_CUSTOM_ID" as const;

export const CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID =
	"CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID" as const;

export const CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID =
	"CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID" as const;

export const CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID = "CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID" as const;
const CATALOGUE_MAXIMUM_OPTIONS_LIMIT = 25 as const;

const CATALOGUE_STANDARD_PERCENTAGE_NOTE =
	"Averages are calculated even beyond the second wing buff." as const;

const BACK_TO_START_BUTTON = {
	type: ComponentType.Button,
	// This custom id must differ to avoid duplicate custom ids.
	custom_id: CATALOGUE_BACK_TO_START_CUSTOM_ID,
	emoji: { name: "⏮️" },
	label: "Start",
	style: ButtonStyle.Secondary,
} as const;

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

	private ownedProgress(items: readonly Item[]) {
		return {
			owned: resolveAllCosmetics(items).filter((cosmetic) => this.data.has(cosmetic)),
			total: items.reduce((total, item) => total + item.cosmetics.length, 0),
		};
	}

	private progressPercentage(owned: readonly number[], total: number, round?: boolean) {
		if (total === 0) {
			return null;
		}

		const percentage = (owned.length / total) * 100;

		if (!round) {
			return percentage;
		}

		const integer = Math.trunc(percentage);

		return integer === 0
			? Math.ceil(percentage)
			: integer === 99
				? Math.floor(percentage)
				: Math.round(percentage);
	}

	private spiritOwnedProgress(
		spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[],
	) {
		const totalOwned = [];
		let total = 0;

		for (const spirit of spirits) {
			const offer =
				spirit.isStandardSpirit() || spirit.isElderSpirit() || spirit.isGuideSpirit()
					? spirit.current
					: spirit.items;

			const { owned, total: offerTotal } = this.ownedProgress(offer);
			totalOwned.push(...owned);
			total += offerTotal;
		}

		return { owned: totalOwned, total };
	}

	public spiritProgress(
		spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[],
		round?: boolean,
	) {
		const { owned, total } = this.spiritOwnedProgress(spirits);
		return this.progressPercentage(owned, total, round);
	}

	private seasonOwnedProgress(seasons: readonly Season[]) {
		const totalOwned = [];
		let total = 0;

		for (const season of seasons) {
			const offers = [
				season.guide.current,
				...season.spirits.map((spirit) => spirit.items),
				season.items,
			];

			for (const offer of offers) {
				const { owned, total: offerTotal } = this.ownedProgress(offer);
				totalOwned.push(...owned);
				total += offerTotal;
			}
		}

		return { owned: totalOwned, total };
	}

	public seasonProgress(seasons: readonly Season[], round?: boolean) {
		const { owned, total } = this.seasonOwnedProgress(seasons);
		return this.progressPercentage(owned, total, round);
	}

	private eventOwnedProgress(events: readonly Event[]) {
		const totalOwned = [];
		let total = 0;

		for (const event of events) {
			const { owned, total: offerTotal } = this.ownedProgress(event.offer);

			totalOwned.push(...owned);
			total += offerTotal;
		}

		return { owned: totalOwned, total };
	}

	public eventProgress(events: readonly Event[], round?: boolean) {
		const { owned, total } = this.eventOwnedProgress(events);
		return this.progressPercentage(owned, total, round);
	}

	private starterPackOwnedProgress() {
		return this.ownedProgress(STARTER_PACKS.items);
	}

	public starterPackProgress(round?: boolean) {
		const { owned, total } = this.starterPackOwnedProgress();
		return this.progressPercentage(owned, total, round);
	}

	private secretAreaOwnedProgress() {
		return this.ownedProgress(SECRET_AREA.items);
	}

	public secretAreaProgress(round?: boolean) {
		const { owned, total } = this.secretAreaOwnedProgress();
		return this.progressPercentage(owned, total, round);
	}

	private permanentEventStoreOwnedProgress() {
		return this.ownedProgress(PERMANENT_EVENT_STORE.items);
	}

	public permanentEventStoreProgress(round?: boolean) {
		const { owned, total } = this.permanentEventStoreOwnedProgress();
		return this.progressPercentage(owned, total, round);
	}

	private nestingWorkshopOwnedProgress() {
		return this.ownedProgress(NESTING_WORKSHOP.items);
	}

	public nestingWorkshopProgress(round?: boolean) {
		const { owned, total } = this.nestingWorkshopOwnedProgress();
		return this.progressPercentage(owned, total, round);
	}

	public allProgress(round?: boolean) {
		const standardAndElderOwnedProgress = this.spiritOwnedProgress([...REALM_SPIRITS.values()]);
		const seasonalOwnedProgress = this.seasonOwnedProgress([...skySeasons().values()]);
		const eventOwnedProgress = this.eventOwnedProgress([...skyEvents().values()]);
		const starterPackOwnedProgress = this.starterPackOwnedProgress();
		const secretAreaOwnedProgress = this.secretAreaOwnedProgress();
		const permanentEventStoreOwnedProgress = this.permanentEventStoreOwnedProgress();
		const nestingWorkshopOwnedProgress = this.nestingWorkshopOwnedProgress();

		const progresses = [
			standardAndElderOwnedProgress,
			seasonalOwnedProgress,
			eventOwnedProgress,
			starterPackOwnedProgress,
			secretAreaOwnedProgress,
			permanentEventStoreOwnedProgress,
			nestingWorkshopOwnedProgress,
		];

		return this.progressPercentage(
			progresses.reduce<number[]>((totalOwned, { owned }) => {
				if (Array.isArray(owned)) {
					totalOwned.push(...owned);
				} else {
					totalOwned.push(owned);
				}

				return totalOwned;
			}, []),
			progresses.reduce((totalTotal, { total }) => totalTotal + total, 0),
			round,
		);
	}

	public static async viewCatalogue(
		interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const existingCatalogue = await this.fetch(invoker.id).catch(() => null);
		let catalogue: Catalogue;

		if (existingCatalogue) {
			catalogue = existingCatalogue;
		} else {
			catalogue = new this(
				(await pg<CataloguePacket>(Table.Catalogue).insert({ user_id: invoker.id }, "*"))[0]!,
			);
		}

		const standardProgress = catalogue.spiritProgress([...STANDARD_SPIRITS.values()], true);
		const elderProgress = catalogue.spiritProgress([...ELDER_SPIRITS.values()], true);
		const seasonalProgress = catalogue.seasonProgress([...skySeasons().values()], true);
		const eventProgress = catalogue.eventProgress([...skyEvents().values()], true);
		const starterPackProgress = catalogue.starterPackProgress(true);
		const secretAreaProgress = catalogue.secretAreaProgress(true);
		const permanentEventStoreProgress = catalogue.permanentEventStoreProgress(true);
		const nestingWorkshopProgress = catalogue.nestingWorkshopProgress(true);
		const now = skyNow();
		const currentSeason = skyCurrentSeason(now);
		const events = skyCurrentEvents(now);
		const currentTravellingSpirit = resolveTravellingSpirit(now);
		const currentReturningSpirits = resolveReturningSpirits(now);

		const currentSeasonButton: APIButtonComponentWithCustomId = {
			type: ComponentType.Button,
			custom_id: currentSeason
				? `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${currentSeason.id}`
				: // This would not happen, but it's here to satisfy the API.
					CATALOGUE_VIEW_SEASONS_CUSTOM_ID,
			disabled: !currentSeason,
			label: "Current Season",
			style: currentSeason ? ButtonStyle.Success : ButtonStyle.Secondary,
		};

		if (currentSeason) {
			currentSeasonButton.emoji = SeasonIdToSeasonalEmoji[currentSeason.id];
		}

		const currentEventButtons: APIButtonComponentWithCustomId[] =
			events.size === 0
				? [
						{
							type: ComponentType.Button,
							// This would not happen, but it's here to satisfy the API.
							custom_id: CATALOGUE_VIEW_EVENT_CUSTOM_ID,
							disabled: true,
							style: ButtonStyle.Secondary,
						},
					]
				: events.reduce<APIButtonComponentWithCustomId[]>((buttons, event) => {
						const button: APIButtonComponentWithCustomId = {
							type: ComponentType.Button,
							custom_id: `${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${event.id}`,
							style: ButtonStyle.Success,
						};

						const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

						if (eventTicketEmoji) {
							button.emoji = eventTicketEmoji;
						} else {
							button.label = t(`events.${event.id}`, { lng: interaction.locale, ns: "general" });
						}

						buttons.push(button);
						return buttons;
					}, []);

		if (currentEventButtons.length === 1) {
			currentEventButtons[0]!.label = "Current Event";
		}

		const currentTravellingSpiritButton: APIButtonComponentWithCustomId = {
			type: ComponentType.Button,
			custom_id: currentTravellingSpirit
				? `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${currentTravellingSpirit.id}`
				: // This would not happen, but it's here to satisfy the API.
					`${CATALOGUE_VIEW_START_CUSTOM_ID}-travelling`,

			disabled: !currentTravellingSpirit,
			label: "Travelling Spirit",
			style: currentTravellingSpirit ? ButtonStyle.Success : ButtonStyle.Secondary,
		};

		if (currentTravellingSpirit) {
			currentTravellingSpiritButton.emoji =
				SeasonIdToSeasonalEmoji[currentTravellingSpirit.seasonId];
		}

		const currentReturningSpiritsButton: APIButtonComponentWithCustomId = {
			type: ComponentType.Button,
			custom_id: currentReturningSpirits
				? CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID
				: // This would not happen, but it's here to satisfy the API.
					`${CATALOGUE_VIEW_START_CUSTOM_ID}-returning`,
			disabled: !currentReturningSpirits,
			label: "Returning Spirits",
			style: currentReturningSpirits ? ButtonStyle.Success : ButtonStyle.Secondary,
		};

		if (
			currentReturningSpirits?.every(
				(returningSpirit) => returningSpirit.seasonId === currentReturningSpirits.first()!.seasonId,
			)
		) {
			currentReturningSpiritsButton.emoji =
				SeasonIdToSeasonalEmoji[currentReturningSpirits.first()!.seasonId];
		}

		const response: Parameters<InteractionsAPI["reply"]>[2] = {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: [
						{
							type: ComponentType.TextDisplay,
							content: "## Catalogue",
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.TextDisplay,
							content: `Welcome to your catalogue!\n\nHere, you can track all the cosmetics in the game, with dynamic calculations, such as remaining seasonal candles for an active season, making this a powerful tool to use.\n\nTotal Progress: ${catalogue.allProgress(true)}%`,
						},
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: CATALOGUE_VIEW_TYPE_CUSTOM_ID,
									max_values: 1,
									min_values: 0,
									options: [
										{
											label: `Standard Spirits${standardProgress === null ? "" : ` (${standardProgress}%)`}`,
											value: String(CatalogueType.StandardSpirits),
										},
										{
											label: `Elders${elderProgress === null ? "" : ` (${elderProgress}%)`}`,
											value: String(CatalogueType.Elders),
										},
										{
											label: `Seasons${seasonalProgress === null ? "" : ` (${seasonalProgress}%)`}`,
											value: String(CatalogueType.SeasonalSpirits),
										},
										{
											label: `Events${eventProgress === null ? "" : ` (${eventProgress}%)`}`,
											value: String(CatalogueType.Events),
										},
										{
											label: `Starter Packs${starterPackProgress === null ? "" : ` (${starterPackProgress}%)`}`,
											value: String(CatalogueType.StarterPacks),
										},
										{
											label: `Secret Area${secretAreaProgress === null ? "" : ` (${secretAreaProgress}%)`}`,
											value: String(CatalogueType.SecretArea),
										},
										{
											label: `Permanent Event Store${
												permanentEventStoreProgress === null
													? ""
													: ` (${permanentEventStoreProgress}%)`
											}`,
											value: String(CatalogueType.PermanentEventStore),
										},
										{
											label: `Nesting Workshop${
												nestingWorkshopProgress === null ? "" : ` (${nestingWorkshopProgress}%)`
											}`,
											value: String(CatalogueType.NestingWorkshop),
										},
									],
									placeholder: "What do you want to see?",
								},
							],
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.TextDisplay,
							content: "### Quick access",
						},
						{
							type: ComponentType.ActionRow,
							// Limit the potential current event buttons to 4 to not exceed the limit.
							components: [currentSeasonButton, ...currentEventButtons.slice(0, 4)],
						},
						{
							type: ComponentType.ActionRow,
							components: [currentTravellingSpiritButton, currentReturningSpiritsButton],
						},
					],
				},
			],
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		};

		if (isChatInputCommand(interaction)) {
			await client.api.interactions.reply(interaction.id, interaction.token, response);
		} else {
			await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
		}
	}

	public static async parseCatalogueType(interaction: APIMessageComponentSelectMenuInteraction) {
		switch (Number(interaction.data.values[0]) as CatalogueType) {
			case CatalogueType.StandardSpirits: {
				await this.viewRealms(interaction);
				return;
			}
			case CatalogueType.Elders: {
				await this.viewElders(interaction);
				return;
			}
			case CatalogueType.SeasonalSpirits: {
				await this.viewSeasons(interaction);
				return;
			}
			case CatalogueType.Events: {
				await this.viewEventYears(interaction);
				return;
			}
			case CatalogueType.StarterPacks: {
				await this.viewStarterPacks(interaction);
				return;
			}
			case CatalogueType.SecretArea: {
				await this.viewSecretArea(interaction);
				return;
			}
			case CatalogueType.PermanentEventStore: {
				await this.viewPermanentEventStore(interaction);
				return;
			}
			case CatalogueType.NestingWorkshop: {
				await this.viewNestingWorkshop(interaction);
			}
		}
	}

	public static async viewRealms(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const containerComponents: APIComponentInContainer[] = [
			{
				type: ComponentType.TextDisplay,
				content: "## Realms \n-# Catalogue",
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
		];

		for (const realm of REALMS) {
			const remainingCurrency = resolveCostToString(
				realm.spirits.reduce(
					(remainingCurrency, spirit) =>
						addCosts([remainingCurrency, catalogue.remainingCurrency(spirit.current)]),
					{},
				),
			);

			const percentage = catalogue.spiritProgress([...realm.spirits.values()], true);

			containerComponents.push({
				type: ComponentType.Section,
				accessory: {
					type: ComponentType.Button,
					style: ButtonStyle.Primary,
					custom_id: `${CATALOGUE_VIEW_REALM_CUSTOM_ID}§${realm.name}`,
					label: t("view", { lng: locale, ns: "general" }),
				},
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `### ${t(`realms.${realm.name}`, { lng: locale, ns: "general" })}${percentage === null ? "" : ` (${percentage}%)`}\n\n${
							remainingCurrency.length > 0
								? remainingCurrency.join("")
								: formatEmoji(MISCELLANEOUS_EMOJIS.Yes)
						}`,
					},
				],
			});
		}

		containerComponents.push(
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${CATALOGUE_SHARE_REALMS_KEY}`,
						emoji: { name: "🔗" },
						label: "Share progress",
						style: ButtonStyle.Secondary,
					},
				],
			},
			{
				type: ComponentType.TextDisplay,
				content: `-# ${CATALOGUE_STANDARD_PERCENTAGE_NOTE}`,
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

	public static async viewRealm(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
		realm: RealmName,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);
		const spirits = STANDARD_SPIRITS.filter((spirit) => spirit.realm === realm);
		const title = `## ${t(`realms.${realm}`, { lng: locale, ns: "general" })}\n-# Catalogue → Realms`;
		const percentageNote = `-# ${CATALOGUE_STANDARD_PERCENTAGE_NOTE}`;

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

		const { remainingCurrency, offerProgress, hasEverything } = catalogue.offerData({
			spirits: [...spirits.values()],
			locale,
			limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length - percentageNote.length,
			includePercentage: true,
			performRemainingCurrency: true,
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
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${realm}`,
						emoji: { name: "🔗" },
						label: "Share progress",
						style: ButtonStyle.Secondary,
					},
				],
			},
			{
				type: ComponentType.TextDisplay,
				content: percentageNote,
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
						custom_id: CATALOGUE_VIEW_REALMS_CUSTOM_ID,
						emoji: { name: "⏪" },
						label: "Back",
						style: ButtonStyle.Secondary,
					},

					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_REALM_EVERYTHING_CUSTOM_ID}§${realm}`,
						disabled: hasEverything,
						emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
						label: "I have everything!",
						style: ButtonStyle.Success,
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

	public static async viewElders(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);
		const title = "## Elders \n-# Catalogue";

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

		const { remainingCurrency, offerProgress, hasEverything } = catalogue.offerData({
			spirits: [...ELDER_SPIRITS.values()],
			locale,
			limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length,
			includePercentage: true,
			performRemainingCurrency: true,
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
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${CATALOGUE_SHARE_ELDER_KEY}`,
						emoji: { name: "🔗" },
						label: "Share progress",
						style: ButtonStyle.Secondary,
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
						custom_id: CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID,
						disabled: hasEverything,
						emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
						label: "I have everything!",
						style: ButtonStyle.Success,
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
		const heading = `## ${formatEmoji(SeasonIdToSeasonalEmoji[season.id])} [${t(`seasons.${season.id}`, { lng: locale, ns: "general" })}](${t(`season-wiki.${season.id}`, { lng: locale, ns: "general" })})\n-# Catalogue → Seasons`;

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
								content: heading,
							},
						],
					}
				: {
						type: ComponentType.TextDisplay,
						content: heading,
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
				limit: MAXIMUM_TEXT_DISPLAY_LENGTH - heading.length,
				includePercentage: true,
				performRemainingCurrency: true,
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
						custom_id: `${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${seasonId}`,
						disabled: offerProgress.spirits.size === 0,
						emoji: { name: "🔗" },
						label: "Share progress",
						style: ButtonStyle.Secondary,
					},
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

		const options = events.map((event) => {
			const { id } = event;
			const percentage = catalogue.eventProgress([event], true);

			const stringSelectMenuOption: APISelectMenuOption = {
				label: `${t(`events.${id}`, { lng: locale, ns: "general" })}${percentage === null ? "" : ` (${percentage}%)`}`,
				value: String(id),
			};

			const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

			if (eventTicketEmoji) {
				stringSelectMenuOption.emoji = eventTicketEmoji;
			}

			return stringSelectMenuOption;
		});

		const eventsYears = skyEventYears();
		const index = eventsYears.indexOf(year);
		const before = eventsYears[index - 1];
		const after = eventsYears[index + 1];
		const title = `## ${year}\n-# Catalogue → Events By Year`;

		const eventsText = catalogue.eventsText(
			events,
			locale,
			MAXIMUM_TEXT_DISPLAY_LENGTH - title.length,
		);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: [
						{
							type: ComponentType.TextDisplay,
							content: title,
						},
						{
							type: ComponentType.Separator,
							divider: true,
							spacing: SeparatorSpacingSize.Small,
						},
						{
							type: ComponentType.TextDisplay,
							content: eventsText ?? NO_EVENTS_WITH_OFFER_TEXT,
						},
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: CATALOGUE_VIEW_EVENT_CUSTOM_ID,
									max_values: 1,
									min_values: 0,
									options,
									placeholder: "Select an event!",
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
					],
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
			await Catalogue.viewCatalogue(interaction);
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
			performRemainingCurrency: true,
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
			performRemainingCurrency: false,
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

	private progress(offer: readonly Item[]) {
		const offerDescription = [];
		const owned = [];
		const unowned = [];

		for (const { name, cosmetics } of offer) {
			const emojis = cosmetics.map((cosmetic) => {
				const emoji = CosmeticToEmoji[cosmetic];
				return emoji ? formatEmoji(emoji) : name;
			});

			if (cosmetics.every((cosmetic) => this.data.has(cosmetic))) {
				owned.push(...emojis);
			} else {
				unowned.push(...emojis);
			}
		}

		if (owned.length > 0) {
			offerDescription.push(`${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} ${owned.join(" ")}`);
		}

		if (unowned.length > 0) {
			offerDescription.push(`${formatEmoji(MISCELLANEOUS_EMOJIS.No)} ${unowned.join(" ")}`);
		}

		const remainingCurrency = this.remainingCurrency(offer, true);
		const resolvedRemainingCurrency = resolveCostToString(remainingCurrency);

		if (resolvedRemainingCurrency.length > 0) {
			offerDescription.push(`${resolvedRemainingCurrency.join("")}`);
		}

		return { remainingCurrency, offerDescription };
	}

	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This is fine.
	private offerData({
		spirits = [],
		events = [],
		items = [],
		locale,
		limit,
		includePercentage,
		performRemainingCurrency,
	}: OfferDataOptions) {
		const offerProgress = {
			spirits: new Collection<SpiritIds, string>(),
			events: new Collection<EventIds, string>(),
		};

		let hasEverything = true;
		const remainingCurrencies = [];
		let remainingCurrency = null;

		for (const spirit of spirits) {
			const isSeasonalSpirit = spirit.isSeasonalSpirit();
			const seasonalParsing = isSeasonalSpirit && spirit.current.length === 0;
			const offer = seasonalParsing ? spirit.seasonal : spirit.current;

			if (offer.length === 0) {
				continue;
			}

			const { remainingCurrency, offerDescription } = this.progress(offer);

			if (performRemainingCurrency) {
				remainingCurrencies.push(remainingCurrency);
			}

			const percentage = this.spiritProgress([spirit], true);

			if (percentage !== null && percentage !== 100) {
				hasEverything = false;
			}

			offerProgress.spirits.set(
				spirit.id,
				`${
					performRemainingCurrency
						? `### ${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}${includePercentage ? (percentage === null ? "" : ` (${percentage}%)`) : ""}\n\n`
						: ""
				}${offerDescription.join("\n")}`,
			);
		}

		for (const event of events) {
			if (event.offer.length === 0) {
				continue;
			}

			const { remainingCurrency, offerDescription } = this.progress(event.offer);

			if (performRemainingCurrency) {
				remainingCurrencies.push(remainingCurrency);
			}

			const percentage = this.eventProgress([event], true);

			if (percentage !== null && percentage !== 100) {
				hasEverything = false;
			}

			offerProgress.events.set(
				event.id,
				`${
					performRemainingCurrency
						? `### ${t(`events.${event.id}`, { lng: locale, ns: "general" })}${includePercentage ? (percentage === null ? "" : ` (${percentage}%)`) : ""}\n\n${offerDescription.join("\n")}`
						: ""
				}${offerDescription.join("\n")}`,
			);
		}

		const { remainingCurrency: itemsRemainingCurrency, offerDescription: itemsOfferProgress } =
			this.progress(items);

		if (performRemainingCurrency) {
			remainingCurrencies.push(itemsRemainingCurrency);
		}

		const { owned, total } = this.ownedProgress(items);
		const itemsPercentage = this.progressPercentage(owned, total);

		if (itemsPercentage !== null && itemsPercentage !== 100) {
			hasEverything = false;
		}

		if (remainingCurrencies.length > 0) {
			const totalRemainingCurrency = resolveCostToString(addCosts(remainingCurrencies));

			if (totalRemainingCurrency.length > 0) {
				remainingCurrency = `### Remaining currency\n\n${totalRemainingCurrency.join("")}`;
			}
		}

		const itemsOfferProgressText =
			itemsOfferProgress.length > 0 ? `### Items\n\n${itemsOfferProgress.join("\n")}` : null;

		const computedLimit = remainingCurrency
			? limit - remainingCurrency.length - (itemsOfferProgressText?.length ?? 0)
			: limit;

		// If the text exceeds the limit, replace some emojis.
		// Only handles spirits and events for now.
		if (this.offerProgressTotalCharacters(offerProgress) > computedLimit) {
			outer: for (const { from, to } of CUSTOM_EMOJI_REPLACEMENTS) {
				for (const collection of [offerProgress.spirits, offerProgress.events]) {
					for (const [id, text] of collection) {
						collection.set(id, text.replaceAll(from, to));

						if (this.offerProgressTotalCharacters(offerProgress) <= computedLimit) {
							break outer;
						}
					}
				}
			}
		}

		return {
			remainingCurrency,
			offerProgress,
			itemsOfferProgress: itemsOfferProgressText,
			hasEverything,
		};
	}

	private offerProgressTotalCharacters(offerProgress: {
		spirits: Collection<SpiritIds, string>;
		events: Collection<EventIds, string>;
	}) {
		return (
			offerProgress.spirits.reduce((total, text) => total + text.length, 0) +
			offerProgress.events.reduce((total, text) => total + text.length, 0)
		);
	}

	private eventsText(events: ReadonlyCollection<EventIds, Event>, locale: Locale, limit: number) {
		let offers = events
			.reduce<string[]>((eventField, event) => {
				if (event.offer.length === 0) {
					return eventField;
				}

				const { offerDescription } = this.progress(event.offer);

				eventField.push(
					`__${t(`events.${event.id}`, { lng: locale, ns: "general" })}__\n${offerDescription.join("\n")}`,
				);

				return eventField;
			}, [])
			.join("\n\n");

		if (offers.length > 0) {
			// If the resulting description exceeds the limit, replace some emojis.
			for (const { from, to } of CUSTOM_EMOJI_REPLACEMENTS) {
				if (offers.length <= limit) {
					break;
				}

				offers = offers.replaceAll(from, to);
			}

			return offers;
		}

		return null;
	}

	private async sharePayload(
		type: string,
		invoker: APIUser,
		locale: Locale,
		send: boolean,
	): Promise<{ components: [APIMessageTopLevelComponent]; backButtonCustomId: string }> {
		let backButtonCustomId: string | undefined;
		let backButtonEmoji: APIMessageComponentEmoji | undefined;
		let content: string | null = null;
		let title: string | null = null;

		if (type === CATALOGUE_SHARE_REALMS_KEY) {
			backButtonCustomId = CATALOGUE_VIEW_REALMS_CUSTOM_ID;

			content = REALMS.map((realm) => {
				const remainingCurrency = resolveCostToString(
					realm.spirits.reduce(
						(remainingCurrency, spirit) =>
							addCosts([remainingCurrency, this.remainingCurrency(spirit.current)]),
						{},
					),
				);

				return `__${t(`realms.${realm.name}`, { lng: locale, ns: "general" })}__\n${
					remainingCurrency.length > 0
						? remainingCurrency.join("")
						: formatEmoji(MISCELLANEOUS_EMOJIS.Yes)
				}`;
			}).join("\n\n");

			title = "Realms Progress";
		} else if (isRealm(type)) {
			backButtonCustomId = `${CATALOGUE_VIEW_REALM_CUSTOM_ID}§${type}`;
			title = `${type} Progress`;

			content = this.offerData({
				spirits: [...STANDARD_SPIRITS.filter((spirit) => spirit.realm === type).values()],
				locale,
				// Take 100 away too for good measure.
				limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length - 100,
				includePercentage: false,
				performRemainingCurrency: false,
			});
		} else if (isSeasonId(Number(type))) {
			const seasonId = Number(type) as SeasonIds;
			const emoji = SeasonIdToSeasonalEmoji[seasonId];
			backButtonCustomId = `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${type}`;
			backButtonEmoji = emoji;
			title = `${formatEmoji(emoji)} ${t(`seasons.${type}`, { lng: locale, ns: "general" })} Progress`;
			const season = skySeasons().get(seasonId)!;

			content = this.offerData({
				spirits: [season.guide, ...season.spirits.values()],
				items: season.items,
				locale,
				// Take 100 away too for good measure.
				limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length - 100,
				includePercentage: false,
				performRemainingCurrency: false,
			});
		} else if (type === CATALOGUE_SHARE_ELDER_KEY) {
			backButtonCustomId = CATALOGUE_VIEW_ELDERS_CUSTOM_ID;

			content = this.offerData({
				spirits: [...ELDER_SPIRITS.values()],
				locale,
				limit: MAXIMUM_TEXT_DISPLAY_LENGTH,
				includePercentage: false,
				performRemainingCurrency: false,
			});

			title = "Elders Progress";
		}

		if (!(title && content && backButtonCustomId)) {
			throw new Error("Failed to parse spirits from a catalogue share prompt.");
		}

		const backButton: APIButtonComponentWithCustomId = {
			type: ComponentType.Button,
			custom_id: backButtonCustomId,
			label: "Back",
			style: ButtonStyle.Secondary,
		};

		if (backButtonEmoji) {
			backButton.emoji = backButtonEmoji;
		}

		const profile = await Profile.fetch(this.userId).catch(() => null);

		const containerComponents: APIComponentInContainer[] = [
			{
				type: ComponentType.TextDisplay,
				content: `## ${title}`,
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
		];

		if (!send) {
			containerComponents.push(
				{
					type: ComponentType.TextDisplay,
					content: "This will share your progress in this channel. Is this okay?",
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
			);
		}

		containerComponents.push(
			profile?.iconURL
				? {
						type: ComponentType.Section,
						accessory: {
							type: ComponentType.Thumbnail,
							media: { url: profile.iconURL },
						},
						components: [
							{
								type: ComponentType.TextDisplay,
								content: `### ${profile.name}\n${content}`,
							},
						],
					}
				: {
						type: ComponentType.TextDisplay,
						content: `### ${invoker.username}\n${content}`,
					},
		);

		if (!send) {
			containerComponents.push(
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.ActionRow,
					components: [
						backButton,
						{
							type: ComponentType.Button,
							custom_id: `${CATALOGUE_SHARE_SEND_CUSTOM_ID}§${type}`,
							emoji: { name: "🔗" },
							label: "Send",
							style: ButtonStyle.Success,
							disabled: send,
						},
					],
				},
			);
		}

		return {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: containerComponents,
				},
			],
			backButtonCustomId,
		};
	}

	public static async sharePrompt(interaction: APIMessageComponentButtonInteraction) {
		const { channel, locale } = interaction;
		const invoker = interactionInvoker(interaction);

		// Sharing in direct messages is pointless.
		if (channel.type === ChannelType.DM) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content:
					"[You & I](https://youtu.be/_kqQDCxRCzM) are the only ones around here. Try sharing in a server!",
				flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
			});

			return;
		}

		if (channel.type === ChannelType.GroupDM) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content:
					"I cannot share in group direct messages as I am not here. Try sharing in a server!",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const guild = interaction.guild_id && GUILD_CACHE.get(interaction.guild_id);

		if (!guild) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "I must be added to this server to share. Try sharing in a server!",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		if (channel.type === ChannelType.PrivateThread && channel.thread_metadata?.locked) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "This thread is locked.",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		if (
			await cannotUsePermissions(
				interaction,
				PermissionFlagsBits.ViewChannel |
					(channel.type === ChannelType.PublicThread ||
					channel.type === ChannelType.PrivateThread ||
					channel.type === ChannelType.AnnouncementThread
						? PermissionFlagsBits.SendMessagesInThreads
						: PermissionFlagsBits.SendMessages) |
					PermissionFlagsBits.EmbedLinks,
			)
		) {
			return;
		}

		const customId = interaction.data.custom_id;
		const type = customId.slice(customId.indexOf("§") + 1);
		const catalogue = await this.fetch(invoker.id);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: (await catalogue.sharePayload(type, invoker, locale, false)).components,
		});
	}

	public static async shareSend(
		interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
	) {
		const { channel } = interaction;

		if (
			await cannotUsePermissions(
				interaction,
				PermissionFlagsBits.ViewChannel |
					(channel.type === ChannelType.PublicThread ||
					channel.type === ChannelType.PrivateThread ||
					channel.type === ChannelType.AnnouncementThread
						? PermissionFlagsBits.SendMessagesInThreads
						: PermissionFlagsBits.SendMessages) |
					PermissionFlagsBits.EmbedLinks,
			)
		) {
			return;
		}

		const customId = interaction.data.custom_id;
		const type = customId.slice(customId.indexOf("§") + 1);
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const { components, backButtonCustomId } = await catalogue.sharePayload(
			type,
			invoker,
			interaction.locale,
			true,
		);

		await client.api.channels.createMessage(channel.id, {
			components,
			flags: MessageFlags.IsComponentsV2,
		});

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.Container,
					accent_color: DEFAULT_EMBED_COLOUR,
					components: [
						{
							type: ComponentType.TextDisplay,
							content: "Progress shared!",
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
									custom_id: backButtonCustomId,
									label: "Back",
									style: ButtonStyle.Primary,
								},
							],
						},
					],
				},
			],
		});
	}

	private remainingCurrency(items: readonly Item[], includeSeasonalCurrency?: boolean) {
		const result = addCosts(
			items
				.filter(({ cosmetics }) => cosmetics.some((cosmetic) => !this.data.has(cosmetic)))
				.map((item) => item.cost)
				.filter((cost) => cost !== null),
		);

		if (!includeSeasonalCurrency) {
			for (const seasonalCandle of result.seasonalCandles) {
				seasonalCandle.cost = 0;
			}

			for (const seasonalHeart of result.seasonalHearts) {
				seasonalHeart.cost = 0;
			}
		}

		return result;
	}
}
