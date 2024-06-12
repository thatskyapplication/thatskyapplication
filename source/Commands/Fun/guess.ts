import { type ChatInputCommandInteraction, ApplicationCommandType } from "discord.js";
import { guess } from "../../Structures/Guess.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "guess",
		description: "Begin a Sky guessing game! How many can you get right in a row?",
		type: ApplicationCommandType.ChatInput,
		integrationTypes: [0, 1],
		contexts: [0, 1, 2],
	} as const;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		await guess(interaction, 0);
	}
})();
