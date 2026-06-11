import type { Emoji } from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { discordEmojiURL } from "~/utility/cdn.js";

export function EmojiIcon({
	className,
	emoji,
	label,
}: {
	className?: string;
	emoji: Emoji;
	label?: string;
}) {
	const resolvedClassName = clsx("discord-emoji", className ?? "h-4 w-4");
	const style = { backgroundImage: `url(${discordEmojiURL(emoji.id)})` };

	return label ? (
		<div aria-label={label} className={resolvedClassName} role="img" style={style} />
	) : (
		<div aria-hidden="true" className={resolvedClassName} style={style} />
	);
}
