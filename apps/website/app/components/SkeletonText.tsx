import type React from "react";

interface SkeletonTextProps {
	children: React.ReactNode;
}

export function SkeletonText({ children }: SkeletonTextProps) {
	return (
		<span
			aria-hidden
			className="rounded-sm bg-current/25 box-decoration-clone select-none motion-safe:animate-pulse"
		>
			<span className="text-transparent">{children}</span>
		</span>
	);
}
