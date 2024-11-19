import type {
	APIGuild,
	APIRole,
	GatewayGuildCreateDispatchData,
	Locale,
	Snowflake,
} from "@discordjs/core";

export class Guild {
	public readonly id: Snowflake;

	public name!: string;

	public ownerId!: Snowflake;

	public readonly roles: readonly APIRole[];

	public preferredLocale!: Locale;

	public readonly joinedAt: Date;

	public unavailable: boolean;

	public readonly memberCount: number;

	public constructor(
		data: Pick<
			GatewayGuildCreateDispatchData,
			| "id"
			| "name"
			| "owner_id"
			| "roles"
			| "preferred_locale"
			| "joined_at"
			| "unavailable"
			| "member_count"
		>,
	) {
		this.id = data.id;
		this.roles = data.roles;
		this.joinedAt = new Date(data.joined_at);
		this.unavailable = data.unavailable ?? false;
		this.memberCount = data.member_count;
		this.patch(data);
	}

	public patch(data: Pick<APIGuild, "name" | "owner_id" | "preferred_locale">) {
		this.name = data.name;
		this.ownerId = data.owner_id;
		this.preferredLocale = data.preferred_locale;
	}
}
