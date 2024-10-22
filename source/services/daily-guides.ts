import { type ChatInputCommandInteraction, MessageFlags } from "discord.js";
import DailyGuidesDistribution, {
	isDailyGuidesDistributable,
} from "../models/DailyGuidesDistribution.js";
import { DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES } from "../utility/constants.js";

export async function setup(interaction: ChatInputCommandInteraction<"cached">) {
	const { guildId, options } = interaction;
	const channel = options.getChannel("channel", true, DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES);
	const me = await channel.guild.members.fetchMe();
	const dailyGuidesDistributable = isDailyGuidesDistributable(channel, me, true);

	if (dailyGuidesDistributable.length > 0) {
		await interaction.reply({
			content: dailyGuidesDistributable.join("\n"),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await DailyGuidesDistribution.setup(interaction, { guild_id: guildId, channel_id: channel.id });
}

export async function status(interaction: ChatInputCommandInteraction<"cached">) {
	const { guild, guildId } = interaction;
	const dailyGuidesDistribution = await DailyGuidesDistribution.fetch(guildId).catch(() => null);

	if (!dailyGuidesDistribution) {
		await interaction.reply({
			content: "This server does not have this feature set up.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await interaction.reply({
		embeds: [await dailyGuidesDistribution.embed(guild)],
		flags: MessageFlags.Ephemeral,
	});
}

export async function unset(interaction: ChatInputCommandInteraction<"cached">) {
	await DailyGuidesDistribution.unset(interaction);
}
