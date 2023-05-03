import type { PropsWithChildren, ReactNode } from "react";
import { DiscordMessageEmbedAuthor, type IDiscordMessageEmbedAuthor } from "./MessageEmbedAuthor";
import type { IDiscordMessageEmbedField } from "./MessageEmbedField";
import { DiscordMessageEmbedFields } from "./MessageEmbedFields";
import { DiscordMessageEmbedFooter, type IDiscordMessageEmbedFooter } from "./MessageEmbedFooter";

export interface IDiscordMessageEmbed {
	author?: IDiscordMessageEmbedAuthor | undefined;
	authorNode?: ReactNode | undefined;
	fields?: IDiscordMessageEmbedField[];
	image?: string | undefined;
	footer?: IDiscordMessageEmbedFooter | undefined;
	footerNode?: ReactNode | undefined;
	timestamp?: string;
	title?: string | undefined;
	url?: string;
}

export function DiscordMessageEmbed({
	author,
	authorNode,
	fields,
	image,
	title,
	url,
	children,
	footer,
	footerNode,
}: PropsWithChildren<IDiscordMessageEmbed>) {
	return (
		<div className="py-0.5" id="outer-embed-wrapper">
			<div
				className="grid max-w-max border-l-4 border-l-caelus-100 rounded dark:bg-[rgb(43,45,49)] bg-[rgb(242,243,245)]"
				id="embed-wrapper"
			>
				<div className="max-w-128">
					<div className="pb-4 pl-3 pr-4 pt-2">
						{author ? <DiscordMessageEmbedAuthor {...author} /> : authorNode ?? null}
						{title ? (
							url ? (
								<a
									className="text-[rgb(0,108,231)] dark:text-[rgb(0,168,252)]"
									href={url}
									rel="external noopener noreferrer"
									target="_blank"
								>
									{title}
								</a>
							) : (
								<div className="mt-2 font-medium dark:text-[rgb(242,243,245)] text-[rgb(6,6,7)]">{title}</div>
							)
						) : null}
						{children ? (
							<div className="mt-2 text-sm text-[rgb(49,51,56)] dark:text-[rgb(219,222,225)]">{children}</div>
						) : null}
						{fields ? <DiscordMessageEmbedFields fields={fields} /> : null}
						{image ? <img src={image} /> : null}
						{footer ? <DiscordMessageEmbedFooter {...footer} /> : footerNode ?? null}
					</div>
				</div>
			</div>
		</div>
	);
}
