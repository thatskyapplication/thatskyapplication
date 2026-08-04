import type { Packet } from "@thatskyapplication/utility";

export class WebhookExecuteError extends Error {
	public readonly webhook: Pick<Packet<"bluesky_webhooks">, "webhook_id" | "webhook_token">;

	public override readonly name = "WebhookExecuteError";

	public override readonly cause: unknown;

	public constructor(
		webhook: Pick<Packet<"bluesky_webhooks">, "webhook_id" | "webhook_token">,
		error: unknown,
	) {
		super(`Failed to execute webhook ${webhook.webhook_id}.`);
		this.webhook = webhook;
		this.cause = error;
	}
}
