import type { ChatInputCommandInteraction } from "discord.js";
import { Catalogue } from "../../Structures/Catalogue.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly name = "catalogue";

	public async chatInput(interaction: ChatInputCommandInteraction) {
		await Catalogue.viewCatalogue(interaction);
	}
})();
