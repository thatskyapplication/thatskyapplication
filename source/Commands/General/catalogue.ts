import {
	type ApplicationCommandData,
	ApplicationCommandType,
	type ChatInputCommandInteraction,
	type Snowflake,
} from "discord.js";
import { Catalogue } from "../../Structures/Catalogue.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "catalogue",
		description: "Your very own Sky catalogue.",
		type: ApplicationCommandType.ChatInput,
		integrationTypes: [0, 1],
		contexts: [0, 1, 2],
	} as const satisfies Readonly<ApplicationCommandData>;

	public id: Snowflake | null = null;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		await Catalogue.viewCatalogue(interaction);
	}
})();
