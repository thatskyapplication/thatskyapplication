import type { APIContainerComponent } from "@discordjs/core/http-only";

export function discordComponentEmbedPayload(component: APIContainerComponent) {
	return JSON.stringify({ component }).replaceAll("<", String.raw`\u003c`);
}
