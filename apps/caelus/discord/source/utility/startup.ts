let startupComplete = false;

export function isStartupComplete() {
	return startupComplete;
}

export async function startup() {
	await import("../croner.js");
	startupComplete = true;
}
