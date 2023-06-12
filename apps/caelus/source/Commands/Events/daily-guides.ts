import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	PermissionFlagsBits,
} from "discord.js";
import DailyGuidesDistribution, {
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES, isDailyGuidesDistributable,
} from "../../Structures/DailyGuidesDistribution.js";
import { cannotUseCustomEmojis } from "../../Utility/Utility.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
	public readonly name = "daily-guides";

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
		const { guild, guildId } = interaction;
		const dailyGuidesDistribution = await DailyGuidesDistribution.fetch(guildId).catch(() => null);

		if (!dailyGuidesDistribution) {
			await interaction.reply({ content: "This server does not have this feature set up.", ephemeral: true });
			return;
		}

		await interaction.reply({
			embeds: [await dailyGuidesDistribution.overview(guild)],
			ephemeral: true,
		});
	}

	public async setup(interaction: ChatInputCommandInteraction<"cached">) {
		const { guildId, options } = interaction;
		const channel = options.getChannel("channel", true, DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES);
		const me = await channel.guild.members.fetchMe();

		const dailyGuidesDistributable = isDailyGuidesDistributable(channel, me, true);

		if (dailyGuidesDistributable.length > 0) {
			await interaction.reply({
				content: dailyGuidesDistributable.join("\n"),
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
							channelTypes: DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
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
