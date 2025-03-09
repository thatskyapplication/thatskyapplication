import type { APISticker, Snowflake } from "@discordjs/core";

export class Sticker {
	public readonly id: Snowflake;

	public readonly name: string;

	public readonly description: string | null;

	public readonly available: boolean;

	public constructor(data: APISticker) {
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;
		this.available = Boolean(data.available);
	}
}
