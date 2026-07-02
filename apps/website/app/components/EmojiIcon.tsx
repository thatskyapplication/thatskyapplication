import type { Emoji } from "@thatskyapplication/utility";
import { formatEmojiURL } from "@thatskyapplication/utility";
import { clsx } from "clsx";

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
	const style = { backgroundImage: `url(${formatEmojiURL(emoji.id)})` };

	return label ? (
		<div aria-label={label} className={resolvedClassName} role="img" style={style} />
	) : (
		<div aria-hidden="true" className={resolvedClassName} style={style} />
	);
}
