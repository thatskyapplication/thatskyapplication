import { clsx } from "clsx";
import type React from "react";
import { SKELETON_CLASS } from "~/utility/styles.js";

interface SkeletonTextProps {
	children: React.ReactNode;
}

export function SkeletonText({ children }: SkeletonTextProps) {
	return (
		<span
			aria-hidden
			className={clsx(SKELETON_CLASS, "rounded-sm box-decoration-clone select-none")}
		>
			<span className="text-transparent">{children}</span>
		</span>
	);
}
