import type { Common as CommonSchema, DiscordSDK } from "@discord/embedded-app-sdk";

const LAYOUT_MODE_UPDATE_EVENT = "ACTIVITY_LAYOUT_MODE_UPDATE" as const;
const FOCUSED = "focused" as const;
const PIP = "pip" as const;
const GRID = "grid" as const;

function layoutName(common: typeof CommonSchema, layoutMode: number) {
	switch (layoutMode) {
		case common.LayoutModeTypeObject.FOCUSED:
			return FOCUSED;
		case common.LayoutModeTypeObject.PIP:
			return PIP;
		case common.LayoutModeTypeObject.GRID:
			return GRID;
		default:
			return null;
	}
}

export async function initialiseLayout(discordSdk: DiscordSDK) {
	const { Common, Platform } = await import("@discord/embedded-app-sdk");

	if (discordSdk.platform === Platform.DESKTOP) {
		await discordSdk.commands.setConfig({ use_interactive_pip: true });
	}

	await discordSdk.subscribe(LAYOUT_MODE_UPDATE_EVENT, ({ layout_mode: layoutMode }) => {
		const layout = layoutName(Common, layoutMode);

		if (layout === null) {
			delete document.documentElement.dataset.layout;
		} else {
			document.documentElement.dataset.layout = layout;
		}
	});
}
