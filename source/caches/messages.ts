import { Collection } from "@discordjs/collection";
import type {
	APIMessage,
	GatewayMessageCreateDispatchData,
	GatewayMessageDeleteDispatchData,
	GatewayMessageUpdateDispatchData,
	Snowflake,
} from "@discordjs/core";

export const MESSAGE_CACHE = new Collection<Snowflake, Collection<Snowflake, APIMessage>>();

export function addMessageToCache(message: GatewayMessageCreateDispatchData) {
	const messages = MESSAGE_CACHE.get(message.channel_id);

	if (!messages) {
		MESSAGE_CACHE.set(
			message.channel_id,
			new Collection<Snowflake, APIMessage>().set(message.id, message),
		);

		return;
	}

	if (messages.size >= 5) {
		messages.delete(messages.firstKey()!);
	}

	messages.set(message.id, message);
}

export function removeMessageFromCache(message: GatewayMessageDeleteDispatchData) {
	MESSAGE_CACHE.get(message.channel_id)?.delete(message.id);
}

export function updateMessageCache(
	message: GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData,
) {
	const messages = MESSAGE_CACHE.get(message.channel_id);

	if (messages?.has(message.id)) {
		messages.set(message.id, message);
	}
}
