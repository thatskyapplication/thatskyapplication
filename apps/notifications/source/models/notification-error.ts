import type { NotificationPacket } from "@thatskyapplication/utility";

export class NotificationError extends Error {
	public override readonly name = this.constructor.name;

	public readonly data: Pick<
		NotificationPacket & {
			channel_id: string;
			role_id: string;
		},
		"guild_id" | "channel_id" | "role_id" | "locale"
	>;

	public override readonly cause: unknown;

	public constructor(
		data: Pick<
			NotificationPacket & {
				channel_id: string;
				role_id: string;
			},
			"guild_id" | "channel_id" | "role_id" | "locale"
		>,
		error: unknown,
	) {
		super("Failed to deliver a notification.");
		this.data = data;
		this.cause = error;
	}
}
