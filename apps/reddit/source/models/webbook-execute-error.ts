import type { RedditWebhooksPacket } from "@thatskyapplication/utility";

export class WebhookExecuteError {
	public readonly webhook: Pick<RedditWebhooksPacket, "webhook_id" | "webhook_token">;

	public readonly error: unknown;

	public constructor(
		webhook: Pick<RedditWebhooksPacket, "webhook_id" | "webhook_token">,
		error: unknown,
	) {
		this.webhook = webhook;
		this.error = error;
	}
}
