import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	type Snowflake,
	type StringSelectMenuInteraction,
	StringSelectMenuBuilder,
	ActionRowBuilder,
	ApplicationCommandType,
	Collection,
	PermissionsBitField,
} from "discord.js";
import Notification, { NotificationEvent } from "../../Structures/Notification.js";
import type { ChatInputCommand } from "../index.js";

export const ROLES_SELECT_MENU_CUSTOM_ID = "SELFROLE" as const;

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "roles",
		description: "Self-assign roles!",
		type: ApplicationCommandType.ChatInput,
		dmPermission: false,
	} as const satisfies Readonly<ApplicationCommandData>;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		if (!interaction.inCachedGuild()) {
			const { name } = this.data;

			void interaction.client.log({
				content: `The \`/${name}\` command was used in an uncached guild, somehow.`,
				error: interaction,
			});

			await interaction.reply({ content: `There is no \`/${name}\` command in Ba Sing Se.`, ephemeral: true });
			return;
		}

		await this.execute(interaction);
	}

	public populate(notification: Notification) {
		const roles = new Collection<NotificationEvent, Snowflake>();
		const {
			pollutedGeyserChannelId,
			pollutedGeyserRoleId,
			grandmaChannelId,
			grandmaRoleId,
			turtleChannelId,
			turtleRoleId,
			eyeOfEdenChannelId,
			eyeOfEdenRoleId,
			dailyResetChannelId,
			dailyResetRoleId,
			issChannelId,
			issRoleId,
			shardEruptionChannelId,
			shardEruptionRoleId,
			auroraChannelId,
			auroraRoleId,
			passageChannelId,
			passageRoleId,
		} = notification;

		if (pollutedGeyserChannelId && pollutedGeyserRoleId) {
			roles.set(NotificationEvent.PollutedGeyser, pollutedGeyserRoleId);
		}

		if (grandmaChannelId && grandmaRoleId) roles.set(NotificationEvent.Grandma, grandmaRoleId);
		if (turtleChannelId && turtleRoleId) roles.set(NotificationEvent.Turtle, turtleRoleId);
		if (eyeOfEdenChannelId && eyeOfEdenRoleId) roles.set(NotificationEvent.EyeOfEden, eyeOfEdenRoleId);
		if (dailyResetChannelId && dailyResetRoleId) roles.set(NotificationEvent.DailyReset, dailyResetRoleId);
		if (issChannelId && issRoleId) roles.set(NotificationEvent.ISS, issRoleId);
		if (shardEruptionChannelId && shardEruptionRoleId) roles.set(NotificationEvent.ShardEruption, shardEruptionRoleId);
		if (auroraChannelId && auroraRoleId) roles.set(NotificationEvent.AURORA, auroraRoleId);
		if (passageChannelId && passageRoleId) roles.set(NotificationEvent.Passage, passageRoleId);
		return roles;
	}

	public async execute(interaction: ChatInputCommandInteraction<"cached">) {
		const notification = Notification.cache.find(({ guildId }) => guildId === interaction.guildId);

		if (!notification) {
			await interaction.reply({ content: "This server hasn't set up self-role assignment.", ephemeral: true });
			return;
		}

		if (!(await interaction.guild.members.fetchMe()).permissions.has(PermissionsBitField.Flags.ManageRoles)) {
			await interaction.reply({ content: "Missing the `Manage Roles` permission.", ephemeral: true });
			return;
		}

		const options = this.populate(notification);

		if (options.size === 0) {
			await interaction.reply({ content: "There are no roles to self-assign.", ephemeral: true });
			return;
		}

		const selectMenu = new StringSelectMenuBuilder()
			.setCustomId(ROLES_SELECT_MENU_CUSTOM_ID)
			.setMaxValues(options.size)
			.setMinValues(0)
			.setOptions(
				options.map((roleId, event) => ({
					default: interaction.member.roles.cache.has(roleId),
					label: event,
					value: roleId,
				})),
			)
			.setPlaceholder("Select some roles!");

		const actionRow = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(selectMenu);

		await interaction.reply({
			content: "Self-assign roles to receive notifications!",
			components: [actionRow],
			ephemeral: true,
		});
	}

	public async apply(interaction: StringSelectMenuInteraction<"cached">) {
		const notification = Notification.cache.find(({ guildId }) => guildId === interaction.guildId);

		if (!notification) {
			await interaction.reply({ content: "A strange error occurred. This is being tracked.", ephemeral: true });
			return;
		}

		const roles = interaction.values;
		const rolesToSet = interaction.member.roles.cache.clone().map(({ id }) => id);
		const rolesAdded = [];
		const rolesRemoved = [];

		for (const role of roles) {
			if (!rolesToSet.includes(role)) {
				rolesToSet.push(role);
				rolesAdded.push(role);
			}
		}

		for (const roleId of this.populate(notification)
			.filter((eventRoleId) => !roles.includes(eventRoleId))
			.values()) {
			if (rolesToSet.includes(roleId)) {
				rolesToSet.splice(rolesToSet.indexOf(roleId), 1);
				rolesRemoved.push(roleId);
			}
		}

		try {
			await interaction.member.roles.set(rolesToSet);
			let content = "";

			if (rolesAdded.length > 0) {
				content = `Roles added: ${rolesAdded.map((role) => interaction.guild.roles.resolve(role)).join(" & ")}\n`;
			}

			if (rolesRemoved.length > 0) {
				content += `Roles removed: ${rolesRemoved.map((role) => interaction.guild.roles.resolve(role)).join(" & ")}`;
			}

			content ||= "No roles were changed.";
			await interaction.reply({ content, ephemeral: true });
		} catch (error) {
			void interaction.client.log({ content: "Error during applying self-roles.", error });

			await interaction.reply({
				content: "Error during self-role assignment. This is being tracked, so don't worry!",
				ephemeral: true,
			});
		}
	}
})();
