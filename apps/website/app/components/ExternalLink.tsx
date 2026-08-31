import { ExternalLinkIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

const ICON_LINK_CLASS = "regular-link inline-flex items-center gap-1" as const;

export function ExternalLink({
	children,
	className,
	href,
	icon,
	iconClassName,
	...rest
}: Omit<ComponentPropsWithRef<"a">, "href" | "rel" | "target"> & {
	readonly href: string;
	readonly icon?: boolean | undefined;
	readonly iconClassName?: string | undefined;
}) {
	return (
		<a
			{...rest}
			className={className ?? (icon ? ICON_LINK_CLASS : "regular-link")}
			href={href}
			rel="noopener noreferrer"
			target="_blank"
		>
			{children}
			{icon && <ExternalLinkIcon aria-hidden="true" className={iconClassName ?? "h-4 w-4"} />}
		</a>
	);
}
