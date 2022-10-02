import type { Client } from "discord.js";

export default abstract class {
	protected readonly client: Client<true>;

	protected constructor(client: Client<true>) {
		this.client = client;
	}
}
