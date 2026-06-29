import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export function BackButton({ to }: { to: string }) {
	const { t } = useTranslation();

	return (
		<Link
			className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100/50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-900/50"
			to={to}
		>
			<ArrowLeft className="h-4 w-4" />
			{t("navigation-back", { ns: "general" })}
		</Link>
	);
}
