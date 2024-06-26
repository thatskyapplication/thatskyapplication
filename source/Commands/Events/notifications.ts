import {
	type ApplicationCommandData,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type ChatInputCommandInteraction,
	PermissionFlagsBits,
} from "discord.js";
import Notification, {
	type NotificationInsertQuery,
	type NotificationUpdateQuery,
	isEvent,
	isNotificationSendable,
	NotificationEvent,
	NOTIFICATION_CHANNEL_TYPES,
	NOTIFICATION_EVENT_VALUES,
} from "../../Structures/Notification.js";
import { ERROR_RESPONSE, NOT_IN_CACHED_GUILD_RESPONSE } from "../../Utility/Constants.js";
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
		const { options } = interaction;
		const event = options.getString("event", true);
		const channel = options.getChannel("channel", true, NOTIFICATION_CHANNEL_TYPES);
		const role = options.getRole("role", true);
		const me = await channel.guild.members.fetchMe();

		if (!isEvent(event)) {
			pino.error(
				interaction,
				"Received an unknown notification event whilst setting up notifications.",
			);

			await interaction.reply(ERROR_RESPONSE);
			return;
		}

		const notificationSendable = isNotificationSendable(channel, role, me, true);

		if (notificationSendable.length > 0) {
			await interaction.reply({
				content: notificationSendable.join("\n"),
				ephemeral: true,
			});

			return;
		}

		const data: NotificationInsertQuery & NotificationUpdateQuery = {
			guild_id: interaction.guildId,
		};

		switch (event) {
			case NotificationEvent.PollutedGeyser: {
				data.polluted_geyser_channel_id = channel.id;
				data.polluted_geyser_role_id = role.id;
				break;
			}
			case NotificationEvent.Grandma: {
				data.grandma_channel_id = channel.id;
				data.grandma_role_id = role.id;
				break;
			}
			case NotificationEvent.Turtle: {
				data.turtle_channel_id = channel.id;
				data.turtle_role_id = role.id;
				break;
			}
			case NotificationEvent.EyeOfEden: {
				data.eye_of_eden_channel_id = channel.id;
				data.eye_of_eden_role_id = role.id;
				break;
			}
			case NotificationEvent.DailyReset: {
				data.daily_reset_channel_id = channel.id;
				data.daily_reset_role_id = role.id;
				break;
			}
			case NotificationEvent.ISS: {
				data.iss_channel_id = channel.id;
				data.iss_role_id = role.id;
				break;
			}
			case NotificationEvent.RegularShardEruption: {
				data.regular_shard_eruption_channel_id = channel.id;
				data.regular_shard_eruption_role_id = role.id;
				break;
			}
			case NotificationEvent.StrongShardEruption: {
				data.strong_shard_eruption_channel_id = channel.id;
				data.strong_shard_eruption_role_id = role.id;
				break;
			}
			case NotificationEvent.AURORA: {
				data.aurora_channel_id = channel.id;
				data.aurora_role_id = role.id;
				break;
			}
			case NotificationEvent.Passage: {
				data.passage_channel_id = channel.id;
				data.passage_role_id = role.id;
				break;
			}
			case NotificationEvent.AviarysFireworkFestival: {
				data.aviarys_firework_festival_channel_id = channel.id;
				data.aviarys_firework_festival_role_id = role.id;
				break;
			}
			case NotificationEvent.Dragon: {
				data.dragon_channel_id = channel.id;
				data.dragon_role_id = role.id;
				break;
			}
		}

		await Notification.setup(interaction, data);
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
				break;
			}
			case NotificationEvent.Grandma: {
				data.grandma_channel_id = null;
				data.grandma_role_id = null;
				break;
			}
			case NotificationEvent.Turtle: {
				data.turtle_channel_id = null;
				data.turtle_role_id = null;
				break;
			}
			case NotificationEvent.EyeOfEden: {
				data.eye_of_eden_channel_id = null;
				data.eye_of_eden_role_id = null;
				break;
			}
			case NotificationEvent.DailyReset: {
				data.daily_reset_channel_id = null;
				data.daily_reset_role_id = null;
				break;
			}
			case NotificationEvent.ISS: {
				data.iss_channel_id = null;
				data.iss_role_id = null;
				break;
			}
			case NotificationEvent.RegularShardEruption: {
				data.regular_shard_eruption_channel_id = null;
				data.regular_shard_eruption_role_id = null;
				break;
			}
			case NotificationEvent.StrongShardEruption: {
				data.strong_shard_eruption_channel_id = null;
				data.strong_shard_eruption_role_id = null;
				break;
			}
			case NotificationEvent.AURORA: {
				data.aurora_channel_id = null;
				data.aurora_role_id = null;
				break;
			}
			case NotificationEvent.Passage: {
				data.passage_channel_id = null;
				data.passage_role_id = null;
				break;
			}
			case NotificationEvent.AviarysFireworkFestival: {
				data.aviarys_firework_festival_channel_id = null;
				data.aviarys_firework_festival_role_id = null;
				break;
			}
			case NotificationEvent.Dragon: {
				data.dragon_channel_id = null;
				data.dragon_role_id = null;
				break;
			}
		}

		await notification.unset(interaction, data);
	}
})();
