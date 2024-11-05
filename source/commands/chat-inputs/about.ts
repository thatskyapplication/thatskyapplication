import { Locale } from "@discordjs/core";
import { t } from "i18next";
import type { InteractionPayload } from "../../models/InteractionPayload.js";
import { about } from "../../services/about.js";

export default {
	name: t("about.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput({ client, interaction }: InteractionPayload) {
		await about(client, interaction);
	},
} as const;
