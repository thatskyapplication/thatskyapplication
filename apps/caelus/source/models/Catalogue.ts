import type {
	APIMessageComponentButtonInteraction,
	APIMessageComponentSelectMenuInteraction,
	Snowflake,
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
import { ERROR_RESPONSE_COMPONENTS_V2 } from "../utility/constants.js";
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
		await viewStarterPacks(interaction);
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
