import type { ReactNode } from "react";

export function FriendshipTreeCarousel({ children }: { children: ReactNode }) {
	return (
		<div
			className="col-span-full flex gap-4 overflow-x-auto pb-2 [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto"
			data-full-bleed
		>
			{children}
		</div>
	);
}
