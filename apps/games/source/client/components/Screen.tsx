import type React from "react";

const SCREEN_CLASS =
	"short:pt-[calc(0.5rem+var(--safe-area-inset-top))] short:pr-[calc(0.5rem+var(--safe-area-inset-right))] short:pb-[calc(0.5rem+var(--safe-area-inset-bottom))] short:pl-[calc(0.5rem+var(--safe-area-inset-left))] flex min-h-svh flex-col overflow-y-auto pt-[calc(1rem+var(--safe-area-inset-top))] pr-[calc(1rem+var(--safe-area-inset-right))] pb-[calc(1rem+var(--safe-area-inset-bottom))] pl-[calc(1rem+var(--safe-area-inset-left))]" as const;
const SCREEN_INNER_CLASS = "m-auto flex w-full flex-col gap-3 short:gap-2" as const;

export function Screen({
	children,
	corner,
	footer,
}: {
	children: React.ReactNode;
	corner?: React.ReactNode;
	footer?: React.ReactNode;
}) {
	return (
		<div className={SCREEN_CLASS}>
			{corner}
			<div className={SCREEN_INNER_CLASS}>{children}</div>
			{footer}
		</div>
	);
}
