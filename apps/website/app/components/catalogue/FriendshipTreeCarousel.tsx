import { clsx } from "clsx";
import type { ReactNode } from "react";

export function FriendshipTreeCarousel({
	accessibleLabel,
	children,
}: {
	accessibleLabel?: string;
	children: ReactNode;
}) {
	return (
		<div
			aria-label={accessibleLabel}
			className={clsx(
				"col-span-full flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:snap-none [&>*]:snap-center [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto",
				accessibleLabel &&
					"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-300",
			)}
			data-full-bleed
			role={accessibleLabel ? "region" : undefined}
			tabIndex={accessibleLabel ? 0 : undefined}
		>
			{children}
		</div>
	);
}
