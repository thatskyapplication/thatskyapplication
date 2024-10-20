import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	type ChatInputCommandInteraction,
	Locale,
	type MessageComponentInteraction,
	MessageFlags,
	PermissionFlagsBits,
	StringSelectMenuBuilder,
	type StringSelectMenuInteraction,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { t } from "i18next";
import { DateTime } from "luxon";
import {
	SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS,
	SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID,
	todayEmbed,
} from "../../Structures/ShardEruption.js";
import { TIME_ZONE, dateRangeString, dateString, skyToday } from "../../Utility/dates.js";
import { cannotUsePermissions } from "../../Utility/permissionChecks.js";
import { resolveShardEruptionEmoji, shardEruption } from "../../Utility/shardEruption.js";
import type { ChatInputCommand } from "../index.js";

const SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH =
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.length;

const MAXIMUM_OPTION_NUMBER = 25 as const;

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

export default new (class implements ChatInputCommand {
	public readonly name = t("shard-eruption.command-name", {
		lng: Locale.EnglishGB,
		ns: "commands",
	});

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "browse": {
				await this.browse(interaction);
				return;
			}
			case "today": {
				await this.today(interaction);
			}
		}
	}

	private async hasExpired(interaction: ChatInputCommandInteraction | MessageComponentInteraction) {
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

	public async today(
		interaction: ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction,
		offset = 0,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		if (await this.hasExpired(interaction)) {
			return;
		}

		const response = todayEmbed(interaction.locale, offset);

		if (interaction.isMessageComponent()) {
			await interaction.update(response);
		} else {
			await interaction.reply(response);
		}
	}

	public async browse(interaction: ButtonInteraction | ChatInputCommandInteraction, offset = 0) {
		if (await this.hasExpired(interaction)) {
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
})();
