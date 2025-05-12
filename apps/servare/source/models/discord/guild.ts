import { Collection } from "@discordjs/collection";
import {
	type APIChannel,
	type APIGuild,
	type APIRole,
	ChannelType,
	type GatewayGuildCreateDispatchData,
	type GuildChannelType,
	type Snowflake,
	type ThreadChannelType,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { client } from "../../discord.js";
import { APPLICATION_ID } from "../../utility/constants.js";
import { GuildMember } from "./guild-member.js";
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

	public readonly roles: Collection<Snowflake, APIRole>;

	public readonly joinedAt: Date;

	public unavailable: boolean;

	public memberCount: number;

	public me?: GuildMember;

	public readonly channels: Collection<Snowflake, GuildChannel>;

	public readonly threads: Collection<Snowflake, AnnouncementThread | PublicThread | PrivateThread>;

	public constructor(data: GatewayGuildCreateDispatchData) {
		this.id = data.id;
		this.createdAt = new Date(DiscordSnowflake.timestampFrom(data.id));

		this.roles = data.roles.reduce(
			(roles, role) => roles.set(role.id, role),
			new Collection<Snowflake, APIRole>(),
		);

		this.joinedAt = new Date(data.joined_at);

		for (const member of data.members) {
			if (member.user.id === APPLICATION_ID) {
				this.me = new GuildMember(member);
				break;
			}
		}

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

	public patch(data: APIGuild) {
		this.name = data.name;
		this.ownerId = data.owner_id;
	}

	public async fetchMe() {
		if (this.me) {
			return this.me;
		}

		this.me = new GuildMember(await client.api.guilds.getMember(this.id, APPLICATION_ID));
		return this.me;
	}
}
