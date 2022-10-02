import type { ApplicationCommandData, ChatInputCommandInteraction, NewsChannel, TextChannel } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, PermissionFlagsBits } from "discord.js";
import Notification, { isEvent, LightEvent } from "../../Structures/Notification.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
	public readonly name = "notifications";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		if (!interaction.inCachedGuild()) {
			void interaction.client.log(`The \`/${this.name}\` command was used in an uncached guild, somehow.`, interaction);

			await interaction.reply({
				content: `There is no \`/${this.name}\` command in Ba Sing Se.`,
				ephemeral: true,
			});

			return;
		}

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
			await interaction.reply({
				content: "This server has nothing set up.",
				ephemeral: true,
			});

			return;
		}

		await interaction.reply({
			embeds: [await notification.overview()],
			ephemeral: true,
		});
	}

	public async setup(interaction: ChatInputCommandInteraction<"cached">) {
		const { options } = interaction;
		const event = options.getString("event", true);
		// Typed from restrictions placed in the command.
		const channel = options.getChannel("channel", true) as NewsChannel | TextChannel;
		const role = options.getRole("role", true);
		const me = await channel.guild.members.fetchMe();

		if (!isEvent(event)) {
			void interaction.client.log(`Received an unknown notification event: ${event} whilst setting up notifications.`);

			await interaction.reply({
				content: "The dark dragon has obeliterated this event. It's gone... for now.",
				ephemeral: true,
			});

			return;
		}

		const notification = Notification.cache.find(({ guildId }) => interaction.guildId === guildId);

		if (notification && (event === LightEvent.PollutedGeyser && notification.pollutedGeyserChannelId === channel.id && notification.pollutedGeyserRoleId === role.id || event === LightEvent.Grandma && notification.grandmaChannelId === channel.id && notification.grandmaRoleId === role.id || event === LightEvent.Turtle && notification.turtleChannelId === channel.id && notification.turtleRoleId === role.id || event === LightEvent.ShardEruption && notification.shardEruptionChannelId === channel.id && notification.shardEruptionRoleId === role.id)) {
			await interaction.reply({
				// eslint-disable-next-line @typescript-eslint/no-base-to-string
				content: `${event} notifications are already set to mention the role ${role} in ${channel}. There was nothing to do.`,
				ephemeral: true,
			});

			return;
		}

		if (!channel.permissionsFor(me).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages])) {
			await interaction.reply({
				// eslint-disable-next-line @typescript-eslint/no-base-to-string
				content: `\`View Channel\` & \`Send Messages\` are required for ${channel}.`,
				ephemeral: true,
			});

			return;
		}

		if (!role.mentionable && !channel.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone)) {
			await interaction.reply({
				content: `Cannot mention the ${role} role. Ensure \`Mention @everyone, @here and All Roles\` permission is enabled for ${interaction.client.user} in the channel or make the role mentionable.`,
				ephemeral: true,
			});

			return;
		}

		await Notification.setup(interaction, event, channel, role);
	}

	public async unset(interaction: ChatInputCommandInteraction<"cached">) {
		const notification = Notification.cache.find(({ guildId }) => interaction.guildId === guildId);

		if (!notification) {
			await interaction.reply({
				content: "This server has nothing set up.",
				ephemeral: true,
			});

			return;
		}

		const { options } = interaction;
		const event = options.getString("event", true);

		if (!isEvent(event)) {
			void interaction.client.log(`Received an unknown notification event: ${event} whilst setting up notifications.`);

			await interaction.reply({
				content: "The dark dragon has obeliterated this event. It's gone... for now.",
				ephemeral: true,
			});

			return;
		}

		if (event === LightEvent.PollutedGeyser && notification.pollutedGeyserChannelId === null && notification.pollutedGeyserRoleId === null || event === LightEvent.Grandma && notification.grandmaChannelId === null && notification.grandmaRoleId === null || event === LightEvent.Turtle && notification.turtleChannelId === null && notification.turtleRoleId === null || event === LightEvent.ShardEruption && notification.shardEruptionChannelId === null && notification.shardEruptionRoleId === null) {
			await interaction.reply({
				content: `${event} notifications are not already set. There was nothing to do.`,
				ephemeral: true,
			});

			return;
		}

		await notification.unset(interaction, event);
	}

	public get commandData(): ApplicationCommandData {
		const choices = Object.values(LightEvent).map((lightEvent) => ({
			name: lightEvent,
			value: lightEvent,
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
							channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
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
