import type { APIGuildMember, APIUser, Snowflake } from "@discordjs/core";

export class GuildMember {
	public readonly user: APIUser;

	public readonly roles: Set<Snowflake>;

	public communicationDisabledUntil?: Date | null;

	public constructor(
		data: Pick<APIGuildMember, "user" | "roles" | "communication_disabled_until">,
	) {
		this.user = data.user;
		this.roles = new Set(data.roles);

		if ("communication_disabled_until" in data) {
			this.communicationDisabledUntil =
				data.communication_disabled_until === null
					? null
					: new Date(data.communication_disabled_until);
		}
	}

	public isCommunicationDisabled() {
		return Boolean(
			this.communicationDisabledUntil && this.communicationDisabledUntil.getTime() > Date.now(),
		);
	}
}
