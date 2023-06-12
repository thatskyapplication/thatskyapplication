import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	PermissionFlagsBits,
} from "discord.js";
import Notification, {
	type NotificationInsertQuery,
	type NotificationUpdateQuery,
	isEvent,
	isNotificationSendable,
	NotificationEvent,
	NOTIFICATION_CHANNEL_TYPES,
} from "../../Structures/Notification.js";
import { cannotUseCustomEmojis } from "../../Utility/Utility.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
	public readonly name = "notifications";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		if (!interaction.inCachedGuild()) {
			void interaction.client.log({
				content: `The \`/${this.name}\` command was used in an uncached guild, somehow.`,
				error: interaction,
			});

			await interaction.reply({ content: `There is no \`/${this.name}\` command in Ba Sing Se.`, ephemeral: true });
			return;
		}

		if (await cannotUseCustomEmojis(interaction)) return;

		switch (interaction.options.getSubcommand()) {
			case "overview":
				await this.overview(interaction);
				return;
			case "setup":
				await this.setup(interaction);
				return;
			case "unset":
				await this.unset(interaction);
		}
	}

	public async overview(interaction: ChatInputCommandInteraction<"cached">) {
		const notification = Notification.cache.find(({ guildId }) => interaction.guildId === guildId);

		if (!notification) {
			await interaction.reply({ content: "This server has nothing set up.", ephemeral: true });
			return;
		}

		await interaction.reply({
			embeds: [await notification.overview(interaction)],
			ephemeral: true,
		});
	}

	public async setup(interaction: ChatInputCommandInteraction<"cached">) {
		const { options } = interaction;
		const event = options.getString("event", true);
		const channel = options.getChannel("channel", true, NOTIFICATION_CHANNEL_TYPES);
		const role = options.getRole("role", true);
		const me = await channel.guild.members.fetchMe();

		if (!isEvent(event)) {
			void interaction.client.log({
				content: `Received an unknown notification event: ${event} whilst setting up notifications.`,
			});

			await interaction.reply({
				content: "The dark dragon has obliterated this event. It's gone... for now.",
				ephemeral: true,
			});

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

		const data: NotificationInsertQuery & NotificationUpdateQuery = { guild_id: interaction.guildId };

		switch (event) {
			case NotificationEvent.PollutedGeyser:
				data.polluted_geyser_channel_id = channel.id;
				data.polluted_geyser_role_id = role.id;
				break;
			case NotificationEvent.Grandma:
				data.grandma_channel_id = channel.id;
				data.grandma_role_id = role.id;
				break;
			case NotificationEvent.Turtle:
				data.turtle_channel_id = channel.id;
				data.turtle_role_id = role.id;
				break;
			case NotificationEvent.EyeOfEden:
				data.eye_of_eden_channel_id = channel.id;
				data.eye_of_eden_role_id = role.id;
				break;
			case NotificationEvent.DailyReset:
				data.daily_reset_channel_id = channel.id;
				data.daily_reset_role_id = role.id;
				break;
			case NotificationEvent.ISS:
				data.iss_channel_id = channel.id;
				data.iss_role_id = role.id;
				break;
			case NotificationEvent.ShardEruption:
				data.shard_eruption_channel_id = channel.id;
				data.shard_eruption_role_id = role.id;
				break;
			case NotificationEvent.AURORA:
				data.aurora_channel_id = channel.id;
				data.aurora_role_id = role.id;
				break;
			case NotificationEvent.Passage:
				data.passage_channel_id = channel.id;
				data.passage_role_id = role.id;
				break;
		}

		await Notification.setup(interaction, data);
	}

	public async unset(interaction: ChatInputCommandInteraction<"cached">) {
		const notification = Notification.cache.find(({ guildId }) => interaction.guildId === guildId);

		if (!notification) {
			await interaction.reply({ content: "This server has nothing set up.", ephemeral: true });
			return;
		}

		const { options } = interaction;
		const event = options.getString("event", true);

		if (!isEvent(event)) {
			void interaction.client.log({
				content: `Received an unknown notification event: ${event} whilst setting up notifications.`,
			});

			await interaction.reply({
				content: "The dark dragon has obliterated this event. It's gone... for now.",
				ephemeral: true,
			});

			return;
		}

		const data: NotificationUpdateQuery = {};

		switch (event) {
			case NotificationEvent.PollutedGeyser:
				data.polluted_geyser_channel_id = null;
				data.polluted_geyser_role_id = null;
				break;
			case NotificationEvent.Grandma:
				data.grandma_channel_id = null;
				data.grandma_role_id = null;
				break;
			case NotificationEvent.Turtle:
				data.turtle_channel_id = null;
				data.turtle_role_id = null;
				break;
			case NotificationEvent.EyeOfEden:
				data.eye_of_eden_channel_id = null;
				data.eye_of_eden_role_id = null;
				break;
			case NotificationEvent.DailyReset:
				data.daily_reset_channel_id = null;
				data.daily_reset_role_id = null;
				break;
			case NotificationEvent.ISS:
				data.iss_channel_id = null;
				data.iss_role_id = null;
				break;
			case NotificationEvent.ShardEruption:
				data.shard_eruption_channel_id = null;
				data.shard_eruption_role_id = null;
				break;
			case NotificationEvent.AURORA:
				data.aurora_channel_id = null;
				data.aurora_role_id = null;
				break;
			case NotificationEvent.Passage:
				data.passage_channel_id = null;
				data.passage_role_id = null;
				break;
		}

		await notification.unset(interaction, data);
	}

	public get commandData(): ApplicationCommandData {
		const choices = Object.values(NotificationEvent).map((notificationEvent) => ({
			name: notificationEvent,
			value: notificationEvent,
		}));

		return {
			name: this.name,
			description: "The command to set up notifications for events.",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "overview",
					description: "Shows the notifications in this server.",
				},
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
							choices,
						},
						{
							type: ApplicationCommandOptionType.Channel,
							name: "channel",
							description: "The channel to send notifications in.",
							required: true,
							// @ts-expect-error Too narrow.
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
					name: "unset",
					description: "Unsets a notification in the server.",
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "event",
							description: "The event to unset.",
							required: true,
							choices,
						},
					],
				},
			],
			defaultMemberPermissions: PermissionFlagsBits.ManageGuild,
			dmPermission: false,
		};
	}
}
