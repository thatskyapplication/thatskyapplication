import { ActionRowBuilder, ApplicationCommandData, ApplicationCommandType, ChatInputCommandInteraction, Collection, MessageActionRowComponentBuilder, PermissionsBitField, SelectMenuBuilder, SelectMenuInteraction, Snowflake } from "discord.js";
import Notification, { LightEvent } from "../../Structures/Notification.js";
import type { Command } from "../index.js";

export const rolesSelectMenuCustomId = "SELFROLE" as const;

export default class implements Command {
  readonly name = "roles";
  readonly type = ApplicationCommandType.ChatInput;

  async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.inCachedGuild()) {
      interaction.client.log(`The \`/${this.name}\` command was used in an uncached guild, somehow.`, interaction);

      return void await interaction.reply({
        content: `There is no \`/${this.name}\` command in Ba Sing Se.`,
        ephemeral: true
      });
    }

    return await this.execute(interaction);
  }

  populate(notification: Notification): Collection<typeof LightEvent[keyof typeof LightEvent], Snowflake> {
    const roles = new Collection<typeof LightEvent[keyof typeof LightEvent], Snowflake>();
    if (notification.pollutedGeyserChannelId && notification.pollutedGeyserRoleId) roles.set(LightEvent.PollutedGeyser, notification.pollutedGeyserRoleId);
    if (notification.grandmaChannelId && notification.grandmaRoleId) roles.set(LightEvent.Grandma, notification.grandmaRoleId);
    if (notification.turtleChannelId && notification.turtleRoleId) roles.set(LightEvent.Turtle, notification.turtleRoleId);
    return roles;
  }

  async execute(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    const notification = Notification.cache.find(({ guildId }) => guildId === interaction.guildId);

    if (!notification) {
      return void await interaction.reply({
        content: "This server hasn't set up self-role assignment.",
        ephemeral: true
      });
    }

    if (!(await interaction.guild.members.fetchMe()).permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return void await interaction.reply({
        content: "Missing the `Manage Roles` permission.",
        ephemeral: true
      });
    }

    const options = this.populate(notification);

    if (options.size === 0) {
      return void await interaction.reply({
        content: "There are no roles to self-assign.",
        ephemeral: true
      });
    }

    const content = "Self-assign roles to receive notifications!";
    const actionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>();
    const selectMenu = new SelectMenuBuilder();

    selectMenu.setCustomId(rolesSelectMenuCustomId);
    selectMenu.setMaxValues(options.size);
    selectMenu.setMinValues(0);

    selectMenu.setOptions(options.map((roleId, event) => ({
      default: interaction.member.roles.cache.has(roleId),
      label: event,
      value: roleId
    })));

    selectMenu.setPlaceholder("Select some roles!");
    actionRow.setComponents(selectMenu);

    await interaction.reply({
      content,
      components: [actionRow],
      ephemeral: true
    });
  }

  async apply(interaction: SelectMenuInteraction<"cached">): Promise<void> {
    const notification = Notification.cache.find(({ guildId }) => guildId === interaction.guildId);

    if (!notification) {
      return void await interaction.reply({
        content: "A strange error occured. This is being tracked.",
        ephemeral: true
      });
    }

    const roles = interaction.values;
    const rolesToSet = interaction.member.roles.cache.clone().map(({ id }) => id);
    const rolesAdded: Snowflake[] = [];
    const rolesRemoved: Snowflake[] = [];

    for (const role of roles) {
      if (!rolesToSet.includes(role)) {
        rolesToSet.push(role);
        rolesAdded.push(role);
      }
    }

    for (const roleId of this.populate(notification).filter(eventRoleId => !roles.some(id => id === eventRoleId)).values()) {
      if (rolesToSet.includes(roleId)) {
        rolesToSet.splice(rolesToSet.findIndex(role => role === roleId), 1);
        rolesRemoved.push(roleId);
      }
    }

    try {
      await interaction.member.roles.set(rolesToSet);
      let content = "";
      if (rolesAdded.length > 0) content = `Roles added: ${rolesAdded.map(role => interaction.guild.roles.resolve(role)).join(" & ")}\n`;
      if (rolesRemoved.length > 0) content += `Roles removed: ${rolesRemoved.map(role => interaction.guild.roles.resolve(role)).join(" & ")}`;
      content ||= "No roles were changed.";

      await interaction.reply({
        content,
        ephemeral: true
      });
    } catch (error) {
      interaction.client.log("Error during applying self-roles.", error);

      await interaction.reply({
        content: "Error during self-role assignment. This is being tracked, so don't worry!",
        ephemeral: true
      });
    }
  }

  get commandData(): ApplicationCommandData {
    return {
      name: this.name,
      description: "Self-assign roles!",
      type: this.type,
      dmPermission: false
    };
  }
}
