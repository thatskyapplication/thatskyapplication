import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	PermissionFlagsBits,
} from "discord.js";
import DailyGuidesDistribution, {
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	isDailyGuidesDistributable,
} from "../../Structures/DailyGuidesDistribution.js";
import { NOT_IN_CACHED_GUILD_RESPONSE } from "../../Utility/Constants.js";
import { cannotUsePermissions } from "../../Utility/permissionChecks.js";
import { type ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "daily-guides",
		description: "The command to set up daily guides in the server.",
		type: ApplicationCommandType.ChatInput,
		options: [
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
				name: "status",
				description: "Shows the status of daily guides in this server.",
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "unset",
				description: "Unsets daily guides in the server.",
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

		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;

		switch (interaction.options.getSubcommand()) {
			case "setup":
				await this.setup(interaction);
				return;
			case "status":
				await this.status(interaction);
				return;
			case "unset":
				await this.unset(interaction);
		}
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

	public async status(interaction: ChatInputCommandInteraction<"cached">) {
		const { guild, guildId } = interaction;
		const dailyGuidesDistribution = await DailyGuidesDistribution.fetch(guildId).catch(() => null);

		if (!dailyGuidesDistribution) {
			await interaction.reply({ content: "This server does not have this feature set up.", ephemeral: true });
			return;
		}

		await interaction.reply({
			embeds: [await dailyGuidesDistribution.embed(guild)],
			ephemeral: true,
		});
	}

	public async unset(interaction: ChatInputCommandInteraction<"cached">) {
		await DailyGuidesDistribution.unset(interaction);
	}
})();
