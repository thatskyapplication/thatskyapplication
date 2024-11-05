import type { APIChatInputApplicationCommandInteraction, Client } from "@discordjs/core";

export interface InteractionPayload {
	client: Client;
	interaction: APIChatInputApplicationCommandInteraction;
}