import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import type { ScheduleTypes } from "@thatskyapplication/utility";
import { t } from "i18next";
import { scheduleDetailedBreakdown, scheduleOverview } from "../../features/schedule.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("schedule.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);
		const type = options.getInteger("type");
		const ephemeral = options.getBoolean("hide") ?? false;

		if (type !== null) {
			await scheduleDetailedBreakdown(interaction, {
				type: type as ScheduleTypes,
				reply: true,
				ephemeral,
			});

			return;
		}

		await scheduleOverview(interaction, { ephemeral });
	},
} as const;
