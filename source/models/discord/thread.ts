import {
	type APIThreadChannel,
	ChannelType,
	type GatewayThreadCreateDispatchData,
	type Snowflake,
} from "@discordjs/core";
import pino from "../../pino.js";
import type { Guild } from "./guild.js";

interface ThreadMetadata {
	archived: boolean;
	locked: boolean;
}

abstract class BaseThread {
	public readonly id: Snowflake;

	public readonly type:
		| ChannelType.AnnouncementThread
		| ChannelType.PublicThread
		| ChannelType.PrivateThread;

	public readonly guildId: Snowflake;

	public name!: string;

	public readonly parentId: Snowflake;

	public threadMetadata?: ThreadMetadata;

	public constructor(data: GatewayThreadCreateDispatchData & { guild_id: Snowflake }) {
		this.id = data.id;
		this.type = data.type;
		this.guildId = data.guild_id;

		if (!data.parent_id) {
			pino.warn({ data }, "Constructing a thread without a parent id.");
		}

		this.parentId = data.parent_id!;
		this.patch(data);
	}

	public patch(data: APIThreadChannel) {
		this.name = data.name;

		if (data.thread_metadata) {
			this.threadMetadata = {
				archived: data.thread_metadata.archived,
				locked: data.thread_metadata.locked,
			};
		}
	}
}

export class AnnouncementThread extends BaseThread {
	public override readonly type = ChannelType.AnnouncementThread;
}

export class PublicThread extends BaseThread {
	public override readonly type = ChannelType.PublicThread;
}

export class PrivateThread extends BaseThread {
	public override readonly type = ChannelType.PrivateThread;
}

export function createThread(data: GatewayThreadCreateDispatchData, guild: Guild) {
	switch (data.type) {
		case ChannelType.AnnouncementThread: {
			guild.threads.set(data.id, new AnnouncementThread({ ...data, guild_id: guild.id }));
			return;
		}
		case ChannelType.PublicThread: {
			guild.threads.set(data.id, new PublicThread({ ...data, guild_id: guild.id }));
			return;
		}
		case ChannelType.PrivateThread: {
			guild.threads.set(data.id, new PrivateThread({ ...data, guild_id: guild.id }));
			return;
		}
	}
}
