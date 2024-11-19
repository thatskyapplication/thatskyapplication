import type { APIRole, Snowflake } from "@discordjs/core";

export class Role {
	public readonly id: Snowflake;

	public permissions!: bigint;

	public mentionable!: boolean;

	public constructor(data: Pick<APIRole, "id" | "permissions" | "mentionable">) {
		this.id = data.id;
		this.patch(data);
	}

	public patch(data: Pick<APIRole, "permissions" | "mentionable">) {
		this.permissions = BigInt(data.permissions);
		this.mentionable = data.mentionable;
	}
}
