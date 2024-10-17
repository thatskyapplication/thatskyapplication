import {
	ActionRowBuilder,
	type ChatInputCommandInteraction,
	ComponentType,
	DiscordjsError,
	DiscordjsErrorCodes,
	EmbedBuilder,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
	StringSelectMenuBuilder,
	type StringSelectMenuInteraction,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { t } from "i18next";
import Notification, {
	isNotificationSendable,
	isNotificationOffset,
	NOTIFICATION_SETUP_OFFSET_CUSTOM_ID,
	NotificationOffsetToMaximumValues,
	isNotificationType,
} from "../../Structures/Notification.js";
import {
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE,
	NOTIFICATION_CHANNEL_TYPES,
	NOT_IN_CACHED_GUILD_RESPONSE,
} from "../../Utility/Constants.js";
import { cannotUsePermissions } from "../../Utility/permissionChecks.js";
import pino from "../../pino.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly name = t("notifications.command-name", { lng: Locale.EnglishGB, ns: "commands" });

	public async chatInput(interaction: ChatInputCommandInteraction) {
		if (!interaction.inCachedGuild()) {
			await interaction.reply(NOT_IN_CACHED_GUILD_RESPONSE);
			return;
		}

		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		switch (interaction.options.getSubcommand()) {
			case "setup": {
				await this.setup(interaction);
				return;
			}
			case "status": {
				await this.status(interaction);
				return;
			}
			case "unset": {
				await this.unset(interaction);
			}
		}
	}

	public async setup(interaction: ChatInputCommandInteraction<"cached">) {
		const { locale, options } = interaction;
		const notificationType = options.getInteger("notification", true);
		const channel = options.getChannel("channel", true, NOTIFICATION_CHANNEL_TYPES);
		const role = options.getRole("role", true);

		if (!isNotificationType(notificationType)) {
			pino.error(
				interaction,
				"Received an unknown notification type whilst setting up notifications.",
			);

			await interaction.reply(ERROR_RESPONSE);
			return;
		}

		if (role.id === interaction.guildId) {
			await interaction.reply({
				content: t("notifications.setup.no-everyone", { lng: locale, ns: "commands" }),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const me = await channel.guild.members.fetchMe();
		const notificationSendable = isNotificationSendable(channel, role, me, true);

		if (notificationSendable.length > 0) {
			await interaction.reply({
				content: notificationSendable.join("\n"),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		// Some notifications may allow an offset.
		let offset = null;

		let resolvedInteraction:
			| ChatInputCommandInteraction<"cached">
			| StringSelectMenuInteraction<"cached"> = interaction;

		if (isNotificationOffset(notificationType)) {
			const options = [];
			const maximumOffset = NotificationOffsetToMaximumValues[notificationType];

			for (let index = 0; index <= maximumOffset; index++) {
				const indexString = String(index);

				const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
					.setLabel(indexString)
					.setValue(indexString);

				if (index === 0) {
					stringSelectMenuOptionBuilder.setDescription("Notify as soon as the event occurs.");
				}

				options.push(stringSelectMenuOptionBuilder);
			}

			const message = await resolvedInteraction.reply({
				components: [
					new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
						new StringSelectMenuBuilder()
							.setCustomId(NOTIFICATION_SETUP_OFFSET_CUSTOM_ID)
							.setMaxValues(1)
							.setMinValues(1)
							.setOptions(options)
							.setPlaceholder("Offset notification by how many minutes?"),
					),
				],
				embeds: [
					new EmbedBuilder()
						.setColor(DEFAULT_EMBED_COLOUR)
						.setDescription(
							"You may choose a custom offset for this notification event. This will decide how many minutes prior notifications will be delivered.",
						)
						.setTitle(t(`notification-types.${notificationType}`, { lng: locale, ns: "general" })),
				],
				fetchReply: true,
				flags: MessageFlags.Ephemeral,
			});

			try {
				resolvedInteraction = await message.awaitMessageComponent({
					componentType: ComponentType.StringSelect,
					filter: (responseInteraction) =>
						responseInteraction.customId === NOTIFICATION_SETUP_OFFSET_CUSTOM_ID,
					time: 60000,
				});

				offset = Number(resolvedInteraction.values[0]);
			} catch (error) {
				if (
					error instanceof DiscordjsError &&
					error.code === DiscordjsErrorCodes.InteractionCollectorError
				) {
					await resolvedInteraction.editReply({
						components: [],
						content:
							"Couldn't make a choice? We've stopped setting up notifications for now. Feel free to try again!",
						embeds: [],
					});

					return;
				}

				pino.error(error, "Error whilst awaiting a response regarding a notification offset.");
				await resolvedInteraction.editReply(ERROR_RESPONSE);
				return;
			}
		}

		await Notification.setup(resolvedInteraction, {
			guildId: resolvedInteraction.guildId,
			type: notificationType,
			channelId: channel.id,
			roleId: role.id,
			// In case of no offset, default to 0.
			// In the future, this will always be present as everything will have an offset.
			offset: offset ?? 0,
			sendable: true,
		});
	}

	public async status(interaction: ChatInputCommandInteraction<"cached">) {
		await interaction.reply({
			embeds: [await Notification.embed(interaction)],
			flags: MessageFlags.Ephemeral,
		});
	}

	public async unset(interaction: ChatInputCommandInteraction<"cached">) {
		const notificationType = interaction.options.getInteger("notification", true);

		if (!isNotificationType(notificationType)) {
			pino.error(
				interaction,
				"Received an unknown notification type whilst setting up notifications.",
			);

			await interaction.reply(ERROR_RESPONSE);
			return;
		}

		await Notification.unset(interaction, notificationType);
	}
})();
