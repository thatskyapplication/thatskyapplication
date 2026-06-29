import { Info } from "lucide-react";
import type { ReactNode } from "react";

export function InfoBox({ children }: { children: ReactNode }) {
	return (
		<div className="flex items-start gap-2.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200">
			<Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
			<span>{children}</span>
		</div>
	);
}
