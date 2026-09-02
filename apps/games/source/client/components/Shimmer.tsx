import { clsx } from "clsx";

const SHIMMER_CLASS = "bg-white/10 motion-safe:animate-pulse" as const;

export function Shimmer({ className }: { className?: string }) {
	return <span aria-hidden className={clsx(SHIMMER_CLASS, "block rounded-xl", className)} />;
}
