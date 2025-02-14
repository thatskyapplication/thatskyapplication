import { InfoIcon } from "lucide-react";
import type React from "react";

interface InfoBoxProps {
	children: React.ReactNode;
}

export default function InfoBox({ children }: InfoBoxProps) {
	return (
		<div className="flex items-start bg-blue-200 dark:bg-blue-300 border-l-4 border-y border-r border-blue-400 dark:border-blue-500 p-4 rounded-md shadow-sm text-blue-800 max-w-full my-4">
			<InfoIcon className="h-6 w-6 text-blue-500 flex-shrink-0 mr-3" />
			<div>{children}</div>
		</div>
	);
}
