import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import {
	type APIActionRowComponent,
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIEmbed,
	type APIEmbedAuthor,
	type APIGuildInteractionWrapper,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentEmoji,
	type APIMessageComponentSelectMenuInteraction,
	type APISelectMenuComponent,
	type APISelectMenuOption,
	type APIStringSelectComponent,
	ButtonStyle,
	ChannelType,
	ComponentType,
	type InteractionsAPI,
	type Locale,
	MessageFlags,
	PermissionFlagsBits,
	type Snowflake,
} from "@discordjs/core";
import {
	ELDER_SPIRITS,
	type ElderSpirit,
	type GuideSpirit,
	type Item,
	type ItemCost,
	REALMS,
	REALM_SPIRITS,
	type RealmName,
	STANDARD_SPIRITS,
	SeasonId,
	type SeasonIds,
	type SeasonalSpirit,
	type SpiritIds,
	type StandardSpirit,
	addCosts,
	formatEmoji,
	isSeasonId,
	isSpiritId,
	resolveAllCosmetics,
	skyNow,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { GUILD_CACHE } from "../caches/guilds.js";
import { skyCurrentEvents, skyEventYears, skyEvents } from "../data/events/index.js";
import { NESTING_WORKSHOP } from "../data/nesting-workshop.js";
import { PERMANENT_EVENT_STORE } from "../data/permanent-event-store.js";
import { SECRET_AREA } from "../data/secret-area.js";
import { spirits } from "../data/spirits/index.js";
import {
	resolveReturningSpirits,
	resolveTravellingSpirit,
	skyCurrentSeason,
	skySeasons,
} from "../data/spirits/seasons/index.js";
import { STARTER_PACKS } from "../data/starter-packs.js";
import { client } from "../discord.js";
import type { Event } from "../models/Event.js";
import type { Season } from "../models/Season.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	CatalogueType,
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
	NO_EVENT_INFOGRAPHIC_YET,
	NO_EVENT_OFFER_TEXT,
	NO_FRIENDSHIP_TREE_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	SeasonIdToSeasonalEmoji,
	resolveCostToString,
} from "../utility/catalogue.js";
import { DEFAULT_EMBED_COLOUR, ERROR_RESPONSE } from "../utility/constants.js";
import { CosmeticToEmoji, MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import {
	interactedComponent,
	interactionInvoker,
	isButton,
	isChatInputCommand,
	isRealm,
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

function backToStartButton(disabled = false): APIButtonComponentWithCustomId {
	return {
		type: ComponentType.Button,
		// This custom id must differ to avoid duplicate custom ids.
		custom_id: CATALOGUE_BACK_TO_START_CUSTOM_ID,
		disabled,
		emoji: { name: "⏮️" },
		label: "Start",
		style: ButtonStyle.Primary,
	};
}

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

	private progressPercentage(owned: number[], total: number, round?: boolean) {
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

	private seasonOwnedProgress(seasons: Season[]) {
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

	public seasonProgress(seasons: Season[], round?: boolean) {
		const { owned, total } = this.seasonOwnedProgress(seasons);
		return this.progressPercentage(owned, total, round);
	}

	private eventOwnedProgress(events: Event[]) {
		const totalOwned = [];
		let total = 0;

		for (const event of events) {
			const { owned, total: offerTotal } = this.ownedProgress(event.offer);

			totalOwned.push(...owned);
			total += offerTotal;
		}

		return { owned: totalOwned, total };
	}

	public eventProgress(events: Event[], round?: boolean) {
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
		const eventOwnedProgress = this.eventOwnedProgress(skyEvents());
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
		const eventProgress = catalogue.eventProgress(skyEvents(), true);
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
			currentSeasonButton.emoji = currentSeason.emoji;
		}

		const currentEventButtons: APIButtonComponentWithCustomId[] =
			events.length === 0
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

						if (event.eventTickets?.emoji) {
							button.emoji = event.eventTickets.emoji;
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
			content: "",
			components: [
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
										permanentEventStoreProgress === null ? "" : ` (${permanentEventStoreProgress}%)`
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
					type: ComponentType.ActionRow,
					components: [backToStartButton(true)],
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
			embeds: [
				{
					color: DEFAULT_EMBED_COLOUR,
					description:
						"Welcome to your catalogue!\n\nHere, you can track all the cosmetics in the game, with dynamic calculations, such as remaining seasonal candles for an active season, making this a powerful tool to use.",
					fields: [
						{
							name: "Total Progress",
							value: `${catalogue.allProgress(true)}%`,
						},
					],
					title: "Catalogue",
				},
			],
			flags: MessageFlags.Ephemeral,
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
		const embed = catalogue.realmsEmbed(locale);
		embed.footer = { text: CATALOGUE_STANDARD_PERCENTAGE_NOTE };
		embed.title = "Realms";

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "",
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.StringSelect,
							custom_id: CATALOGUE_VIEW_REALM_CUSTOM_ID,
							max_values: 1,
							min_values: 0,
							options: REALMS.map((realm) => {
								const { name } = realm;
								const percentage = catalogue.spiritProgress([...realm.spirits.values()], true);

								return {
									label: `${t(`realms.${name}`, { lng: locale, ns: "general" })}${
										percentage === null ? "" : ` (${percentage}%)`
									}`,
									value: name,
								};
							}),
							placeholder: "Select a realm!",
						},
					],
				},
				{
					type: ComponentType.ActionRow,
					components: [
						backToStartButton(),
						{
							type: ComponentType.Button,
							custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
							emoji: { name: "⏪" },
							label: "Back",
							style: ButtonStyle.Primary,
						},
						{
							type: ComponentType.Button,
							custom_id: `${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${CATALOGUE_SHARE_REALMS_KEY}`,
							emoji: { name: "🔗" },
							label: "Share",
							style: ButtonStyle.Primary,
						},
					],
				},
			],
			embeds: [embed],
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
		let hasEverything = true;

		const options = spirits.map((spirit) => {
			const percentage = catalogue.spiritProgress([spirit], true);

			if (percentage !== null && percentage !== 100) {
				hasEverything = false;
			}

			return {
				label: `${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}${percentage === null ? "" : ` (${percentage}%)`}`,
				value: String(spirit.id),
			};
		});

		const embed = catalogue.spiritEmbed([...spirits.values()], locale);
		embed.footer = { text: CATALOGUE_STANDARD_PERCENTAGE_NOTE };
		embed.title = t(`realms.${realm}`, { lng: locale, ns: "general" });

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "",
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.StringSelect,
							custom_id: CATALOGUE_VIEW_SPIRIT_CUSTOM_ID,
							max_values: 1,
							min_values: 0,
							options,
							placeholder: "Select a spirit!",
						},
					],
				},
				{
					type: ComponentType.ActionRow,
					components: [
						backToStartButton(),
						{
							type: ComponentType.Button,
							custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
							emoji: { name: "⏪" },
							label: "Back",
							style: ButtonStyle.Primary,
						},
						{
							type: ComponentType.Button,
							custom_id: `${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${realm}`,
							emoji: { name: "🔗" },
							label: "Share",
							style: ButtonStyle.Primary,
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
			],
			embeds: [embed],
		});
	}

	public static async viewElders(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);
		let hasEverything = true;

		const options = ELDER_SPIRITS.map((spirit) => {
			const percentage = catalogue.spiritProgress([spirit], true);

			if (percentage !== null && percentage !== 100) {
				hasEverything = false;
			}

			return {
				label: `${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}${
					percentage === null ? "" : ` (${percentage}%)`
				}`,
				value: String(spirit.id),
			};
		});

		const embed = catalogue.spiritEmbed([...ELDER_SPIRITS.values()], locale);
		embed.title = "Elders";

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "",
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.StringSelect,
							custom_id: CATALOGUE_VIEW_SPIRIT_CUSTOM_ID,
							max_values: 1,
							min_values: 0,
							options,
							placeholder: "Select an elder!",
						},
					],
				},
				{
					type: ComponentType.ActionRow,
					components: [
						backToStartButton(),
						{
							type: ComponentType.Button,
							custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
							emoji: { name: "⏪" },
							label: "Back",
							style: ButtonStyle.Primary,
						},
						{
							type: ComponentType.Button,
							custom_id: `${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${CATALOGUE_SHARE_ELDER_KEY}`,
							emoji: { name: "🔗" },
							label: "Share",
							style: ButtonStyle.Primary,
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
			],
			embeds: [embed],
		});
	}

	public static async viewSeasons(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "",
			components: [
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
					type: ComponentType.ActionRow,
					components: [
						backToStartButton(),
						{
							type: ComponentType.Button,
							custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
							emoji: { name: "⏪" },
							label: "Back",
							style: ButtonStyle.Primary,
						},
					],
				},
			],
			embeds: [],
		});
	}

	public static async viewSeason(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
		seasonId: SeasonIds,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const seasons = skySeasons();
		const season = seasons.find(({ id }) => id === seasonId);

		if (!season) {
			pino.error(interaction, "Failed to view a season.");

			await client.api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				ERROR_RESPONSE,
			);

			return;
		}

		const catalogue = await this.fetch(invoker.id);
		const spirits = [season.guide, ...season.spirits.values()];

		const options = spirits.map((spirit) => {
			const { id } = spirit;
			const percentage = catalogue.spiritProgress([spirit], true);

			return {
				label: `${t(`spirits.${id}`, { lng: locale, ns: "general" })}${
					percentage === null ? "" : ` (${percentage}%)`
				}`,
				value: String(id),
			};
		});

		const components: APIActionRowComponent<
			APIButtonComponentWithCustomId | APISelectMenuComponent
		>[] = [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: CATALOGUE_VIEW_SPIRIT_CUSTOM_ID,
						max_values: 1,
						min_values: 0,
						options,
						placeholder:
							seasonId === SeasonId.Shattering
								? "Select an entity!"
								: seasonId === SeasonId.Revival
									? "Select a spirit or a shop!"
									: seasonId === SeasonId.Nesting
										? "Select a spirit or an entity!"
										: "Select a spirit!",
					},
				],
			},
		];

		if (season.items.length > 0) {
			const itemsOptions = season.items.map(({ name, cosmetics }) => {
				const stringSelectMenuOption: APISelectMenuOption = {
					default: cosmetics.every((cosmetic) => catalogue.data.has(cosmetic)),
					label: name,
					value: JSON.stringify(cosmetics),
				};

				const emoji = CosmeticToEmoji[cosmetics[0]];

				if (emoji) {
					stringSelectMenuOption.emoji = emoji;
				}

				return stringSelectMenuOption;
			});

			components.push({
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

		components.push(
			{
				type: ComponentType.ActionRow,
				components: [
					backToStartButton(),
					{
						type: ComponentType.Button,
						custom_id: CATALOGUE_VIEW_SEASONS_CUSTOM_ID,
						emoji: { name: "⏪" },
						label: "Back",
						style: ButtonStyle.Primary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${seasonId}`,
						emoji: { name: "🔗" },
						label: "Share",
						style: ButtonStyle.Primary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID}§${seasonId}`,
						disabled: catalogue.seasonProgress([season]) === 100,
						emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
						label: "I have everything!",
						style: ButtonStyle.Success,
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${before?.id}`,
						disabled: !before,
						emoji: { name: "⬅️" },
						label: "Previous season",
						style: ButtonStyle.Primary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${after?.id}`,
						disabled: !after,
						emoji: { name: "➡️" },
						label: "Next season",
						style: ButtonStyle.Primary,
					},
				],
			},
		);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "",
			components,
			embeds: [catalogue.seasonEmbed(season, locale)],
		});
	}

	public static async viewEventYears(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "",
			components: [
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
									skyEvents().filter((event) => event.start.year === year),
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
					type: ComponentType.ActionRow,
					components: [
						backToStartButton(),
						{
							type: ComponentType.Button,
							custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
							emoji: { name: "⏪" },
							label: "Back",
							style: ButtonStyle.Primary,
						},
					],
				},
			],
			embeds: [
				{
					color: DEFAULT_EMBED_COLOUR,
					description: "Events are grouped by year.",
					title: "Events By Year",
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

			if (event.eventTickets?.emoji) {
				stringSelectMenuOption.emoji = event.eventTickets.emoji;
			}

			return stringSelectMenuOption;
		});

		const embed: APIEmbed = { color: DEFAULT_EMBED_COLOUR, title: `Events ${year}` };
		const fields = [];

		for (const event of events) {
			if (event.offer.length === 0) {
				continue;
			}

			const { offerDescription } = catalogue.embedProgress(event.offer);

			fields.push({
				name: t(`events.${event.id}`, { lng: locale, ns: "general" }),
				value: offerDescription.join("\n"),
				inline: true,
			});
		}

		embed.fields = fields;
		const eventsYears = skyEventYears();
		const index = eventsYears.indexOf(year);
		const before = eventsYears[index - 1];
		const after = eventsYears[index + 1];

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "",
			components: [
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
					type: ComponentType.ActionRow,
					components: [
						backToStartButton(),
						{
							type: ComponentType.Button,
							custom_id: CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID,
							emoji: { name: "⏪" },
							label: "Back",
							style: ButtonStyle.Primary,
						},
					],
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
							style: ButtonStyle.Primary,
						},
						{
							type: ComponentType.Button,
							custom_id: `${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${after}`,
							disabled: !after,
							emoji: { name: "➡️" },
							label: "Next year",
							style: ButtonStyle.Primary,
						},
					],
				},
			],
			embeds: [embed],
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

		const options = spirits.map((spirit) => {
			const { id } = spirit;
			const percentage = catalogue.spiritProgress([spirit], true);

			return {
				emoji: SeasonIdToSeasonalEmoji[spirit.seasonId],
				label: `${t(`spirits.${id}`, { lng: locale, ns: "general" })}${
					percentage === null ? "" : ` (${percentage}%)`
				}`,
				value: String(id),
			};
		});

		const embed = catalogue.spiritEmbed([...spirits.values()], locale);
		embed.title = "Returning Spirits";

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "",
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.StringSelect,
							custom_id: CATALOGUE_VIEW_SPIRIT_CUSTOM_ID,
							max_values: 1,
							min_values: 0,
							options,
							placeholder: "Select a spirit!",
						},
					],
				},
				{
					type: ComponentType.ActionRow,
					components: [backToStartButton()],
				},
			],
			embeds: [embed],
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

		if (!isSpiritId(spiritId)) {
			pino.error(interaction, `Invalid spirit id: ${spiritId}`);

			await client.api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				ERROR_RESPONSE,
			);

			return;
		}

		const spirit = spirits().get(spiritId);

		if (!spirit) {
			await client.api.interactions.updateMessage(interaction.id, interaction.token, {
				content: "Woah, it seems we have not encountered that spirit yet. How strange!",
				components: [],
				embeds: [],
			});

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
		const embed = this.spiritEmbed([spirit], locale);
		embed.title = t(`spirits.${spirit.id}`, { lng: locale, ns: "general" });
		embed.url = t(`spirit-wiki.${spirit.id}`, { lng: locale, ns: "general" });
		const description = embed.description ? [embed.description] : [];

		if (imageURL) {
			embed.image = { url: imageURL };
		} else {
			description.push(offer.length > 0 ? NO_FRIENDSHIP_TREE_YET_TEXT : NO_FRIENDSHIP_TREE_TEXT);
		}

		embed.description = description.join("\n");

		if (isGuideSpirit && spirit.inProgress) {
			embed.footer = { text: GUIDE_SPIRIT_IN_PROGRESS_TEXT };
		}

		const components: APIActionRowComponent<
			APIButtonComponentWithCustomId | APISelectMenuComponent
		>[] = [];

		const row1Components: APIButtonComponentWithCustomId[] = [
			backToStartButton(),
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
				style: ButtonStyle.Primary,
			},
		];

		if (offer.length > 0) {
			row1Components.push({
				type: ComponentType.Button,
				custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§spirit:${spirit.id}`,
				disabled: this.spiritProgress([spirit]) === 100,
				emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
				label: "I have everything!",
				style: ButtonStyle.Success,
			});

			const itemSelectionOptions = offer.map(({ name, cosmetics }) => {
				const stringSelectMenuOption: APISelectMenuOption = {
					default: cosmetics.every((cosmetic) => this.data.has(cosmetic)),
					label: name,
					value: JSON.stringify(cosmetics),
				};

				const emoji = CosmeticToEmoji[cosmetics[0]];

				if (emoji) {
					stringSelectMenuOption.emoji = emoji;
				}

				return stringSelectMenuOption;
			});

			const itemSelectionOptionsMaximumLimit = itemSelectionOptions.slice(
				0,
				CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
			);

			const itemSelection: APIActionRowComponent<APISelectMenuComponent>[] = [
				{
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
				},
			];

			components.push(...itemSelection);

			if (itemSelectionOptions.length > CATALOGUE_MAXIMUM_OPTIONS_LIMIT) {
				const itemSelectionOverflowOptionsMaximumLimit = itemSelectionOptions.slice(
					CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
				);

				components.push({
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

		components.push({ type: ComponentType.ActionRow, components: row1Components });

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
			const season = skySeasons().find(({ id }) => id === spirit.seasonId);

			if (season) {
				spirits = new Collection<SpiritIds, SeasonalSpirit | GuideSpirit>()
					.set(season.guide.id, season.guide)
					.concat(season.spirits);
			}
		}

		if (spirits) {
			const before = spirits.get((spirit.id - 1) as SpiritIds);
			const after = spirits.get((spirit.id + 1) as SpiritIds);

			components.push({
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${before?.id}`,
						disabled: !before,
						emoji: { name: "⬅️" },
						label: "Previous spirit",
						style: ButtonStyle.Primary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${after?.id}`,
						disabled: !after,
						emoji: { name: "➡️" },
						label: "Next spirit",
						style: ButtonStyle.Primary,
					},
				],
			});
		}

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components,
			content: "",
			embeds: [embed],
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

		const event = skyEvents().find(({ id }) => id === eventId);

		if (!event) {
			await client.api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				ERROR_RESPONSE,
			);

			pino.error(interaction, "Could not parse an event for the catalogue.");
			return;
		}

		await catalogue.viewEvent(interaction, event);
	}

	private async viewEvent(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
		event: Event,
	) {
		const { locale } = interaction;
		const { id, start, eventTickets, offer, offerInfographicURL } = event;

		const embed: APIEmbed = {
			color: DEFAULT_EMBED_COLOUR,
			title: `${eventTickets?.emoji ? formatEmoji(eventTickets.emoji) : ""}${t(`events.${id}`, {
				lng: locale,
				ns: "general",
			})}`,
			url: t(`event-wiki.${id}`, { lng: locale, ns: "general" }),
		};

		const description = [];

		if (event.patchNotesURL) {
			description.push(`-# [Patch Notes](${event.patchNotesURL})`);
		}

		if (offer.length > 0) {
			const { offerDescription } = this.embedProgress(offer);
			description.push(offerDescription.join("\n"));
		}

		if (offerInfographicURL) {
			embed.image = { url: offerInfographicURL };
		} else {
			description.push(offer.length > 0 ? NO_EVENT_INFOGRAPHIC_YET : NO_EVENT_OFFER_TEXT);
		}

		if (description.length > 0) {
			embed.description = description.join("\n");
		}

		const components: APIActionRowComponent<
			APIButtonComponentWithCustomId | APISelectMenuComponent
		>[] = [];

		const row1Components: APIButtonComponentWithCustomId[] = [
			backToStartButton(),
			{
				type: ComponentType.Button,
				custom_id: `${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${start.year}`,
				emoji: { name: "⏪" },
				label: "Back",
				style: ButtonStyle.Primary,
			},
		];

		if (offer.length > 0) {
			row1Components.push({
				type: ComponentType.Button,
				custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§event:${id}`,
				disabled: this.eventProgress([event]) === 100,
				emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
				label: "I have everything!",
				style: ButtonStyle.Success,
			});

			const itemSelectionOptions = offer.map(({ name, cosmetics }) => {
				const stringSelectMenuOption: APISelectMenuOption = {
					default: cosmetics.every((cosmetic) => this.data.has(cosmetic)),
					label: name,
					value: JSON.stringify(cosmetics),
				};

				const emoji = CosmeticToEmoji[cosmetics[0]];

				if (emoji) {
					stringSelectMenuOption.emoji = emoji;
				}

				return stringSelectMenuOption;
			});

			components.push({
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

		components.push({ type: ComponentType.ActionRow, components: row1Components });
		const events = skyEvents().filter((event) => event.start.year === start.year);
		const index = events.findIndex((event) => event.id === id);
		const before = events[index - 1];
		const after = events[index + 1];

		// It is possible that for the first event of a year, the custom ids will be the same, leading to an error.
		// We use the nullish coalescing operator to fallback to some default values to mitigate this.
		components.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${before?.id ?? "before"}`,
					disabled: !before,
					emoji: { name: "⬅️" },
					label: "Previous event",
					style: ButtonStyle.Primary,
				},
				{
					type: ComponentType.Button,
					custom_id: `${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${after?.id ?? "after"}`,
					disabled: !after,
					emoji: { name: "➡️" },
					label: "Next event",
					style: ButtonStyle.Primary,
				},
			],
		});

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components,
			content: "",
			embeds: [embed],
		});
	}

	private static async viewStarterPacks(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const itemSelectionOptions = STARTER_PACKS.items.map(({ name, cosmetics }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue.data.has(cosmetic)),
				label: name,
				value: JSON.stringify(cosmetics),
			};

			const emoji = CosmeticToEmoji[cosmetics[0]];

			if (emoji) {
				stringSelectMenuOption.emoji = emoji;
			}

			return stringSelectMenuOption;
		});

		const { offerDescription } = catalogue.embedProgress(STARTER_PACKS.items);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
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
					type: ComponentType.ActionRow,
					components: [
						backToStartButton(),
						{
							type: ComponentType.Button,
							custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
							emoji: { name: "⏪" },
							label: "Back",
							style: ButtonStyle.Primary,
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
			content: "",
			embeds: [
				{
					color: DEFAULT_EMBED_COLOUR,
					description: offerDescription.join("\n"),
					title: "Starter Packs",
				},
			],
		});
	}

	private static async viewSecretArea(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const itemSelectionOptions = SECRET_AREA.items.map(({ name, cosmetics }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue.data.has(cosmetic)),
				label: name,
				value: JSON.stringify(cosmetics),
			};

			const emoji = CosmeticToEmoji[cosmetics[0]];

			if (emoji) {
				stringSelectMenuOption.emoji = emoji;
			}

			return stringSelectMenuOption;
		});

		const { offerDescription } = catalogue.embedProgress(SECRET_AREA.items);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
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
					type: ComponentType.ActionRow,
					components: [
						backToStartButton(),
						{
							type: ComponentType.Button,
							custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
							emoji: { name: "⏪" },
							label: "Back",
							style: ButtonStyle.Primary,
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
			content: "",
			embeds: [
				{
					color: DEFAULT_EMBED_COLOUR,
					description: offerDescription.join("\n"),
					title: "Secret Area",
				},
			],
		});
	}

	private static async viewPermanentEventStore(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const itemSelectionOptions = PERMANENT_EVENT_STORE.items.map(({ name, cosmetics }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue.data.has(cosmetic)),
				label: name,
				value: JSON.stringify(cosmetics),
			};

			const emoji = CosmeticToEmoji[cosmetics[0]];

			if (emoji) {
				stringSelectMenuOption.emoji = emoji;
			}

			return stringSelectMenuOption;
		});

		const { offerDescription } = catalogue.embedProgress(PERMANENT_EVENT_STORE.items);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
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
					type: ComponentType.ActionRow,
					components: [
						backToStartButton(),
						{
							type: ComponentType.Button,
							custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
							emoji: { name: "⏪" },
							label: "Back",
							style: ButtonStyle.Primary,
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
			content: "",
			embeds: [
				{
					color: DEFAULT_EMBED_COLOUR,
					description: offerDescription.join("\n"),
					title: "Permanent Event Store",
				},
			],
		});
	}

	private static async viewNestingWorkshop(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const catalogue = await this.fetch(invoker.id);

		const itemSelectionOptions = NESTING_WORKSHOP.items.map(({ name, cosmetics }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue.data.has(cosmetic)),
				label: name,
				value: JSON.stringify(cosmetics),
			};

			const emoji = CosmeticToEmoji[cosmetics[0]];

			if (emoji) {
				stringSelectMenuOption.emoji = emoji;
			}

			return stringSelectMenuOption;
		});

		const itemSelectionOptions1 = itemSelectionOptions.slice(0, CATALOGUE_MAXIMUM_OPTIONS_LIMIT);

		const itemSelectionOptions2 = itemSelectionOptions.slice(
			CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
			CATALOGUE_MAXIMUM_OPTIONS_LIMIT * 2,
		);

		const itemSelectionOptions3 = itemSelectionOptions.slice(
			CATALOGUE_MAXIMUM_OPTIONS_LIMIT * 2,
			CATALOGUE_MAXIMUM_OPTIONS_LIMIT * 3,
		);

		const { offerDescription } = catalogue.embedProgress(NESTING_WORKSHOP.items);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
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
					type: ComponentType.ActionRow,
					components: [
						backToStartButton(),
						{
							type: ComponentType.Button,
							custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
							emoji: { name: "⏪" },
							label: "Back",
							style: ButtonStyle.Primary,
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
			content: "",
			embeds: [
				{
					color: DEFAULT_EMBED_COLOUR,
					description: offerDescription.join("\n"),
					title: "Nesting Workshop",
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
		const season = skySeasons().find((season) => season.id === parsedCustomId);

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
		const season = skySeasons().find((season) => season.id === parsedCustomId);

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

		const spirit = spirits().find(({ id }) => id === resolvedCustomIdForSpirits);

		const event =
			resolvedCustomIdNumberForEvents === null
				? null
				: skyEvents().find(({ id }) => id === resolvedCustomIdNumberForEvents);

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
						ERROR_RESPONSE,
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
			cosmetics = [...new Set([...this.data, ...allCosmetics])];
		} else {
			// Get the select menu where this interaction came from.
			const component = interactedComponent(interaction) as APIStringSelectComponent;

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

	private realmsEmbed(locale: Locale): APIEmbed {
		return {
			color: DEFAULT_EMBED_COLOUR,
			description: REALMS.map((realm) => {
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
			}).join("\n\n"),
		};
	}

	private embedProgress(offer: readonly Item[]) {
		const offerDescription = [];
		const owned = [];
		const unowned = [];

		for (const { name, cosmetics } of offer) {
			const emoji = CosmeticToEmoji[cosmetics[0]];
			const toPush = emoji ? formatEmoji(emoji) : name;

			if (cosmetics.every((cosmetic) => this.data.has(cosmetic))) {
				owned.push(toPush);
			} else {
				unowned.push(toPush);
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

	private seasonEmbed(season: Season, locale: Locale, share = false) {
		const description = [];
		const remainingCurrencies = [];
		const offerDescriptions = [];

		if (!share && season.patchNotesURL) {
			description.push(`-# [Patch Notes](${season.patchNotesURL})`);
		}

		const offers: [SpiritIds | `season:${SeasonIds}`, readonly Item[]][] = [
			[season.guide.id, season.guide.current],
			...season.spirits.map<[SpiritIds | `season:${SeasonIds}`, readonly Item[]]>((spirit) => [
				spirit.id,
				spirit.items,
			]),
			[`season:${season.id}`, season.items],
		];

		for (const [index, offer] of offers) {
			if (offer.length === 0) {
				continue;
			}

			const { remainingCurrency, offerDescription } = this.embedProgress(offer);
			remainingCurrencies.push(remainingCurrency);

			offerDescriptions.push(
				`__${
					typeof index === "number"
						? t(`spirits.${index}`, { lng: locale, ns: "general" })
						: "Items"
				}__\n${offerDescription.join("\n")}`,
			);
		}

		const totalRemainingCurrency = resolveCostToString(addCosts(remainingCurrencies));

		if (totalRemainingCurrency.length > 0) {
			description.push(`__Remaining Currency__\n${totalRemainingCurrency.join("")}`);
		}

		description.push(...offerDescriptions);

		const embed: APIEmbed = {
			color: DEFAULT_EMBED_COLOUR,
			title: `${formatEmoji(SeasonIdToSeasonalEmoji[season.id])} ${t(`seasons.${season.id}`, {
				lng: locale,
				ns: "general",
			})}`,
			url: t(`season-wiki.${season.id}`, { lng: locale, ns: "general" }),
		};

		if (description.length > 0) {
			let descriptionString = description.join("\n\n");

			// If the resulting description exceeds 4,096 characters, replace the yes and no emojis with Unicode variants.
			if (descriptionString.length > 4_096) {
				descriptionString = descriptionString
					.replaceAll(formatEmoji(MISCELLANEOUS_EMOJIS.Yes), "✅")
					.replaceAll(formatEmoji(MISCELLANEOUS_EMOJIS.No), "❌");
			}

			embed.description = descriptionString;
		}

		return embed;
	}

	private spiritEmbed(
		spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[],
		locale: Locale,
	) {
		const multiple = spirits.length > 1;
		const description = [];
		const remainingCurrencies = [];

		for (const spirit of spirits) {
			const isSeasonalSpirit = spirit.isSeasonalSpirit();
			const seasonalParsing = isSeasonalSpirit && spirit.current.length === 0;
			const offer = seasonalParsing ? spirit.seasonal : spirit.current;

			if (offer.length === 0) {
				continue;
			}

			const { remainingCurrency, offerDescription } = this.embedProgress(offer);
			remainingCurrencies.push(remainingCurrency);

			description.push(
				`${
					multiple ? `__${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}__\n` : ""
				}${offerDescription.join("\n")}`,
			);
		}

		if (multiple) {
			const totalRemainingCurrency = resolveCostToString(addCosts(remainingCurrencies));

			if (totalRemainingCurrency.length > 0) {
				description.unshift(`__Remaining Currency__\n${totalRemainingCurrency.join("")}`);
			}
		}

		const embed: APIEmbed = { color: DEFAULT_EMBED_COLOUR };

		if (description.length > 0) {
			let descriptionString = description.join("\n\n");

			// If the resulting description exceeds 4,096 characters, replace the yes and no emojis with Unicode variants.
			if (descriptionString.length > 4_096) {
				descriptionString = descriptionString
					.replaceAll(formatEmoji(MISCELLANEOUS_EMOJIS.Yes), "✅")
					.replaceAll(formatEmoji(MISCELLANEOUS_EMOJIS.No), "❌");
			}

			embed.description = descriptionString;
		}

		return embed;
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

		const catalogue = await this.fetch(invoker.id);
		const customId = interaction.data.custom_id;
		const type = customId.slice(customId.indexOf("§") + 1);

		let backButtonCustomId: string | undefined;
		let backButtonEmoji: APIMessageComponentEmoji | undefined;
		let embed: APIEmbed | undefined;

		if (type === CATALOGUE_SHARE_REALMS_KEY) {
			backButtonCustomId = CATALOGUE_VIEW_REALMS_CUSTOM_ID;
			embed = catalogue.realmsEmbed(locale);
			embed.title = "Realms Progress";
		} else if (isRealm(type)) {
			backButtonCustomId = `${CATALOGUE_VIEW_REALM_CUSTOM_ID}§${type}`;

			embed = catalogue.spiritEmbed(
				[...STANDARD_SPIRITS.filter((spirit) => spirit.realm === type).values()],
				locale,
			);

			embed.title = `${type} Progress`;
		} else if (isSeasonId(Number(type))) {
			const seasonId = Number(type) as SeasonIds;
			const emoji = SeasonIdToSeasonalEmoji[seasonId];
			backButtonCustomId = `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${type}`;
			backButtonEmoji = emoji;

			embed = catalogue.seasonEmbed(
				skySeasons().find((season) => season.id === seasonId)!,
				locale,
				true,
			);

			embed.title = `${formatEmoji(emoji)} ${t(`seasons.${type}`, { lng: locale, ns: "general" })} Progress`;
		} else if (type === CATALOGUE_SHARE_ELDER_KEY) {
			backButtonCustomId = CATALOGUE_VIEW_ELDERS_CUSTOM_ID;
			embed = catalogue.spiritEmbed([...ELDER_SPIRITS.values()], locale);
			embed.title = "Elders Progress";
		}

		if (!(embed && backButtonCustomId)) {
			pino.error(interaction, "Failed to parse spirits from a catalogue share prompt.");
			await client.api.interactions.reply(interaction.id, interaction.token, ERROR_RESPONSE);
			return;
		}

		const backButton: APIButtonComponentWithCustomId = {
			type: ComponentType.Button,
			custom_id: backButtonCustomId,
			label: "Back",
			style: ButtonStyle.Primary,
		};

		if (backButtonEmoji) {
			backButton.emoji = backButtonEmoji;
		}

		const profile = await Profile.fetch(invoker.id).catch(() => null);
		const embedAuthorOptions: APIEmbedAuthor = { name: profile?.name ?? invoker.username };

		if (profile?.iconURL) {
			embedAuthorOptions.icon_url = profile.iconURL;
		}

		embed.author = embedAuthorOptions;

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						backButton,
						{
							type: ComponentType.Button,
							custom_id: CATALOGUE_SHARE_SEND_CUSTOM_ID,
							emoji: { name: "🔗" },
							label: "Send",
							style: ButtonStyle.Success,
						},
					],
				},
			],
			content: "This will share your progress in this channel. Is this okay?",
			embeds: [embed],
		});
	}

	public static async shareSend(
		interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
	) {
		const { channel, message } = interaction;

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

		await client.api.channels.createMessage(channel.id, { embeds: interaction.message.embeds });
		const components = message.components!;

		for (const actionRow of components) {
			for (const component of actionRow.components) {
				if ("custom_id" in component && component.custom_id === CATALOGUE_SHARE_SEND_CUSTOM_ID) {
					component.disabled = true;
				}
			}
		}

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components,
			content: "Progress shared!",
			embeds: [],
		});
	}

	private remainingCurrency(items: readonly Item[], includeSeasonalCurrency?: boolean) {
		const result = addCosts(
			items
				.filter(({ cosmetics }) => cosmetics.some((cosmetic) => !this.data.has(cosmetic)))
				.map((item) => item.cost)
				.filter((cost): cost is ItemCost => cost !== null),
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
