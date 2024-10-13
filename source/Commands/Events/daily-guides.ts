import { type ChatInputCommandInteraction, Locale, PermissionFlagsBits } from "discord.js";
import { t } from "i18next";
import DailyGuidesDistribution, {
	isDailyGuidesDistributable,
} from "../../Structures/DailyGuidesDistribution.js";
import {
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	NOT_IN_CACHED_GUILD_RESPONSE,
} from "../../Utility/Constants.js";
import { cannotUsePermissions } from "../../Utility/permissionChecks.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly name = t("daily-guides.command-name", { lng: Locale.EnglishGB, ns: "commands" });

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
			await interaction.reply({
				content: "This server does not have this feature set up.",
				ephemeral: true,
			});

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
