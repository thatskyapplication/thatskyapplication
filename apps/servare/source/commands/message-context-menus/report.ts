import type { APIMessageApplicationCommandGuildInteraction } from "@discordjs/core";
import { reportModalResponse } from "../../features/report.js";
import type { Guild } from "../../models/discord/guild.js";

export default {
	name: "Report",
	async messageContextMenu(
		interaction: APIMessageApplicationCommandGuildInteraction,
		guild: Guild,
	) {
		await reportModalResponse(interaction, guild);
	},
};
