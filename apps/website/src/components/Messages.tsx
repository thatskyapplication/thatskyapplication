import type { PropsWithChildren } from "react";

export function DiscordMessages({ rounded, children }: PropsWithChildren<{ rounded?: boolean }>) {
	return (
		<div
			className={`font-source-sans-pro pt-0.1 bg-[rgb(255,255,255)] dark:bg-[rgb(49,51,56)] pb-4 ${rounded ? "rounded" : ""}`}
			id="messages-wrapper"
		>
			{children}
		</div>
	);
}
