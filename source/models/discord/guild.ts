import { Collection } from "@discordjs/collection";
import type {
	APIChannel,
	APIGuild,
	GatewayGuildCreateDispatchData,
	GuildChannelType,
	Locale,
	Snowflake,
	ThreadChannelType,
} from "@discordjs/core";
import { Role } from "./role.js";

export class Guild {
	public readonly id: Snowflake;

	public name!: string;

	public ownerId!: Snowflake;

	public readonly roles: Collection<Snowflake, Role>;

	public preferredLocale!: Locale;

	public readonly joinedAt: Date;

	public unavailable: boolean;

	public readonly memberCount: number;

	public readonly channels: Collection<
		Snowflake,
		APIChannel & { type: Exclude<GuildChannelType, ThreadChannelType>; guild_id: Snowflake }
	>;

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
			| "channels"
		>,
	) {
		this.id = data.id;

		this.roles = data.roles.reduce(
			(roles, role) => roles.set(role.id, new Role(role)),
			new Collection<Snowflake, Role>(),
		);

		this.joinedAt = new Date(data.joined_at);
		this.unavailable = data.unavailable ?? false;
		this.memberCount = data.member_count;

		this.channels = data.channels.reduce(
			(channels, channel) => channels.set(channel.id, { ...channel, guild_id: data.id }),
			new Collection<
				Snowflake,
				APIChannel & { type: Exclude<GuildChannelType, ThreadChannelType>; guild_id: Snowflake }
			>(),
		);

		this.patch(data);
	}

	public patch(data: Pick<APIGuild, "name" | "owner_id" | "preferred_locale">) {
		this.name = data.name;
		this.ownerId = data.owner_id;
		this.preferredLocale = data.preferred_locale;
	}
}
