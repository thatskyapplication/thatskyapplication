import { ChannelType, GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { AnnouncementThread, PrivateThread, PublicThread } from "../models/discord/thread.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ThreadCreate;

export default {
	name,
	fire({ data }) {
		if (data.guild_id) {
			const guild = GUILD_CACHE.get(data.guild_id);

			if (guild) {
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
		}

		pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
	},
} satisfies Event<typeof name>;
