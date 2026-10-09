import {
	type APIActionRowComponent,
	type APIButtonComponentWithURL,
	ButtonStyle,
	ComponentType,
} from "@discordjs/core/http-only";
import { WEBSITE_URL } from "@thatskyapplication/utility";

const MAXIMUM_ACTION_ROW_BUTTONS = 5 as const;

export function linkButtonRows(links: readonly { label: string; to: string }[]) {
	const rows: APIActionRowComponent<APIButtonComponentWithURL>[] = [];

	for (let index = 0; index < links.length; index += MAXIMUM_ACTION_ROW_BUTTONS) {
		rows.push({
			type: ComponentType.ActionRow,
			components: links.slice(index, index + MAXIMUM_ACTION_ROW_BUTTONS).map(({ label, to }) => ({
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				label,
				url: new URL(to, WEBSITE_URL).href,
			})),
		});
	}

	return rows;
}
