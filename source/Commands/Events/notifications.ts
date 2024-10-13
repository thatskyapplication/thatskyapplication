import {
	ActionRowBuilder,
	type ApplicationCommandData,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type ChatInputCommandInteraction,
	ComponentType,
	DiscordjsError,
	DiscordjsErrorCodes,
	EmbedBuilder,
	MessageFlags,
	PermissionFlagsBits,
	StringSelectMenuBuilder,
	type StringSelectMenuInteraction,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { t } from "i18next";
import Notification, {
	type NotificationInsertQuery,
	type NotificationUpdateQuery,
	isEvent,
	isNotificationSendable,
	isNotificationOffset,
	NOTIFICATION_SETUP_OFFSET_CUSTOM_ID,
	NotificationOffsetToMaximumValues,
} from "../../Structures/Notification.js";
import {
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE,
	NOTIFICATION_CHANNEL_TYPES,
	NOTIFICATION_EVENT_VALUES,
	NOT_IN_CACHED_GUILD_RESPONSE,
	NotificationEvent,
} from "../../Utility/Constants.js";
import { cannotUsePermissions } from "../../Utility/permissionChecks.js";
import pino from "../../pino.js";
import type { ChatInputCommand } from "../index.js";

const notificationEventChoices = NOTIFICATION_EVENT_VALUES.map((notificationEvent) => ({
	name: notificationEvent,
	value: notificationEvent,
}));

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "notifications",
		description: "The command to set up notifications for events.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "setup",
				description: "Sets up notifications in the server.",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "event",
						description: "The event to set.",
						required: true,
						choices: notificationEventChoices,
					},
					{
						type: ApplicationCommandOptionType.Channel,
						name: "channel",
						description: "The channel to send notifications in.",
						required: true,
						channelTypes: NOTIFICATION_CHANNEL_TYPES,
					},
					{
						type: ApplicationCommandOptionType.Role,
						name: "role",
						description: "The role to mention.",
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "status",
				description: "Shows the status of notifications in this server.",
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "unset",
				description: "Unsets a notification in the server.",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "event",
						description: "The event to unset.",
						required: true,
						choices: notificationEventChoices,
					},
				],
			},
		],
		defaultMemberPermissions: PermissionFlagsBits.ManageGuild,
		integrationTypes: [0],
		contexts: [0],
	} as const satisfies Readonly<ApplicationCommandData>;

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
		const event = options.getString("event", true);
		const channel = options.getChannel("channel", true, NOTIFICATION_CHANNEL_TYPES);
		const role = options.getRole("role", true);

		if (!isEvent(event)) {
			pino.error(
				interaction,
				"Received an unknown notification event whilst setting up notifications.",
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

		if (isNotificationOffset(event)) {
			const options = [];
			const maximumOffset = NotificationOffsetToMaximumValues[event];

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
						.setTitle(event),
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

		const data: NotificationInsertQuery & NotificationUpdateQuery = {
			guild_id: resolvedInteraction.guildId,
		};

		switch (event) {
			case NotificationEvent.PollutedGeyser: {
				data.polluted_geyser_channel_id = channel.id;
				data.polluted_geyser_role_id = role.id;
				data.polluted_geyser_sendable = true;
				data.polluted_geyser_offset = offset as number;
				break;
			}
			case NotificationEvent.Grandma: {
				data.grandma_channel_id = channel.id;
				data.grandma_role_id = role.id;
				data.grandma_sendable = true;
				data.grandma_offset = offset as number;
				break;
			}
			case NotificationEvent.Turtle: {
				data.turtle_channel_id = channel.id;
				data.turtle_role_id = role.id;
				data.turtle_sendable = true;
				data.turtle_offset = offset as number;
				break;
			}
			case NotificationEvent.EyeOfEden: {
				data.eye_of_eden_channel_id = channel.id;
				data.eye_of_eden_role_id = role.id;
				data.eye_of_eden_sendable = true;
				break;
			}
			case NotificationEvent.DailyReset: {
				data.daily_reset_channel_id = channel.id;
				data.daily_reset_role_id = role.id;
				data.daily_reset_sendable = true;
				break;
			}
			case NotificationEvent.ISS: {
				data.iss_channel_id = channel.id;
				data.iss_role_id = role.id;
				data.iss_sendable = true;
				break;
			}
			case NotificationEvent.RegularShardEruption: {
				data.regular_shard_eruption_channel_id = channel.id;
				data.regular_shard_eruption_role_id = role.id;
				data.regular_shard_eruption_sendable = true;
				data.regular_shard_eruption_offset = offset as number;
				break;
			}
			case NotificationEvent.StrongShardEruption: {
				data.strong_shard_eruption_channel_id = channel.id;
				data.strong_shard_eruption_role_id = role.id;
				data.strong_shard_eruption_sendable = true;
				data.strong_shard_eruption_offset = offset as number;
				break;
			}
			case NotificationEvent.AURORA: {
				data.aurora_channel_id = channel.id;
				data.aurora_role_id = role.id;
				data.aurora_sendable = true;
				data.aurora_offset = offset as number;
				break;
			}
			case NotificationEvent.Passage: {
				data.passage_channel_id = channel.id;
				data.passage_role_id = role.id;
				data.passage_sendable = true;
				data.passage_offset = offset as number;
				break;
			}
			case NotificationEvent.AviarysFireworkFestival: {
				data.aviarys_firework_festival_channel_id = channel.id;
				data.aviarys_firework_festival_role_id = role.id;
				data.aviarys_firework_festival_sendable = true;
				break;
			}
			case NotificationEvent.Dragon: {
				data.dragon_channel_id = channel.id;
				data.dragon_role_id = role.id;
				data.dragon_sendable = true;
				break;
			}
		}

		await Notification.setup(resolvedInteraction, data);
	}

	public async status(interaction: ChatInputCommandInteraction<"cached">) {
		const notification = Notification.cache.get(interaction.guildId);

		if (!notification) {
			await interaction.reply({ content: "This server has nothing set up.", ephemeral: true });
			return;
		}

		await interaction.reply({
			embeds: [await notification.embed(interaction)],
			ephemeral: true,
		});
	}

	public async unset(interaction: ChatInputCommandInteraction<"cached">) {
		const { guildId, options } = interaction;
		const notification = Notification.cache.get(guildId);

		if (!notification) {
			await interaction.reply({ content: "This server has nothing set up.", ephemeral: true });
			return;
		}

		const event = options.getString("event", true);

		if (!isEvent(event)) {
			pino.error(
				interaction,
				"Received an unknown notification event whilst setting up notifications.",
			);

			await interaction.reply(ERROR_RESPONSE);
			return;
		}

		const data: NotificationUpdateQuery = {};

		switch (event) {
			case NotificationEvent.PollutedGeyser: {
				data.polluted_geyser_channel_id = null;
				data.polluted_geyser_role_id = null;
				data.polluted_geyser_sendable = false;
				break;
			}
			case NotificationEvent.Grandma: {
				data.grandma_channel_id = null;
				data.grandma_role_id = null;
				data.grandma_sendable = false;
				break;
			}
			case NotificationEvent.Turtle: {
				data.turtle_channel_id = null;
				data.turtle_role_id = null;
				data.turtle_sendable = false;
				break;
			}
			case NotificationEvent.EyeOfEden: {
				data.eye_of_eden_channel_id = null;
				data.eye_of_eden_role_id = null;
				data.eye_of_eden_sendable = false;
				break;
			}
			case NotificationEvent.DailyReset: {
				data.daily_reset_channel_id = null;
				data.daily_reset_role_id = null;
				data.daily_reset_sendable = false;
				break;
			}
			case NotificationEvent.ISS: {
				data.iss_channel_id = null;
				data.iss_role_id = null;
				data.iss_sendable = false;
				break;
			}
			case NotificationEvent.RegularShardEruption: {
				data.regular_shard_eruption_channel_id = null;
				data.regular_shard_eruption_role_id = null;
				data.regular_shard_eruption_sendable = false;
				break;
			}
			case NotificationEvent.StrongShardEruption: {
				data.strong_shard_eruption_channel_id = null;
				data.strong_shard_eruption_role_id = null;
				data.strong_shard_eruption_sendable = false;
				break;
			}
			case NotificationEvent.AURORA: {
				data.aurora_channel_id = null;
				data.aurora_role_id = null;
				data.aurora_sendable = false;
				break;
			}
			case NotificationEvent.Passage: {
				data.passage_channel_id = null;
				data.passage_role_id = null;
				data.passage_sendable = false;
				break;
			}
			case NotificationEvent.AviarysFireworkFestival: {
				data.aviarys_firework_festival_channel_id = null;
				data.aviarys_firework_festival_role_id = null;
				data.aviarys_firework_festival_sendable = false;
				break;
			}
			case NotificationEvent.Dragon: {
				data.dragon_channel_id = null;
				data.dragon_role_id = null;
				data.dragon_sendable = false;
				break;
			}
		}

		await notification.unset(interaction, data);
	}
})();
