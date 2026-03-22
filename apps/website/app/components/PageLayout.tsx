import { clsx } from "clsx";
import type { ReactNode } from "react";

interface PageLayoutProps {
	children: ReactNode;
	className?: string;
}

export function SitePage({ children, className }: PageLayoutProps) {
	return <div className={clsx("w-full px-4 py-4 sm:py-8", className)}>{children}</div>;
}

export function CentredSitePage({ children, className }: PageLayoutProps) {
	return (
		<div className={clsx("flex flex-1 items-center justify-center px-4", className)}>
			{children}
		</div>
	);
}
