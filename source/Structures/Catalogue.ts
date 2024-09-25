import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChannelType,
	type ChatInputCommandInteraction,
	type EmbedAuthorOptions,
	EmbedBuilder,
	type Locale,
	type MessageActionRowComponentBuilder,
	MessageFlags,
	PermissionFlagsBits,
	type Snowflake,
	StringSelectMenuBuilder,
	type StringSelectMenuInteraction,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { t } from "i18next";
import { DEFAULT_EMBED_COLOUR, ERROR_RESPONSE, type RealmName } from "../Utility/Constants.js";
import { isRealm } from "../Utility/Utility.js";
import {
	CatalogueType,
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
	type Item,
	type ItemCost,
	NO_EVENT_INFOGRAPHIC_YET,
	NO_EVENT_OFFER_TEXT,
	NO_FRIENDSHIP_TREE_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	SeasonName,
	SeasonNameToSeasonalEmoji,
	addCosts,
	resolveAllCosmetics,
	resolveCostToString,
} from "../Utility/catalogue.js";
import { skyNow } from "../Utility/dates.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji } from "../Utility/emojis.js";
import { cannotUsePermissions } from "../Utility/permissionChecks.js";
import type { SpiritName } from "../Utility/spirits.js";
import { skyCurrentEvents, skyEventYears, skyEvents } from "../catalogue/events/index.js";
import { HARMONY_HALL } from "../catalogue/harmonyHall.js";
import { NESTING_WORKSHOP } from "../catalogue/nestingWorkshop.js";
import { PERMANENT_EVENT_STORE } from "../catalogue/permanentEventStore.js";
import { SECRET_AREA } from "../catalogue/secretArea.js";
import { spirits } from "../catalogue/spirits/index.js";
import {
	ELDER_SPIRITS,
	REALMS,
	REALM_SPIRITS,
	STANDARD_SPIRITS,
} from "../catalogue/spirits/realms/index.js";
import {
	isSeasonName,
	resolveReturningSpirits,
	resolveTravellingSpirit,
	skyCurrentSeason,
	skySeasons,
} from "../catalogue/spirits/seasons/index.js";
import { STARTER_PACKS } from "../catalogue/starterPacks.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import type { Event } from "./Event.js";
import Profile from "./Profile.js";
import type { Season } from "./Season.js";
import type { ElderSpirit, GuideSpirit, SeasonalSpirit, StandardSpirit } from "./Spirits.js";

export interface CataloguePacket {
	user_id: Snowflake;
	data: number[];
}

interface CatalogueData {
	userId: CataloguePacket["user_id"];
	data: CataloguePacket["data"];
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

function backToStartButton(disabled = false) {
	return (
		new ButtonBuilder()
			// This custom id must differ to avoid duplicate custom ids.
			.setCustomId(CATALOGUE_BACK_TO_START_CUSTOM_ID)
			.setDisabled(disabled)
			.setEmoji("⏮️")
			.setLabel("Start")
			.setStyle(ButtonStyle.Primary)
	);
}

export class Catalogue {
	public readonly userId: CatalogueData["userId"];

	public data!: CatalogueData["data"];

	public constructor(catalogue: CataloguePacket) {
		this.userId = catalogue.user_id;
		this.patch(catalogue);
	}

	private patch(data: CataloguePatchData) {
		this.data = data.data;
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
			owned: resolveAllCosmetics(items).filter((cosmetic) => this.data.includes(cosmetic)),
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

	private harmonyHallOwnedProgress() {
		return this.ownedProgress(HARMONY_HALL.items);
	}

	public harmonyHallProgress(round?: boolean) {
		const { owned, total } = this.harmonyHallOwnedProgress();
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
		const standardAndElderOwnedProgress = this.spiritOwnedProgress(REALM_SPIRITS);
		const seasonalOwnedProgress = this.seasonOwnedProgress(skySeasons());
		const eventOwnedProgress = this.eventOwnedProgress(skyEvents());
		const starterPackOwnedProgress = this.starterPackOwnedProgress();
		const secretAreaOwnedProgress = this.secretAreaOwnedProgress();
		const harmonyHallOwnedProgress = this.harmonyHallOwnedProgress();
		const permanentEventStoreOwnedProgress = this.permanentEventStoreOwnedProgress();
		const nestingWorkshopOwnedProgress = this.nestingWorkshopOwnedProgress();

		const progresses = [
			standardAndElderOwnedProgress,
			seasonalOwnedProgress,
			eventOwnedProgress,
			starterPackOwnedProgress,
			secretAreaOwnedProgress,
			harmonyHallOwnedProgress,
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

	public static async viewCatalogue(interaction: ButtonInteraction | ChatInputCommandInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const existingCatalogue = await this.fetch(interaction.user.id).catch(() => null);
		let catalogue: Catalogue;

		if (existingCatalogue) {
			catalogue = existingCatalogue;
		} else {
			catalogue = new this(
				(
					await pg<CataloguePacket>(Table.Catalogue).insert({ user_id: interaction.user.id }, "*")
				)[0]!,
			);
		}

		const standardProgress = catalogue.spiritProgress(STANDARD_SPIRITS, true);
		const elderProgress = catalogue.spiritProgress(ELDER_SPIRITS, true);
		const seasonalProgress = catalogue.seasonProgress(skySeasons(), true);
		const eventProgress = catalogue.eventProgress(skyEvents(), true);
		const starterPackProgress = catalogue.starterPackProgress(true);
		const secretAreaProgress = catalogue.secretAreaProgress(true);
		const harmonyHallProgress = catalogue.harmonyHallProgress(true);
		const permanentEventStoreProgress = catalogue.permanentEventStoreProgress(true);
		const nestingWorkshopProgress = catalogue.nestingWorkshopProgress(true);
		const now = skyNow();
		const currentSeason = skyCurrentSeason(now);
		const events = skyCurrentEvents(now);
		const currentTravellingSpirit = resolveTravellingSpirit(now);
		const currentReturningSpirits = resolveReturningSpirits(now);

		const currentSeasonButton = new ButtonBuilder()
			.setCustomId(
				currentSeason
					? `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${currentSeason.name}`
					: // This would not happen, but it's here to satisfy the API.
						CATALOGUE_VIEW_SEASONS_CUSTOM_ID,
			)
			.setDisabled(!currentSeason)
			.setLabel("Current Season")
			.setStyle(currentSeason ? ButtonStyle.Success : ButtonStyle.Secondary);

		if (currentSeason) {
			currentSeasonButton.setEmoji(currentSeason.emoji);
		}

		const currentEventButtons =
			events.length === 0
				? [
						new ButtonBuilder()
							// This would not happen, but it's here to satisfy the API.
							.setCustomId(CATALOGUE_VIEW_EVENT_CUSTOM_ID)
							.setDisabled()
							.setStyle(ButtonStyle.Secondary),
					]
				: events.reduce<ButtonBuilder[]>((buttons, event) => {
						const button = new ButtonBuilder()
							.setCustomId(`${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${event.nameUnique}`)
							.setStyle(ButtonStyle.Success);

						if (event.eventCurrency?.emoji) {
							button.setEmoji(event.eventCurrency.emoji);
						}

						buttons.push(button);
						return buttons;
					}, []);

		if (currentEventButtons.length === 1) {
			currentEventButtons[0]!.setLabel("Current Event");
		}

		const currentTravellingSpiritButton = new ButtonBuilder()
			.setCustomId(
				currentTravellingSpirit
					? `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${currentTravellingSpirit.name}`
					: // This would not happen, but it's here to satisfy the API.
						`${CATALOGUE_VIEW_START_CUSTOM_ID}-travelling`,
			)
			.setDisabled(!currentTravellingSpirit)
			.setLabel("Travelling Spirit")
			.setStyle(currentTravellingSpirit ? ButtonStyle.Success : ButtonStyle.Secondary);

		if (currentTravellingSpirit) {
			currentTravellingSpiritButton.setEmoji(
				SeasonNameToSeasonalEmoji[currentTravellingSpirit.season],
			);
		}

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(CATALOGUE_VIEW_TYPE_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							new StringSelectMenuOptionBuilder()
								.setLabel(
									`Standard Spirits${standardProgress === null ? "" : ` (${standardProgress}%)`}`,
								)
								.setValue(String(CatalogueType.StandardSpirits)),
							new StringSelectMenuOptionBuilder()
								.setLabel(`Elders${elderProgress === null ? "" : ` (${elderProgress}%)`}`)
								.setValue(String(CatalogueType.Elders)),
							new StringSelectMenuOptionBuilder()
								.setLabel(`Seasons${seasonalProgress === null ? "" : ` (${seasonalProgress}%)`}`)
								.setValue(String(CatalogueType.SeasonalSpirits)),
							new StringSelectMenuOptionBuilder()
								.setLabel(`Events${eventProgress === null ? "" : ` (${eventProgress}%)`}`)
								.setValue(String(CatalogueType.Events)),
							new StringSelectMenuOptionBuilder()
								.setLabel(
									`Starter Packs${starterPackProgress === null ? "" : ` (${starterPackProgress}%)`}`,
								)
								.setValue(String(CatalogueType.StarterPacks)),
							new StringSelectMenuOptionBuilder()
								.setLabel(
									`Secret Area${secretAreaProgress === null ? "" : ` (${secretAreaProgress}%)`}`,
								)
								.setValue(String(CatalogueType.SecretArea)),
							new StringSelectMenuOptionBuilder()
								.setLabel(
									`Harmony Hall${harmonyHallProgress === null ? "" : ` (${harmonyHallProgress}%)`}`,
								)
								.setValue(String(CatalogueType.HarmonyHall)),
							new StringSelectMenuOptionBuilder()
								.setLabel(
									`Permanent Event Store${
										permanentEventStoreProgress === null ? "" : ` (${permanentEventStoreProgress}%)`
									}`,
								)
								.setValue(String(CatalogueType.PermanentEventStore)),
							new StringSelectMenuOptionBuilder()
								.setLabel(
									`Nesting Workshop${nestingWorkshopProgress === null ? "" : ` (${nestingWorkshopProgress}%)`}`,
								)
								.setValue(String(CatalogueType.NestingWorkshop)),
						)
						.setPlaceholder("What do you want to see?"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(backToStartButton(true)),
				// Limit the potential current event buttons to 4 to not exceed the limit.
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					currentSeasonButton,
					...currentEventButtons.slice(0, 4),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					currentTravellingSpiritButton,
					new ButtonBuilder()
						.setCustomId(
							currentReturningSpirits
								? CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID
								: // This would not happen, but it's here to satisfy the API.
									`${CATALOGUE_VIEW_START_CUSTOM_ID}-returning`,
						)
						.setDisabled(!currentReturningSpirits)
						.setLabel("Returning Spirits")
						.setStyle(currentReturningSpirits ? ButtonStyle.Success : ButtonStyle.Secondary),
				),
			],
			embeds: [],
			ephemeral: true,
		};

		if (interaction instanceof ButtonInteraction) {
			await interaction.update(response);
		} else {
			await interaction.reply(response);
		}
	}

	public static async parseCatalogueType(interaction: StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		switch (Number(interaction.values[0]) as CatalogueType) {
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
			case CatalogueType.HarmonyHall: {
				await this.viewHarmonyHall(interaction);
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

	public static async viewRealms(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { locale, user } = interaction;
		const catalogue = await this.fetch(user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(CATALOGUE_VIEW_REALM_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							REALMS.map((realm) => {
								const { name } = realm;
								const percentage = catalogue.spiritProgress(realm.spirits, true);

								return new StringSelectMenuOptionBuilder()
									.setLabel(
										`${t(`realms.${name}`, { lng: locale, ns: "general" })}${
											percentage === null ? "" : ` (${percentage}%)`
										}`,
									)
									.setValue(name);
							}),
						)
						.setPlaceholder("Select a realm!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${CATALOGUE_SHARE_REALMS_KEY}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [
				catalogue
					.realmsEmbed(locale)
					.setFooter({ text: CATALOGUE_STANDARD_PERCENTAGE_NOTE })
					.setTitle("Realms"),
			],
		});
	}

	public static async viewRealm(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
		realm: RealmName,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { locale, user } = interaction;
		const catalogue = await this.fetch(user.id);
		const spirits = STANDARD_SPIRITS.filter((spirit) => spirit.realm === realm);
		let hasEverything = true;

		const options = spirits.map((spirit) => {
			const percentage = catalogue.spiritProgress([spirit], true);

			if (percentage !== null && percentage !== 100) {
				hasEverything = false;
			}

			return new StringSelectMenuOptionBuilder()
				.setLabel(
					`${t(`spiritNames.${spirit.name}`, { lng: locale, ns: "general" })}${
						percentage === null ? "" : ` (${percentage}%)`
					}`,
				)
				.setValue(spirit.name);
		});

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(CATALOGUE_VIEW_SPIRIT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select a spirit!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_REALMS_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${realm}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_REALM_EVERYTHING_CUSTOM_ID}§${realm}`)
						.setDisabled(hasEverything)
						.setEmoji(MISCELLANEOUS_EMOJIS.ConstellationFlag)
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			embeds: [
				catalogue
					.spiritEmbed(spirits, locale)
					.setFooter({ text: CATALOGUE_STANDARD_PERCENTAGE_NOTE })
					.setTitle(t(`realms.${realm}`, { lng: locale, ns: "general" })),
			],
		});
	}

	public static async viewElders(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { locale, user } = interaction;
		const catalogue = await this.fetch(user.id);
		let hasEverything = true;

		const options = ELDER_SPIRITS.map((spirit) => {
			const percentage = catalogue.spiritProgress([spirit], true);

			if (percentage !== null && percentage !== 100) {
				hasEverything = false;
			}

			return new StringSelectMenuOptionBuilder()
				.setLabel(
					`${t(`spiritNames.${spirit.name}`, { lng: locale, ns: "general" })}${
						percentage === null ? "" : ` (${percentage}%)`
					}`,
				)
				.setValue(spirit.name);
		});

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(CATALOGUE_VIEW_SPIRIT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select an elder!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${CATALOGUE_SHARE_ELDER_KEY}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID)
						.setDisabled(hasEverything)
						.setEmoji(MISCELLANEOUS_EMOJIS.ConstellationFlag)
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			embeds: [catalogue.spiritEmbed(ELDER_SPIRITS, locale).setTitle("Elders")],
		});
	}

	public static async viewSeasons(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { locale, user } = interaction;
		const catalogue = await this.fetch(user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(CATALOGUE_VIEW_SEASON_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							skySeasons().map((season) => {
								const percentage = catalogue.seasonProgress([season], true);

								return new StringSelectMenuOptionBuilder()
									.setEmoji(SeasonNameToSeasonalEmoji[season.name])
									.setLabel(
										`${t(`seasons.${season.name}`, { lng: locale, ns: "general" })}${
											percentage === null ? "" : ` (${percentage}%)`
										}`,
									)
									.setValue(season.name);
							}),
						)
						.setPlaceholder("Select a season!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [],
		});
	}

	public static async viewSeason(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
		seasonName: SeasonName,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { locale, user } = interaction;
		const seasons = skySeasons();
		const season = seasons.find(({ name }) => name === seasonName);

		if (!season) {
			pino.error(interaction, "Failed to view a season.");
			await interaction.update(ERROR_RESPONSE);
			return;
		}

		const catalogue = await this.fetch(user.id);
		const spirits = [season.guide, ...season.spirits];

		const options = spirits.map((spirit) => {
			const { name } = spirit;
			const percentage = catalogue.spiritProgress([spirit], true);

			return new StringSelectMenuOptionBuilder()
				.setLabel(
					`${t(`spiritNames.${name}`, { lng: locale, ns: "general" })}${
						percentage === null ? "" : ` (${percentage}%)`
					}`,
				)
				.setValue(name);
		});

		const components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] = [
			new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(CATALOGUE_VIEW_SPIRIT_CUSTOM_ID)
					.setMaxValues(1)
					.setMinValues(0)
					.setOptions(options)
					.setPlaceholder(
						seasonName === SeasonName.Shattering
							? "Select an entity!"
							: seasonName === SeasonName.Revival
								? "Select a spirit or a shop!"
								: seasonName === SeasonName.Nesting
									? "Select a spirit or an entity!"
									: "Select a spirit!",
					),
			),
		];

		if (season.items.length > 0) {
			const itemsOptions = season.items.map(({ emoji, name, cosmetics }) => {
				const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
					.setDefault(cosmetics.every((cosmetic) => catalogue.data.includes(cosmetic)))
					.setLabel(name)
					.setValue(JSON.stringify(cosmetics));

				if (emoji) {
					stringSelectMenuOptionBuilder.setEmoji(emoji);
				}

				return stringSelectMenuOptionBuilder;
			});

			components.push(
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`${CATALOGUE_SET_SEASON_ITEMS_CUSTOM_ID}§${seasonName}`)
						.setMaxValues(itemsOptions.length)
						.setMinValues(0)
						.setOptions(itemsOptions)
						.setPlaceholder("What items do you have?"),
				),
			);
		}

		const index = seasons.indexOf(season);
		const before = seasons[index - 1];
		const after = seasons[index + 1];

		components.push(
			new ActionRowBuilder<ButtonBuilder>().setComponents(
				backToStartButton(),
				new ButtonBuilder()
					.setCustomId(CATALOGUE_VIEW_SEASONS_CUSTOM_ID)
					.setEmoji("⏪")
					.setLabel("Back")
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${seasonName}`)
					.setEmoji("🔗")
					.setLabel("Share")
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`${CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID}§${seasonName}`)
					.setDisabled(catalogue.seasonProgress([season]) === 100)
					.setEmoji(MISCELLANEOUS_EMOJIS.ConstellationFlag)
					.setLabel("I have everything!")
					.setStyle(ButtonStyle.Success),
			),
			new ActionRowBuilder<ButtonBuilder>().setComponents(
				new ButtonBuilder()
					.setCustomId(`${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${before?.name}`)
					.setDisabled(!before)
					.setEmoji("⬅️")
					.setLabel("Previous season")
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${after?.name}`)
					.setDisabled(!after)
					.setEmoji("➡️")
					.setLabel("Next season")
					.setStyle(ButtonStyle.Primary),
			),
		);

		await interaction.update({
			content: "",
			components,
			embeds: [catalogue.seasonEmbed(season, locale)],
		});
	}

	public static async viewEventYears(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { user } = interaction;
		const catalogue = await this.fetch(user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							skyEventYears().map((year) => {
								const percentage = catalogue.eventProgress(
									skyEvents().filter((event) => event.start.year === year),
									true,
								);

								return new StringSelectMenuOptionBuilder()
									.setLabel(`${year}${percentage === null ? "" : ` (${percentage}%)`}`)
									.setValue(String(year));
							}),
						)
						.setPlaceholder("Select a year!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription("Events are grouped by year.")
					.setTitle("Events By Year"),
			],
		});
	}

	public static async viewEvents(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
		yearString: string,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { locale, user } = interaction;
		const year = Number(yearString);
		const catalogue = await this.fetch(user.id);
		const events = skyEvents().filter((event) => event.start.year === year);

		const options = events.map((event) => {
			const { name, nameUnique } = event;
			const percentage = catalogue.eventProgress([event], true);

			const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
				.setLabel(
					`${t(`events.${name}`, { lng: locale, ns: "general" })}${percentage === null ? "" : ` (${percentage}%)`}`,
				)
				.setValue(nameUnique);

			if (event.eventCurrency?.emoji) {
				stringSelectMenuOptionBuilder.setEmoji(event.eventCurrency.emoji);
			}

			return stringSelectMenuOptionBuilder;
		});

		const embed = new EmbedBuilder().setColor(DEFAULT_EMBED_COLOUR).setTitle(`Events ${year}`);

		for (const event of events) {
			if (event.offer.length === 0) {
				continue;
			}

			const { offerDescription } = catalogue.embedProgress(event.offer);

			embed.addFields({
				name: t(`events.${event.name}`, { lng: locale, ns: "general" }),
				value: offerDescription.join("\n"),
				inline: true,
			});
		}

		const eventsYears = skyEventYears();
		const index = eventsYears.indexOf(year);
		const before = eventsYears[index - 1];
		const after = eventsYears[index + 1];

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(CATALOGUE_VIEW_EVENT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select an event!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${before}`)
						.setDisabled(!before)
						.setEmoji("⬅️")
						.setLabel("Previous year")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${after}`)
						.setDisabled(!after)
						.setEmoji("➡️")
						.setLabel("Next year")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [embed],
		});
	}

	public static async viewReturningSpirits(interaction: ButtonInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { locale, user } = interaction;
		const catalogue = await this.fetch(user.id);
		const spirits = resolveReturningSpirits(skyNow());

		if (!spirits) {
			await Catalogue.viewCatalogue(interaction);
			return;
		}

		const options = spirits.map((spirit) => {
			const { name } = spirit;
			const percentage = catalogue.spiritProgress([spirit], true);

			return new StringSelectMenuOptionBuilder()
				.setEmoji(SeasonNameToSeasonalEmoji[spirit.season])
				.setLabel(
					`${t(`spiritNames.${name}`, { lng: locale, ns: "general" })}${
						percentage === null ? "" : ` (${percentage}%)`
					}`,
				)
				.setValue(name);
		});

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(CATALOGUE_VIEW_SPIRIT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select a spirit!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(backToStartButton()),
			],
			embeds: [catalogue.spiritEmbed(spirits, locale).setTitle("Returning Spirits")],
		};

		await interaction.update(response);
	}

	public static async parseViewSpirit(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const catalogue = await this.fetch(interaction.user.id);

		const parsedCustomId =
			interaction instanceof ButtonInteraction
				? interaction.customId.slice(interaction.customId.indexOf("§") + 1)
				: interaction.values[0];

		const spirit = spirits().find(({ name }) => name === parsedCustomId);

		if (!spirit) {
			await interaction.update({
				content: "Woah, it seems we have not encountered that spirit yet. How strange!",
				components: [],
				embeds: [],
			});

			return;
		}

		await catalogue.viewSpirit(interaction, spirit);
	}

	private async viewSpirit(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
		spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { locale } = interaction;
		const isStandardSpirit = spirit.isStandardSpirit();
		const isElderSpirit = spirit.isElderSpirit();
		const isSeasonalSpirit = spirit.isSeasonalSpirit();
		const isGuideSpirit = spirit.isGuideSpirit();
		const seasonalParsing = isSeasonalSpirit && spirit.current.length === 0;
		const offer = seasonalParsing ? spirit.seasonal : spirit.current;
		const imageURL = seasonalParsing ? spirit.imageURLSeasonal : spirit.imageURL;

		const embed = this.spiritEmbed([spirit], locale)
			.setTitle(t(`spiritNames.${spirit.name}`, { lng: locale, ns: "general" }))
			.setURL(spirit.wikiURL);

		const description = embed.data.description ? [embed.data.description] : [];

		if (imageURL) {
			embed.setImage(imageURL);
		} else {
			description.push(offer.length > 0 ? NO_FRIENDSHIP_TREE_YET_TEXT : NO_FRIENDSHIP_TREE_TEXT);
		}

		embed.setDescription(description.join("\n"));

		if (isGuideSpirit && spirit.inProgress) {
			embed.setFooter({ text: GUIDE_SPIRIT_IN_PROGRESS_TEXT });
		}

		const components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] = [];

		const buttons = new ActionRowBuilder<ButtonBuilder>().setComponents(
			backToStartButton(),
			new ButtonBuilder()
				.setCustomId(
					isElderSpirit
						? CATALOGUE_VIEW_ELDERS_CUSTOM_ID
						: isStandardSpirit
							? `${CATALOGUE_VIEW_REALM_CUSTOM_ID}§${spirit.realm}`
							: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${spirit.season}`,
				)
				.setEmoji(
					isSeasonalSpirit || isGuideSpirit ? SeasonNameToSeasonalEmoji[spirit.season] : "⏪",
				)
				.setLabel("Back")
				.setStyle(ButtonStyle.Primary),
		);

		if (offer.length > 0) {
			buttons.addComponents(
				new ButtonBuilder()
					.setCustomId(`${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${spirit.name}`)
					.setDisabled(this.spiritProgress([spirit]) === 100)
					.setEmoji(MISCELLANEOUS_EMOJIS.ConstellationFlag)
					.setLabel("I have everything!")
					.setStyle(ButtonStyle.Success),
			);

			const itemSelectionOptions = offer.map(({ emoji, name, cosmetics }) => {
				const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
					.setDefault(cosmetics.every((cosmetic) => this.data.includes(cosmetic)))
					.setLabel(name)
					.setValue(JSON.stringify(cosmetics));

				if (emoji) {
					stringSelectMenuOptionBuilder.setEmoji(emoji);
				}

				return stringSelectMenuOptionBuilder;
			});

			const itemSelectionOptionsMaximumLimit = itemSelectionOptions.slice(
				0,
				CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
			);

			const itemSelection = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${spirit.name}`)
					.setMaxValues(itemSelectionOptionsMaximumLimit.length)
					.setMinValues(0)
					.setOptions(itemSelectionOptionsMaximumLimit)
					.setPlaceholder("Select what you have!"),
			);

			components.push(itemSelection);

			if (itemSelectionOptions.length > CATALOGUE_MAXIMUM_OPTIONS_LIMIT) {
				const itemSelectionOverflowOptionsMaximumLimit = itemSelectionOptions.slice(
					CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
				);

				components.push(
					new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
						new StringSelectMenuBuilder()
							.setCustomId(`${CATALOGUE_VIEW_OFFER_2_CUSTOM_ID}§${spirit.name}`)
							.setMaxValues(itemSelectionOverflowOptionsMaximumLimit.length)
							.setMinValues(0)
							.setOptions(itemSelectionOverflowOptionsMaximumLimit)
							.setPlaceholder("Select what you have!"),
					),
				);
			}
		}

		components.push(buttons);

		let spirits:
			| readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[]
			| undefined;

		if (isStandardSpirit) {
			spirits = REALMS.find(({ name }) => name === spirit.realm)?.spirits;
		} else if (isElderSpirit) {
			spirits = ELDER_SPIRITS;
		} else if (isSeasonalSpirit || isGuideSpirit) {
			const season = skySeasons().find(({ name }) => name === spirit.season);

			if (season) {
				spirits = [season.guide, ...season.spirits];
			}
		}

		if (spirits) {
			const index = spirits.findIndex(({ name }) => name === spirit.name);
			const before = spirits[index - 1];
			const after = spirits[index + 1];

			components.push(
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${before?.name}`)
						.setDisabled(!before)
						.setEmoji("⬅️")
						.setLabel("Previous spirit")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${after?.name}`)
						.setDisabled(!after)
						.setEmoji("➡️")
						.setLabel("Next spirit")
						.setStyle(ButtonStyle.Primary),
				),
			);
		}

		await interaction.update({ components, content: "", embeds: [embed] });
	}

	public static async parseViewEvent(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const catalogue = await this.fetch(interaction.user.id);

		const eventName =
			interaction instanceof ButtonInteraction
				? interaction.customId.slice(interaction.customId.indexOf("§") + 1)
				: interaction.values[0];

		const event = skyEvents().find(({ nameUnique }) => nameUnique === eventName);

		if (!event) {
			await interaction.update(ERROR_RESPONSE);
			pino.error(interaction, "Could not parse an event for the catalogue.");
			return;
		}

		await catalogue.viewEvent(interaction, event);
	}

	private async viewEvent(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
		event: Event,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { locale } = interaction;
		const { name, nameUnique, start, eventCurrency, offer, offerInfographicURL, wikiURL } = event;

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setTitle(
				`${eventCurrency?.emoji ? formatEmoji(eventCurrency.emoji) : ""}${t(`events.${name}`, {
					lng: locale,
					ns: "general",
				})}`,
			)
			.setURL(wikiURL);

		const description = [];

		if (offer.length > 0) {
			const { offerDescription } = this.embedProgress(offer);
			description.push(offerDescription.join("\n"));
		}

		if (offerInfographicURL) {
			embed.setImage(offerInfographicURL);
		} else {
			description.push(offer.length > 0 ? NO_EVENT_INFOGRAPHIC_YET : NO_EVENT_OFFER_TEXT);
		}

		if (description.length > 0) {
			embed.setDescription(description.join("\n"));
		}

		const components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] = [];

		const buttons = new ActionRowBuilder<ButtonBuilder>().setComponents(
			backToStartButton(),
			new ButtonBuilder()
				.setCustomId(`${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${start.year}`)
				.setEmoji("⏪")
				.setLabel("Back")
				.setStyle(ButtonStyle.Primary),
		);

		if (offer.length > 0) {
			buttons.addComponents(
				new ButtonBuilder()
					.setCustomId(`${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${nameUnique}`)
					.setDisabled(this.eventProgress([event]) === 100)
					.setEmoji(MISCELLANEOUS_EMOJIS.ConstellationFlag)
					.setLabel("I have everything!")
					.setStyle(ButtonStyle.Success),
			);

			const itemSelectionOptions = offer.map(({ emoji, name, cosmetics }) => {
				const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
					.setDefault(cosmetics.every((cosmetic) => this.data.includes(cosmetic)))
					.setLabel(name)
					.setValue(JSON.stringify(cosmetics));

				if (emoji) {
					stringSelectMenuOptionBuilder.setEmoji(emoji);
				}

				return stringSelectMenuOptionBuilder;
			});

			const itemSelection = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${nameUnique}`)
					.setMaxValues(itemSelectionOptions.length)
					.setMinValues(0)
					.setOptions(itemSelectionOptions)
					.setPlaceholder("Select what you have!"),
			);

			components.push(itemSelection);
		}

		components.push(buttons);

		const events = skyEvents().filter((event) => event.start.year === start.year);
		const index = events.findIndex((event) => event.nameUnique === nameUnique);
		const before = events[index - 1];
		const after = events[index + 1];

		// It is possible that for the first event of a year, the custom ids will be the same, leading to an error.
		// We use the nullish coalescing operator to fallback to some default values to mitigate this.
		components.push(
			new ActionRowBuilder<ButtonBuilder>().setComponents(
				new ButtonBuilder()
					.setCustomId(`${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${before?.nameUnique ?? "before"}`)
					.setDisabled(!before)
					.setEmoji("⬅️")
					.setLabel("Previous event")
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${after?.nameUnique ?? "after"}`)
					.setDisabled(!after)
					.setEmoji("➡️")
					.setLabel("Next event")
					.setStyle(ButtonStyle.Primary),
			),
		);

		await interaction.update({ components, content: "", embeds: [embed] });
	}

	private static async viewStarterPacks(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const catalogue = await this.fetch(interaction.user.id);

		const itemSelectionOptions = STARTER_PACKS.items.map(({ emoji, name, cosmetics }) => {
			const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
				.setDefault(cosmetics.every((cosmetic) => catalogue.data.includes(cosmetic)))
				.setLabel(name)
				.setValue(JSON.stringify(cosmetics));

			if (emoji) {
				stringSelectMenuOptionBuilder.setEmoji(emoji);
			}

			return stringSelectMenuOptionBuilder;
		});

		const { offerDescription } = catalogue.embedProgress(STARTER_PACKS.items);

		await interaction.update({
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.StarterPacks}`)
						.setMaxValues(itemSelectionOptions.length)
						.setMinValues(0)
						.setOptions(itemSelectionOptions)
						.setPlaceholder("Select what you have!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.StarterPacks}`)
						.setDisabled(catalogue.starterPackProgress() === 100)
						.setEmoji(MISCELLANEOUS_EMOJIS.ConstellationFlag)
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			content: "",
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(offerDescription.join("\n"))
					.setTitle("Starter Packs"),
			],
		});
	}

	private static async viewSecretArea(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const catalogue = await this.fetch(interaction.user.id);

		const itemSelectionOptions = SECRET_AREA.items.map(({ emoji, name, cosmetics }) => {
			const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
				.setDefault(cosmetics.every((cosmetic) => catalogue.data.includes(cosmetic)))
				.setLabel(name)
				.setValue(JSON.stringify(cosmetics));

			if (emoji) {
				stringSelectMenuOptionBuilder.setEmoji(emoji);
			}

			return stringSelectMenuOptionBuilder;
		});

		const { offerDescription } = catalogue.embedProgress(SECRET_AREA.items);

		await interaction.update({
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.SecretArea}`)
						.setMaxValues(itemSelectionOptions.length)
						.setMinValues(0)
						.setOptions(itemSelectionOptions)
						.setPlaceholder("Select what you have!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.SecretArea}`)
						.setDisabled(catalogue.secretAreaProgress() === 100)
						.setEmoji(MISCELLANEOUS_EMOJIS.ConstellationFlag)
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			content: "",
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(offerDescription.join("\n"))
					.setTitle("Secret Area"),
			],
		});
	}

	private static async viewHarmonyHall(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const catalogue = await this.fetch(interaction.user.id);

		const itemSelectionOptions = HARMONY_HALL.items.map(({ emoji, name, cosmetics }) => {
			const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
				.setDefault(cosmetics.every((cosmetic) => catalogue.data.includes(cosmetic)))
				.setLabel(name)
				.setValue(JSON.stringify(cosmetics));

			if (emoji) {
				stringSelectMenuOptionBuilder.setEmoji(emoji);
			}

			return stringSelectMenuOptionBuilder;
		});

		const { offerDescription } = catalogue.embedProgress(HARMONY_HALL.items);

		await interaction.update({
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.HarmonyHall}`)
						.setMaxValues(itemSelectionOptions.length)
						.setMinValues(0)
						.setOptions(itemSelectionOptions)
						.setPlaceholder("Select what you have!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.HarmonyHall}`)
						.setDisabled(catalogue.harmonyHallProgress() === 100)
						.setEmoji(MISCELLANEOUS_EMOJIS.ConstellationFlag)
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			content: "",
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(offerDescription.join("\n"))
					.setTitle("Harmony Hall"),
			],
		});
	}

	private static async viewPermanentEventStore(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const catalogue = await this.fetch(interaction.user.id);

		const itemSelectionOptions = PERMANENT_EVENT_STORE.items.map(({ emoji, name, cosmetics }) => {
			const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
				.setDefault(cosmetics.every((cosmetic) => catalogue.data.includes(cosmetic)))
				.setLabel(name)
				.setValue(JSON.stringify(cosmetics));

			if (emoji) {
				stringSelectMenuOptionBuilder.setEmoji(emoji);
			}

			return stringSelectMenuOptionBuilder;
		});

		const { offerDescription } = catalogue.embedProgress(PERMANENT_EVENT_STORE.items);

		await interaction.update({
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.PermanentEventStore}`)
						.setMaxValues(itemSelectionOptions.length)
						.setMinValues(0)
						.setOptions(itemSelectionOptions)
						.setPlaceholder("Select what you have!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(
							`${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.PermanentEventStore}`,
						)
						.setDisabled(catalogue.permanentEventStoreProgress() === 100)
						.setEmoji(MISCELLANEOUS_EMOJIS.ConstellationFlag)
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			content: "",
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(offerDescription.join("\n"))
					.setTitle("Permanent Event Store"),
			],
		});
	}

	private static async viewNestingWorkshop(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const catalogue = await this.fetch(interaction.user.id);

		const itemSelectionOptions = NESTING_WORKSHOP.items.map(({ emoji, name, cosmetics }) => {
			const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
				.setDefault(cosmetics.every((cosmetic) => catalogue.data.includes(cosmetic)))
				.setLabel(name)
				.setValue(JSON.stringify(cosmetics));

			if (emoji) {
				stringSelectMenuOptionBuilder.setEmoji(emoji);
			}

			return stringSelectMenuOptionBuilder;
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

		await interaction.update({
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`)
						.setMaxValues(itemSelectionOptions1.length)
						.setMinValues(0)
						.setOptions(itemSelectionOptions1)
						.setPlaceholder("Select what you have!"),
				),
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`${CATALOGUE_VIEW_OFFER_2_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`)
						.setMaxValues(itemSelectionOptions2.length)
						.setMinValues(0)
						.setOptions(itemSelectionOptions2)
						.setPlaceholder("Select what you have!"),
				),
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`${CATALOGUE_VIEW_OFFER_3_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`)
						.setMaxValues(itemSelectionOptions3.length)
						.setMinValues(0)
						.setOptions(itemSelectionOptions3)
						.setPlaceholder("Select what you have!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`)
						.setDisabled(catalogue.nestingWorkshopProgress() === 100)
						.setEmoji(MISCELLANEOUS_EMOJIS.ConstellationFlag)
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			content: "",
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(offerDescription.join("\n"))
					.setTitle("Nesting Workshop"),
			],
		});
	}

	public static async setRealm(interaction: ButtonInteraction) {
		const { customId, user } = interaction;
		const catalogue = await this.fetch(user.id);
		const realm = customId.slice(customId.indexOf("§") + 1);

		if (!isRealm(realm)) {
			throw new Error("Unknown realm.");
		}

		await this.update(user.id, {
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

	public static async setElders(interaction: ButtonInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const catalogue = await this.fetch(interaction.user.id);

		await this.update(interaction.user.id, {
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

	public static async setSeason(interaction: ButtonInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { customId, user } = interaction;
		const catalogue = await this.fetch(user.id);
		const parsedCustomId = customId.slice(customId.indexOf("§") + 1);
		const season = skySeasons().find((season) => season.name === parsedCustomId);

		if (!season) {
			pino.error(interaction, "Unknown season.");
			throw new Error("Unknown season.");
		}

		await this.update(user.id, {
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
		await Catalogue.viewSeason(interaction, season.name);
	}

	public static async setSeasonItems(interaction: StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { customId, user } = interaction;
		const catalogue = await this.fetch(user.id);
		const parsedCustomId = customId.slice(customId.indexOf("§") + 1);
		const season = skySeasons().find((season) => season.name === parsedCustomId);

		if (!season) {
			pino.error(interaction, "Unknown season.");
			throw new Error("Unknown season.");
		}

		await this.update(user.id, {
			data: catalogue.calculateSetItems(interaction, season.allCosmetics),
		});

		await Catalogue.viewSeason(interaction, season.name);
	}

	public static async parseSetItems(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const catalogue = await this.fetch(interaction.user.id);
		const { customId } = interaction;
		const resolvedCustomId = customId.slice(customId.indexOf("§") + 1);
		const spirit = spirits().find(({ name }) => name === resolvedCustomId);
		const event = skyEvents().find(({ nameUnique }) => nameUnique === resolvedCustomId);

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
				case CatalogueType.HarmonyHall: {
					await catalogue.setHarmonyHallItems(interaction);
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
					await interaction.update(ERROR_RESPONSE);
				}
			}
		}
	}

	private calculateSetItems(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
		allCosmetics: readonly number[],
	) {
		let cosmetics: number[];

		if (interaction instanceof ButtonInteraction) {
			cosmetics = [...new Set([...this.data, ...allCosmetics])];
		} else {
			// Get the select menu where this interaction came from.
			const { component } = interaction;

			// Retrieve all cosmetics in this select menu.
			const selectMenuCosmetics = component.options.reduce<number[]>(
				(computedCosmetics, { value }) => {
					const parsedValue = JSON.parse(value) as readonly number[];
					computedCosmetics.push(...parsedValue);
					return computedCosmetics;
				},
				[],
			);

			// Remove the cosmetics from the data.
			const modifiedData = this.data.filter((cosmetic) => !selectMenuCosmetics.includes(cosmetic));

			// Calculate the new data.
			cosmetics = [
				...modifiedData,
				...interaction.values.reduce<number[]>((computedCosmetics, value) => {
					const parsedValue = JSON.parse(value) as readonly number[];
					computedCosmetics.push(...parsedValue);
					return computedCosmetics;
				}, []),
			];
		}

		return cosmetics;
	}

	private async setSpiritItems(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
		spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
	) {
		const [cataloguePacket] = await Catalogue.update(interaction.user.id, {
			data: this.calculateSetItems(interaction, spirit.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await this.viewSpirit(interaction, spirit);
	}

	private async setEventItems(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
		event: Event,
	) {
		const [cataloguePacket] = await Catalogue.update(interaction.user.id, {
			data: this.calculateSetItems(interaction, event.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await this.viewEvent(interaction, event);
	}

	private async setStarterPacksItems(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		const [cataloguePacket] = await Catalogue.update(interaction.user.id, {
			data: this.calculateSetItems(interaction, PERMANENT_EVENT_STORE.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await Catalogue.viewStarterPacks(interaction);
	}

	private async setSecretAreaItems(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		const [cataloguePacket] = await Catalogue.update(interaction.user.id, {
			data: this.calculateSetItems(interaction, SECRET_AREA.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await Catalogue.viewSecretArea(interaction);
	}

	private async setHarmonyHallItems(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		const [cataloguePacket] = await Catalogue.update(interaction.user.id, {
			data: this.calculateSetItems(interaction, HARMONY_HALL.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await Catalogue.viewHarmonyHall(interaction);
	}

	private async setPermanentEventStoreItems(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
	) {
		const [cataloguePacket] = await Catalogue.update(interaction.user.id, {
			data: this.calculateSetItems(interaction, PERMANENT_EVENT_STORE.allCosmetics),
		});

		this.patch(cataloguePacket!);
		await Catalogue.viewPermanentEventStore(interaction);
	}

	private async setNestingWorkshopItems(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
	) {
		const [cataloguePacket] = await Catalogue.update(interaction.user.id, {
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

	private realmsEmbed(locale: Locale) {
		return new EmbedBuilder().setColor(DEFAULT_EMBED_COLOUR).setDescription(
			REALMS.map((realm) => {
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
		);
	}

	private embedProgress(offer: readonly Item[]) {
		const offerDescription = [];
		const owned = [];
		const unowned = [];

		for (const { name, cosmetics, emoji } of offer) {
			const toPush = emoji ? formatEmoji(emoji) : name;

			if (cosmetics.every((cosmetic) => this.data.includes(cosmetic))) {
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

	private seasonEmbed(season: Season, locale: Locale) {
		const description = [];
		const remainingCurrencies = [];

		const offers: [SpiritName | SeasonName, readonly Item[]][] = [
			[season.guide.name, season.guide.current],
			...season.spirits.map<[SpiritName | SeasonName, readonly Item[]]>((spirit) => [
				spirit.name,
				spirit.items,
			]),
			[season.name, season.items],
		];

		for (const [index, offer] of offers) {
			if (offer.length === 0) {
				continue;
			}

			const { remainingCurrency, offerDescription } = this.embedProgress(offer);
			remainingCurrencies.push(remainingCurrency);

			description.push(
				`__${
					isSeasonName(index) ? "Items" : t(`spiritNames.${index}`, { lng: locale, ns: "general" })
				}__\n${offerDescription.join("\n")}`,
			);
		}

		const totalRemainingCurrency = resolveCostToString(addCosts(remainingCurrencies));

		if (totalRemainingCurrency.length > 0) {
			description.unshift(`__Remaining Currency__\n${totalRemainingCurrency.join("")}`);
		}

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setTitle(
				`${formatEmoji(SeasonNameToSeasonalEmoji[season.name])} ${t(`seasons.${season.name}`, {
					lng: locale,
					ns: "general",
				})}`,
			)
			.setURL(season.wikiURL);

		if (description.length > 0) {
			let descriptionString = description.join("\n\n");

			// If the resulting description exceeds 4,096 characters, replace the yes and no emojis with Unicode variants.
			if (descriptionString.length > 4_096) {
				descriptionString = descriptionString
					.replaceAll(formatEmoji(MISCELLANEOUS_EMOJIS.Yes), "✅")
					.replaceAll(formatEmoji(MISCELLANEOUS_EMOJIS.No), "❌");
			}

			embed.setDescription(descriptionString);
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
					multiple ? `__${t(`spiritNames.${spirit.name}`, { lng: locale, ns: "general" })}__\n` : ""
				}${offerDescription.join("\n")}`,
			);
		}

		if (multiple) {
			const totalRemainingCurrency = resolveCostToString(addCosts(remainingCurrencies));

			if (totalRemainingCurrency.length > 0) {
				description.unshift(`__Remaining Currency__\n${totalRemainingCurrency.join("")}`);
			}
		}

		const embed = new EmbedBuilder().setColor(DEFAULT_EMBED_COLOUR);

		if (description.length > 0) {
			let descriptionString = description.join("\n\n");

			// If the resulting description exceeds 4,096 characters, replace the yes and no emojis with Unicode variants.
			if (descriptionString.length > 4_096) {
				descriptionString = descriptionString
					.replaceAll(formatEmoji(MISCELLANEOUS_EMOJIS.Yes), "✅")
					.replaceAll(formatEmoji(MISCELLANEOUS_EMOJIS.No), "❌");
			}

			embed.setDescription(descriptionString);
		}

		return embed;
	}

	public static async sharePrompt(interaction: ButtonInteraction) {
		const { channel, customId, locale, user } = interaction;

		if (!interaction.inGuild()) {
			await interaction.reply({
				content:
					"[You & I](https://youtu.be/_kqQDCxRCzM) are the only ones around here. Try sharing in a server!",
				flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
			});

			return;
		}

		if (!channel || (channel.type === ChannelType.PrivateThread && !channel.members.me)) {
			await interaction.update({
				components: [],
				content: "I cannot see this channel.",
				embeds: [],
			});

			return;
		}

		if (
			await cannotUsePermissions(
				interaction,
				PermissionFlagsBits.ViewChannel |
					(channel.isThread()
						? PermissionFlagsBits.SendMessagesInThreads
						: PermissionFlagsBits.SendMessages) |
					PermissionFlagsBits.EmbedLinks |
					PermissionFlagsBits.UseExternalEmojis,
			)
		) {
			return;
		}

		const catalogue = await this.fetch(user.id);
		const type = customId.slice(customId.indexOf("§") + 1);
		const backButton = new ButtonBuilder().setLabel("Back").setStyle(ButtonStyle.Primary);
		let embed: EmbedBuilder | undefined;

		if (type === CATALOGUE_SHARE_REALMS_KEY) {
			backButton.setCustomId(CATALOGUE_VIEW_REALMS_CUSTOM_ID);
			embed = catalogue.realmsEmbed(locale).setTitle("Realms Progress");
		} else if (isRealm(type)) {
			backButton.setCustomId(`${CATALOGUE_VIEW_REALM_CUSTOM_ID}§${type}`);

			embed = catalogue
				.spiritEmbed(
					STANDARD_SPIRITS.filter((spirit) => spirit.realm === type),
					locale,
				)
				.setTitle(`${type} Progress`);
		} else if (isSeasonName(type)) {
			const emoji = SeasonNameToSeasonalEmoji[type];
			backButton.setCustomId(`${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${type}`).setEmoji(emoji);

			embed = catalogue
				.seasonEmbed(skySeasons().find((season) => season.name === type)!, locale)
				.setTitle(
					`${formatEmoji(emoji)} ${t(`seasons.${type}`, { lng: locale, ns: "general" })} Progress`,
				);
		} else if (type === CATALOGUE_SHARE_ELDER_KEY) {
			backButton.setCustomId(CATALOGUE_VIEW_ELDERS_CUSTOM_ID);
			embed = catalogue.spiritEmbed(ELDER_SPIRITS, locale).setTitle("Elders Progress");
		}

		if (!embed) {
			pino.error(interaction, "Failed to parse spirits from a catalogue share prompt.");
			await interaction.update(ERROR_RESPONSE);
			return;
		}

		const profile = await Profile.fetch(user.id).catch(() => null);
		const embedAuthorOptions: EmbedAuthorOptions = { name: profile?.name ?? user.tag };

		if (profile?.iconURL) {
			embedAuthorOptions.iconURL = profile.iconURL;
		}

		await interaction.update({
			components: [
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backButton,
					new ButtonBuilder()
						.setCustomId(CATALOGUE_SHARE_SEND_CUSTOM_ID)
						.setEmoji("🔗")
						.setLabel("Send")
						.setStyle(ButtonStyle.Success),
				),
			],
			content: "This will share your progress in this channel. Is this okay?",
			embeds: [embed.setAuthor(embedAuthorOptions)],
		});
	}

	public static async shareSend(interaction: ButtonInteraction<"cached">) {
		const { channel, message } = interaction;

		if (!channel || (channel.type === ChannelType.PrivateThread && !channel.members.me)) {
			await interaction.update({
				components: [],
				content: "I cannot see this channel.",
				embeds: [],
			});

			return;
		}

		if (
			await cannotUsePermissions(
				interaction,
				PermissionFlagsBits.ViewChannel |
					(channel.isThread()
						? PermissionFlagsBits.SendMessagesInThreads
						: PermissionFlagsBits.SendMessages) |
					PermissionFlagsBits.EmbedLinks |
					PermissionFlagsBits.UseExternalEmojis,
			)
		) {
			return;
		}

		await channel.send({ embeds: interaction.message.embeds });

		const components = message.components.map((component) =>
			ActionRowBuilder.from<MessageActionRowComponentBuilder>(component),
		);

		for (const actionRow of components) {
			actionRow.components
				.find(
					(component) =>
						"custom_id" in component.data &&
						component.data.custom_id === CATALOGUE_SHARE_SEND_CUSTOM_ID,
				)
				?.setDisabled();
		}

		await interaction.update({ components, content: "Progress shared!", embeds: [] });
	}

	private remainingCurrency(items: readonly Item[], includeSeasonalCurrency?: boolean) {
		const result = addCosts(
			items
				.filter(({ cosmetics }) => cosmetics.some((cosmetic) => !this.data.includes(cosmetic)))
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
