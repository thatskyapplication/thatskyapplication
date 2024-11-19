import { ChannelType, GatewayDispatchEvents } from "@discordjs/core";
import { CHANNEL_CACHE } from "../caches/channels.js";
import { checkSendable } from "../services/notification.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ChannelUpdate;

export default {
	name,
	async fire({ data }) {
		const oldChannel = CHANNEL_CACHE.get(data.id);
		CHANNEL_CACHE.set(data.id, data);

		if (
			data.type === ChannelType.DM ||
			data.type === ChannelType.GroupDM ||
			oldChannel?.type === ChannelType.DM ||
			oldChannel?.type === ChannelType.GroupDM
		) {
			return;
		}

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

		if (data.guild_id) {
			await checkSendable(data.guild_id);
		}
	},
} satisfies Event<typeof name>;
