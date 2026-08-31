import { captureException } from "@sentry/react-router";
import { useEffect, useState } from "react";
import { writeToClipboard } from "~/utility/functions.js";

const COPIED_STATUS_DURATION_MS = 2000 as const;

export type CopyStatus = "copied" | "error";

export function useCopyToClipboard() {
	const [status, setStatus] = useState<{ value: CopyStatus } | null>(null);

	useEffect(() => {
		if (!status) {
			return;
		}

		const timeout = window.setTimeout(() => setStatus(null), COPIED_STATUS_DURATION_MS);
		return () => window.clearTimeout(timeout);
	}, [status]);

	async function copyText(text: string) {
		try {
			await writeToClipboard(text);
			setStatus({ value: "copied" });
		} catch (error) {
			captureException(error);
			setStatus({ value: "error" });
		}
	}

	return {
		copy: (text: string) => void copyText(text),
		status: status?.value ?? null,
	};
}
