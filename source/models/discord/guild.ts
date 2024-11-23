import { Collection } from "@discordjs/collection";
import {
	type APIChannel,
	type APIGuild,
	ChannelType,
	type GatewayGuildCreateDispatchData,
	type GuildChannelType,
	type Locale,
	type Snowflake,
	type ThreadChannelType,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { Role } from "./role.js";
import { AnnouncementThread, PrivateThread, PublicThread } from "./thread.js";

export type GuildChannel = APIChannel & {
	type: Exclude<GuildChannelType, ThreadChannelType>;
	guild_id: Snowflake;
};

export class Guild {
	public readonly id: Snowflake;

	public readonly createdAt: Date;

	public name!: string;

	public ownerId!: Snowflake;

	public readonly roles: Collection<Snowflake, Role>;

	public preferredLocale!: Locale;

	public readonly joinedAt: Date;

	public unavailable: boolean;

	public memberCount: number;

	public readonly channels: Collection<Snowflake, GuildChannel>;

	public readonly threads: Collection<Snowflake, AnnouncementThread | PublicThread | PrivateThread>;

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
			| "threads"
		>,
	) {
		this.id = data.id;
		this.createdAt = new Date(DiscordSnowflake.timestampFrom(data.id));

		this.roles = data.roles.reduce(
			(roles, role) => roles.set(role.id, new Role(role)),
			new Collection<Snowflake, Role>(),
		);

		this.joinedAt = new Date(data.joined_at);
		this.unavailable = data.unavailable ?? false;
		this.memberCount = data.member_count;

		this.channels = data.channels.reduce(
			(channels, channel) => channels.set(channel.id, { ...channel, guild_id: data.id }),
			new Collection<Snowflake, GuildChannel>(),
		);

		this.threads = data.threads.reduce((threads, thread) => {
			switch (thread.type) {
				case ChannelType.AnnouncementThread:
					return threads.set(thread.id, new AnnouncementThread({ ...thread, guild_id: data.id }));
				case ChannelType.PublicThread:
					return threads.set(thread.id, new PublicThread({ ...thread, guild_id: data.id }));
				case ChannelType.PrivateThread:
					return threads.set(thread.id, new PrivateThread({ ...thread, guild_id: data.id }));
			}
		}, new Collection<Snowflake, AnnouncementThread | PublicThread | PrivateThread>());

		this.patch(data);
	}

	public patch(data: Pick<APIGuild, "name" | "owner_id" | "preferred_locale">) {
		this.name = data.name;
		this.ownerId = data.owner_id;
		this.preferredLocale = data.preferred_locale;
	}
}
