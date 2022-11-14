import type { ApplicationCommandData, ChatInputCommandInteraction, NewsChannel, TextChannel } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, PermissionFlagsBits } from "discord.js";
import DailyGuidesDistribution from "../../Structures/DailyGuidesDistribution.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
	public readonly name = "daily-guides";

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
		const { guild, guildId } = interaction;
		const dailyGuidesDistribution = await DailyGuidesDistribution.fetch(guildId).catch(() => null);

		if (!dailyGuidesDistribution) {
			await interaction.reply({
				content: "This server does not have this feature set up.",
				ephemeral: true,
			});

			return;
		}

		await interaction.reply({
			embeds: [await dailyGuidesDistribution.overview(guild)],
			ephemeral: true,
		});
	}

	public async setup(interaction: ChatInputCommandInteraction<"cached">) {
		const { guildId, options } = interaction;
		// Typed from restrictions placed in the command.
		const channel = options.getChannel("channel", true) as NewsChannel | TextChannel;
		const me = await channel.guild.members.fetchMe();

		if (
			!channel
				.permissionsFor(me)
				.has(PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages | PermissionFlagsBits.EmbedLinks)
		) {
			await interaction.reply({
				// eslint-disable-next-line @typescript-eslint/no-base-to-string
				content: `\`View Channel\` & \`Send Messages\` & \`Embed Links\` are required for ${channel}.`,
				ephemeral: true,
			});

			return;
		}

		await DailyGuidesDistribution.setup(interaction, { guild_id: guildId, channel_id: channel.id });
	}

	public async unset(interaction: ChatInputCommandInteraction<"cached">) {
		await DailyGuidesDistribution.unset(interaction);
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "The command to set up daily guides in the server.",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "overview",
					description: "Shows the daily guides overview in this server.",
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "setup",
					description: "Sets up the daily guides in the server.",
					options: [
						{
							type: ApplicationCommandOptionType.Channel,
							name: "channel",
							description: "The channel to send daily guides in.",
							required: true,
							channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
						},
					],
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "unset",
					description: "Unsets daily guides in the server.",
				},
			],
			defaultMemberPermissions: PermissionFlagsBits.ManageGuild,
			dmPermission: false,
		};
	}
}
