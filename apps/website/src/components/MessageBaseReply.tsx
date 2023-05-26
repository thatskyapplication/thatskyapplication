import type { PropsWithChildren, ReactNode } from "react";
import { DiscordMessageAuthorReply, type IDiscordMessageAuthorReply } from "./MessageAuthorReply";

export function DiscordMessageBaseReply({
	author,
	authorNode,
	children,
}: PropsWithChildren<{ author?: IDiscordMessageAuthorReply | undefined; authorNode?: ReactNode | undefined }>) {
	return (
		<div
			className="relative mb-1 flex flex-wrap place-items-center before:absolute before:bottom-0 before:left-[-36px] before:right-full before:top-[50%] before:mr-1 before:block before:border-l-2 before:border-t-2 before:border-[rgb(79_84_92)] before:rounded-tl-1.5 before:content-none"
			id="reply-wrapper"
		>
			<div className="flex place-items-center [&>span]:opacity-60">
				{author ? <DiscordMessageAuthorReply {...author} /> : authorNode}
			</div>
			{children}
		</div>
	);
}
