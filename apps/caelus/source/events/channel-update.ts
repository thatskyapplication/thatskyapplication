import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { checkSendable } from "../features/notifications.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ChannelUpdate;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
			return;
		}

		const oldChannel = guild.channels.get(data.id);
		guild.channels.set(data.id, data);

		if (
			oldChannel &&
			oldChannel.permission_overwrites?.length === data.permission_overwrites?.length &&
			oldChannel.permission_overwrites?.every((oldPermissionOverwrite) => {
				const permissionOverwrite = data.permission_overwrites?.find(
					(permissionOverwrite) => permissionOverwrite.id === oldPermissionOverwrite.id,
				);

				if (!permissionOverwrite) {
					return false;
				}

				if (
					oldPermissionOverwrite.id !== permissionOverwrite.id ||
					oldPermissionOverwrite.type !== permissionOverwrite.type ||
					oldPermissionOverwrite.allow !== permissionOverwrite.allow ||
					oldPermissionOverwrite.deny !== permissionOverwrite.deny
				) {
					return false;
				}

				return true;
			})
		) {
			return;
		}

		await checkSendable(data.guild_id);
	},
} satisfies Event<typeof name>;
