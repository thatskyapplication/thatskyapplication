import type { DiscordSDK } from "@discord/embedded-app-sdk";

let discordSdk: DiscordSDK | null = null;

export function setLinkOpener(sdk: DiscordSDK) {
	discordSdk = sdk;
}

export async function shareActivityLink(message: string) {
	if (discordSdk === null) {
		return;
	}

	await discordSdk.commands.shareLink({ message });
}

export async function openLink(url: string) {
	if (discordSdk === null) {
		window.open(url, "_blank", "noopener,noreferrer");
		return;
	}

	await discordSdk.commands.openExternalLink({ url });
}
