import {
	type APIActionRowComponent,
	type APIButtonComponentWithURL,
	type APIComponentInContainer,
	type APIContainerComponent,
	ButtonStyle,
	ComponentType,
} from "@discordjs/core/http-only";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import { discordComponentEmbedPayload } from "~/utility/discord-component-embed.js";

const MAXIMUM_ACTION_ROW_BUTTONS = 5 as const;
const MAXIMUM_DISCORD_COMPONENT_EMBED_BYTES = 3_000 as const;

export function fitsDiscordComponentEmbed(component: APIContainerComponent) {
	return (
		Buffer.byteLength(discordComponentEmbedPayload(component)) <=
		MAXIMUM_DISCORD_COMPONENT_EMBED_BYTES
	);
}

interface CardContainerOptions {
	colour: number;
	components?: readonly APIComponentInContainer[];
	description: string;
	icon: string;
	title: string;
	url: string;
}

export function cardContainer({
	colour,
	components = [],
	description,
	icon,
	title,
	url,
}: CardContainerOptions): APIContainerComponent {
	return {
		type: ComponentType.Container,
		accent_color: colour,
		components: [
			{
				type: ComponentType.Section,
				components: [
					{ type: ComponentType.TextDisplay, content: `## [${title}](${url})` },
					{ type: ComponentType.TextDisplay, content: description },
				],
				accessory: { type: ComponentType.Thumbnail, media: { url: icon } },
			},
			...components,
		],
	};
}

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
