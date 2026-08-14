import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SAVE_CONFIRMATION_DURATION = 3000 as const;

interface SaveStatusProps {
	isSaving: boolean;
	showSuccess: boolean;
}

export function useSaveConfirmation(savedAt: string | null) {
	const [expiredSavedAt, setExpiredSavedAt] = useState<string | null>(null);

	useEffect(() => {
		if (!savedAt) {
			return;
		}

		const timeout = window.setTimeout(() => setExpiredSavedAt(savedAt), SAVE_CONFIRMATION_DURATION);
		return () => window.clearTimeout(timeout);
	}, [savedAt]);

	return savedAt !== null && savedAt !== expiredSavedAt;
}

// Keep this mounted outside keyed form content so assistive technology observes text changes.
export function SaveStatus({ isSaving, showSuccess }: SaveStatusProps) {
	const { t } = useTranslation();

	return (
		<div aria-atomic="true" className="sr-only" role="status">
			{isSaving ? t("saving", { ns: "general" }) : showSuccess ? t("saved", { ns: "general" }) : ""}
		</div>
	);
}

export function SaveConfirmation({ isSaving, showSuccess }: SaveStatusProps) {
	const { t } = useTranslation();

	return showSuccess && !isSaving ? (
		<div
			aria-hidden="true"
			className="mt-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/20 dark:text-green-200"
		>
			<Check className="h-5 w-5" />
			<span>{t("saved", { ns: "general" })}</span>
		</div>
	) : null;
}
