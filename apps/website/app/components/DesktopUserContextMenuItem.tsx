import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

interface DesktopUserContextMenuItemProps {
	children: ReactNode;
	danger?: boolean;
	icon: LucideIcon;
	onClick: () => void;
	to: string;
}

export function DesktopUserContextMenuItem({
	children,
	danger = false,
	icon: Icon,
	onClick,
	to,
}: DesktopUserContextMenuItemProps) {
	return (
		<Link
			className={clsx(
				"flex items-center gap-3 px-4 py-2 text-sm transition-colors",
				danger
					? "w-full text-left text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
					: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
			)}
			onClick={onClick}
			to={to}
		>
			<Icon className="h-4 w-4" />
			<span>{children}</span>
		</Link>
	);
}
