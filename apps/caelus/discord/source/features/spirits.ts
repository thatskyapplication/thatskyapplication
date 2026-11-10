import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteractionDataIntegerOption,
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentButtonInteraction,
	ButtonStyle,
	ComponentType,
	MessageFlags,
} from "@discordjs/core";
import { getFixedT, t } from "i18next";
import {
	isSpiritsHistoryOrderType,
	type SpiritIds,
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
	spiritContainer,
	spirits,
	spiritsHistoryContainer,
} from "@thatskyapplication/utility";
import { client } from "../discord.js";
import pino from "../pino.js";
import { MAXIMUM_AUTOCOMPLETE_CHOICES_LIMIT } from "../utility/constants.js";
import { CustomId } from "../utility/custom-id.js";
import { EMOJIS } from "../utility/emojis.js";
import {
	friendshipTreeFileName,
	friendshipTreeImage,
	friendshipTreeVariants,
	isFriendshipTreeImageCached,
} from "../utility/friendship-tree.js";

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
							let action = null;
							const isSeasonalSpirit = spirit.isSeasonalSpirit();

							if (spirit.isStandardSpirit() || isSeasonalSpirit) {
								action = spirit.action?.toUpperCase() ?? null;
							}

							const seasonName =
								isSeasonalSpirit || spirit.isGuideSpirit()
									? t(`seasons.${spirit.seasonId}`, { lng: locale, ns: "general" }).toUpperCase()
									: null;

							return (
								localisedName.toUpperCase().includes(value) ||
								keywords.some((keyword) => keyword.toUpperCase().includes(value)) ||
								action?.toUpperCase().includes(value) ||
								seasonName?.includes(value)
							);
						})
						.map(({ id }) => ({
							name: t(`spirits.${id}`, { lng: locale, ns: "general" }),
							value: id,
						}))
						.slice(0, MAXIMUM_AUTOCOMPLETE_CHOICES_LIMIT),
	});
}

interface SpiritsViewSpiritOptions {
	flags?: MessageFlags;
}

export async function spiritsViewSpirit(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
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

	const variants = friendshipTreeVariants(spirit);
	const deferred = variants.some((variant) => !isFriendshipTreeImageCached(spirit.id, variant));

	if (deferred) {
		await client.api.interactions.defer(interaction.id, interaction.token, {
			flags: resolvedFlags & MessageFlags.Ephemeral,
		});
	}

	const images = await Promise.all(
		variants.map(async (variant) => {
			const data = await friendshipTreeImage(spirit, variant).catch((error: unknown) => {
				pino.error(error, "Failed to render a friendship tree.");
				return null;
			});

			return data ? { name: friendshipTreeFileName(variant), data } : null;
		}),
	);

	const files = images.filter((image) => image !== null);

	const response = {
		components: [
			spiritContainer({
				emojis: EMOJIS,
				locale,
				spirit,
				t: getFixedT(locale),
				friendshipTreeImageURLs: files.map(({ name }) => `attachment://${name}`),
			}),
		],
		flags: resolvedFlags,
		files,
	};

	if (deferred) {
		await client.api.interactions.editReply(
			interaction.application_id,
			interaction.token,
			response,
		);
	} else {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	}
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

	const { container, maximumPage } = spiritsHistoryContainer({
		locale,
		page,
		t: getFixedT(locale),
		type,
		viewButton: (spiritId, index) => ({
			type: ComponentType.Button,
			style: ButtonStyle.Secondary,
			// We add the index to prevent custom id duplication.
			custom_id: `${CustomId.SpiritsViewSpirit}§${spiritId}§${index}`,
			label: t("view", { lng: locale, ns: "general" }),
		}),
	});

	container.components.push({
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
	});

	const response = {
		components: [container],
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
