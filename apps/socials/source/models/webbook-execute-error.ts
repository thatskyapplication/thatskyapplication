import type {
	BlueskyWebhooksPacket,
	RedditWebhooksPacket,
	TwitchWebhooksPacket,
} from "@thatskyapplication/utility";

export class WebhookExecuteError extends Error {
	public readonly webhook: Pick<
		BlueskyWebhooksPacket & RedditWebhooksPacket & TwitchWebhooksPacket,
		"webhook_id" | "webhook_token"
	>;

	public override readonly name = this.constructor.name;

	public override readonly cause: unknown;

	public constructor(
		webhook: Pick<
			BlueskyWebhooksPacket & RedditWebhooksPacket & TwitchWebhooksPacket,
			"webhook_id" | "webhook_token"
		>,
		error: unknown,
	) {
		super(`Failed to execute webhook ${webhook.webhook_id}.`);
		this.webhook = webhook;
		this.cause = error;
	}
}
