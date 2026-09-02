import type { DiscordSDK } from "@discord/embedded-app-sdk";

const PLAYING_ACTIVITY_TYPE = 0 as const;

interface Presence {
	details: string;
	party?: number;
	startedAt?: number;
	state?: string;
}

let discordSdk: DiscordSDK | null = null;
let lastSent = "";

export function setPresenceTarget(sdk: DiscordSDK) {
	discordSdk = sdk;
}

export async function setPresence({ details, party, startedAt, state }: Presence) {
	if (discordSdk === null) {
		return;
	}

	const activity = {
		type: PLAYING_ACTIVITY_TYPE,
		details,
		...(state === undefined ? {} : { state }),
		...(startedAt === undefined ? {} : { timestamps: { start: startedAt } }),
		...(party === undefined || party < 2 ? {} : { party: { size: [party, party] } }),
	};

	const key = JSON.stringify(activity);

	if (key === lastSent) {
		return;
	}

	await discordSdk.commands.setActivity({ activity });
	lastSent = key;
}
