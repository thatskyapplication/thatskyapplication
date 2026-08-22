import { Menu } from "@base-ui/react/menu";
import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

interface DesktopUserContextMenuItemProps {
	children: ReactNode;
	danger?: boolean;
	icon: LucideIcon;
	to: string;
}

export function DesktopUserContextMenuItem({
	children,
	danger = false,
	icon: Icon,
	to,
}: DesktopUserContextMenuItemProps) {
	return (
		<Menu.LinkItem
			className={(state) =>
				clsx(
					"flex items-center gap-3 px-4 py-2 text-sm transition-colors outline-none",
					danger ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-300",
					state.highlighted &&
						(danger ? "bg-red-50 dark:bg-red-900/20" : "bg-gray-100 dark:bg-gray-700"),
				)
			}
			closeOnClick
			render={<Link to={to} />}
		>
			<Icon className="h-4 w-4 shrink-0" />
			<span className="min-w-0">{children}</span>
		</Menu.LinkItem>
	);
}
