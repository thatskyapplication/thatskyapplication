import { type ChatInputCommandInteraction, Locale, MessageFlags } from "discord.js";
import { t } from "i18next";
import AI from "../Structures/AI.js";
import { NOT_IN_CACHED_GUILD_RESPONSE } from "../utility/constants.js";
import type { ChatInputCommand } from "./index.js";

export default new (class implements ChatInputCommand {
	public readonly name = t("ai.command-name", { lng: Locale.EnglishGB, ns: "commands" });

	public async chatInput(interaction: ChatInputCommandInteraction) {
		if (!interaction.inCachedGuild()) {
			await interaction.reply(NOT_IN_CACHED_GUILD_RESPONSE);
			return;
		}

		const ai = AI.cache.get(interaction.guildId);

		// @ts-expect-error discord.js update required.
		await interaction.reply({
			...(await AI.response(interaction, ai)),
			flags: MessageFlags.Ephemeral,
		});
	}
})();
