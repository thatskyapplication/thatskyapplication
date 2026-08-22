import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";

interface TooltipProps {
	children: ReactElement;
	content: ReactNode;
}

export function Tooltip({ children, content }: TooltipProps) {
	return (
		<BaseTooltip.Root>
			<BaseTooltip.Trigger render={children} />
			<BaseTooltip.Portal>
				<BaseTooltip.Positioner className="z-50" collisionPadding={8} side="top" sideOffset={6}>
					<BaseTooltip.Popup className="max-w-xs rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
						{content}
					</BaseTooltip.Popup>
				</BaseTooltip.Positioner>
			</BaseTooltip.Portal>
		</BaseTooltip.Root>
	);
}
