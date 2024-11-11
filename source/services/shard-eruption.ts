import {
	type APIButtonComponentWithCustomId,
	type APIEmbed,
	ButtonStyle,
	type ChannelsAPI,
	ComponentType,
	type Locale,
} from "@discordjs/core";
import { t } from "i18next";
import { DateTime } from "luxon";
import { DEFAULT_EMBED_COLOUR } from "../utility/constants.js";
import { TIME_ZONE, dateRangeString, dateString, skyToday } from "../utility/dates.js";
import {
	MAXIMUM_OPTION_NUMBER,
	SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS,
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH,
	SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID,
	resolveShardEruptionEmoji,
	shardEruption,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../utility/shard-eruption.js";

function generateShardEruptionSelectMenuOptions(
	date: DateTime,
	indexStart: number,
	offset: number,
	locale: Locale,
) {
	const options = [];
	const maximumIndex = MAXIMUM_OPTION_NUMBER + indexStart;

	for (let index = indexStart; index < maximumIndex; index++) {
		const shardNow = shardEruption(index + offset);

		const stringSelectMenuOption = new StringSelectMenuOptionBuilder()
			.setLabel(dateString(date.plus({ days: index }), locale))
			.setValue(String(index + offset));

		if (shardNow) {
			stringSelectMenuOption.setEmoji(resolveShardEruptionEmoji(shardNow.strong));
		} else {
			stringSelectMenuOption.setDescription("No shard eruption.");
		}

		options.push(stringSelectMenuOption);
	}

	return options;
}

async function hasExpired(interaction: ChatInputCommandInteraction | MessageComponentInteraction) {
	const today = skyToday();
	const fromMessageComponent = interaction.isMessageComponent();

	if (fromMessageComponent) {
		const { message } = interaction;

		const expiresAt = DateTime.fromMillis(message.createdTimestamp, { zone: TIME_ZONE }).endOf(
			"day",
		);

		if (today > expiresAt) {
			const hasEmbeds = message.embeds.length > 0;
			const expiryMessage = "This command has expired. Run it again!";

			if (hasEmbeds) {
				await interaction.update({ components: [] });

				await interaction.followUp({
					content: expiryMessage,
					flags: MessageFlags.Ephemeral,
				});
			} else {
				await interaction.update({
					components: [],
					content: expiryMessage,
				});
			}

			return true;
		}
	}

	return false;
}

export async function today(
	interaction: ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction,
	offset = 0,
) {
	if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
		return;
	}

	if (await hasExpired(interaction)) {
		return;
	}

	const response = todayEmbed(interaction.locale, offset);

	if (interaction.isMessageComponent()) {
		await interaction.update(response);
	} else {
		await interaction.reply(response);
	}
}

export function todayEmbed(
	locale: Locale,
	offset = 0,
): Parameters<ChannelsAPI["createMessage"]>[1] {
	const shardYesterday = shardEruption(offset - 1);
	const shardToday = shardEruption(offset);
	const shard = shardEruption();
	const shardTomorrow = shardEruption(offset + 1);

	const embed: APIEmbed = {
		color: DEFAULT_EMBED_COLOUR,
		title: dateString(skyToday().plus({ days: offset }), locale),
	};

	const buttonYesterday: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID}§${offset - 1}`,
		label: t("back", { lng: locale, ns: "general" }),
		style: ButtonStyle.Primary,
	};

	const button: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID,
		disabled: offset === 0,
		label: "Today",
		style: ButtonStyle.Success,
	};

	const buttonTomorrow: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID}§${offset + 1}`,
		label: t("next", { lng: locale, ns: "general" }),
		style: ButtonStyle.Primary,
	};

	if (shardYesterday) {
		buttonYesterday.emoji = resolveShardEruptionEmoji(shardYesterday.strong);
	}

	if (shardToday) {
		embed.fields = [
			{
				name: "Information",
				value: shardEruptionInformationString(shardToday, false, locale),
				inline: true,
			},
			{
				name: "Timestamps",
				value: shardEruptionTimestampsString(shardToday),
				inline: true,
			},
		];

		embed.image = { url: String(shardToday.url) };
	} else {
		embed.description = `There are no shard eruptions ${offset === 0 ? "today" : "on this day"}.`;
	}

	if (shard) {
		button.emoji = resolveShardEruptionEmoji(shard.strong);
	}

	if (shardTomorrow) {
		buttonTomorrow.emoji = resolveShardEruptionEmoji(shardTomorrow.strong);
	}

	return {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					buttonYesterday,
					button,
					buttonTomorrow,
					{
						type: ComponentType.Button,
						custom_id: `${SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID}§${offset}`,
						emoji: { name: "🌐" },
						label: "Browse",
						style: ButtonStyle.Secondary,
					},
				],
			},
		],
		embeds: [embed],
	};
}

export async function browse(
	interaction: ButtonInteraction | ChatInputCommandInteraction,
	offset = 0,
) {
	if (await hasExpired(interaction)) {
		return;
	}

	const { locale } = interaction;
	const shardToday = skyToday().plus({ days: offset });

	const response = {
		components: [
			...SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.map((customId, index) => {
				const currentIndex = MAXIMUM_OPTION_NUMBER * index;

				return new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(customId)
						.setMaxValues(1)
						.setMinValues(1)
						.setPlaceholder(
							dateRangeString(
								shardToday.plus({ days: currentIndex }),
								shardToday.plus({ days: MAXIMUM_OPTION_NUMBER * (index + 1) - 1 }),
								locale,
							),
						)
						.setOptions(
							generateShardEruptionSelectMenuOptions(shardToday, currentIndex, offset, locale),
						),
				);
			}),
			new ActionRowBuilder<ButtonBuilder>().setComponents(
				new ButtonBuilder()
					.setCustomId(
						`${SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID}§${
							offset - MAXIMUM_OPTION_NUMBER * SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH
						}`,
					)
					.setLabel(t("back", { lng: locale, ns: "general" }))
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID)
					.setDisabled(offset === 0)
					.setLabel("Today")
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId(
						`${SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID}§${
							offset + MAXIMUM_OPTION_NUMBER * SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH
						}`,
					)
					.setLabel(t("next", { lng: locale, ns: "general" }))
					.setStyle(ButtonStyle.Primary),
			),
		],
		embeds: [],
	};

	if (interaction instanceof ButtonInteraction) {
		await interaction.update(response);
	} else {
		await interaction.reply(response);
	}
}
