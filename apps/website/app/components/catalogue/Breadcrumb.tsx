import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router";

export function Breadcrumb({
	current,
	trail,
}: {
	current: string;
	trail: readonly { label: string; to: string }[];
}) {
	return (
		<nav className="flex flex-wrap items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
			{trail.map(({ label, to }) => (
				<Fragment key={to}>
					<Link className="transition-colors hover:text-gray-900 dark:hover:text-gray-100" to={to}>
						{label}
					</Link>
					<ChevronRight className="h-3 w-3" />
				</Fragment>
			))}
			<span className="font-medium text-gray-900 dark:text-gray-100">{current}</span>
		</nav>
	);
}
