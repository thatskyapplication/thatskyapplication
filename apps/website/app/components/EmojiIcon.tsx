import { clsx } from "clsx";
import type { Emoji } from "@thatskyapplication/utility";
import { formatEmojiURL } from "@thatskyapplication/utility";

export function EmojiImage({
	className,
	label,
	url,
}: {
	className?: string | undefined;
	label?: string | undefined;
	url: string;
}) {
	const resolvedClassName = clsx("discord-emoji", className ?? "h-4 w-4");
	const style = { backgroundImage: `url(${url})` };

	return label ? (
		<div aria-label={label} className={resolvedClassName} role="img" style={style} />
	) : (
		<div aria-hidden="true" className={resolvedClassName} style={style} />
	);
}

export function EmojiIcon({
	className,
	emoji,
	label,
}: {
	className?: string | undefined;
	emoji: Emoji;
	label?: string | undefined;
}) {
	return <EmojiImage className={className} label={label} url={formatEmojiURL(emoji.id)} />;
}
