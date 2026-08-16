import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

export function BackButton({
	restorePreviousLocation = false,
	to,
}: {
	restorePreviousLocation?: boolean;
	to: string;
}) {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<Link
			className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100/50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-900/50"
			onClick={(event) => {
				if (
					restorePreviousLocation &&
					event.button === 0 &&
					!event.altKey &&
					!event.ctrlKey &&
					!event.metaKey &&
					!event.shiftKey
				) {
					event.preventDefault();
					void navigate(-1);
				}
			}}
			to={to}
		>
			<ArrowLeft aria-hidden="true" className="h-4 w-4" />
			{t("navigation-back", { ns: "general" })}
		</Link>
	);
}
