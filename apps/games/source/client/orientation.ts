import type { Common as CommonSchema, DiscordSDK } from "@discord/embedded-app-sdk";

const ORIENTATION_UPDATE_EVENT = "ORIENTATION_UPDATE" as const;
const LANDSCAPE = "landscape" as const;
const PORTRAIT = "portrait" as const;

function orientationName(common: typeof CommonSchema, screenOrientation: number) {
	switch (screenOrientation) {
		case common.OrientationTypeObject.LANDSCAPE:
			return LANDSCAPE;
		case common.OrientationTypeObject.PORTRAIT:
			return PORTRAIT;
		default:
			return null;
	}
}

export async function initialiseOrientation(discordSdk: DiscordSDK) {
	const { Common, Platform } = await import("@discord/embedded-app-sdk");

	await discordSdk.subscribe(
		ORIENTATION_UPDATE_EVENT,
		({ screen_orientation: screenOrientation }) => {
			const orientation = orientationName(Common, screenOrientation);

			if (orientation === null) {
				delete document.documentElement.dataset.orientation;
			} else {
				document.documentElement.dataset.orientation = orientation;
			}
		},
	);

	if (discordSdk.platform !== Platform.MOBILE) {
		return;
	}

	await discordSdk.commands.setOrientationLockState({
		lock_state: Common.OrientationLockStateTypeObject.UNLOCKED,
		picture_in_picture_lock_state: Common.OrientationLockStateTypeObject.PORTRAIT,
		grid_lock_state: Common.OrientationLockStateTypeObject.PORTRAIT,
	});
}
