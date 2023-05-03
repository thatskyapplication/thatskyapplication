import type { ReactNode } from "react";
import type { IDiscordMessageAuthorReply } from "./MessageAuthorReply";
import { DiscordMessageBaseReply } from "./MessageBaseReply";

export interface IDiscordMessageInteraction {
	author?: IDiscordMessageAuthorReply | undefined;
	authorNode?: ReactNode | undefined;
	command?: string;
}

export function DiscordMessageInteraction({ author, authorNode, command }: IDiscordMessageInteraction) {
	return (
		<DiscordMessageBaseReply author={author} authorNode={authorNode}>
			<span className="mr-1 select-none text-sm leading-snug dark:text-[rgb(181,186,193)] text-[rgb(78,80,88)]">
				used
			</span>
			<div className="cursor-pointer text-sm leading-snug dark:text-[rgb(0,168,252)] text-[rgb(0,108,231)] hover:underline">
				{command}
			</div>
		</DiscordMessageBaseReply>
	);
}
