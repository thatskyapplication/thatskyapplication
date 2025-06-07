import {
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
	STANDARD_SPIRITS,
	type SeasonIds,
	type SeasonalSpirit,
	type SpiritIds,
	type StandardSpirit,
	skyEvents,
	skySeasons,
	spirits,
} from "@thatskyapplication/utility";
import { NESTING_WORKSHOP } from "../data/nesting-workshop.js";
import { PERMANENT_EVENT_STORE } from "../data/permanent-event-store.js";
import { SECRET_AREA } from "../data/secret-area.js";
import { STARTER_PACKS } from "../data/starter-packs.js";
import { client } from "../discord.js";
import type { CataloguePacket } from "../features/catalogue.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { CatalogueType } from "../utility/catalogue.js";
import { DEFAULT_EMBED_COLOUR, ERROR_RESPONSE_COMPONENTS_V2 } from "../utility/constants.js";
import { CosmeticToEmoji, MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
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
