import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

interface MobileUserContextMenuItemProps {
	children: ReactNode;
	danger?: boolean;
	icon: LucideIcon;
	onClick: () => void;
	to: string;
}

export function MobileUserContextMenuItem({
	children,
	danger = false,
	icon: Icon,
	onClick,
	to,
}: MobileUserContextMenuItemProps) {
	return (
		<Link
			className={clsx(
				"flex w-full items-center rounded-lg text-sm transition-colors",
				danger
					? "gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
					: "gap-2 bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600",
			)}
			onClick={onClick}
			to={to}
		>
			<Icon className="h-4 w-4" />
			<span>{children}</span>
		</Link>
	);
}
