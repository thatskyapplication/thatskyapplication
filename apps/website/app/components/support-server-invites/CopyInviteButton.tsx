import { captureException } from "@sentry/react-router";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { DISCORD_INVITE_BASE_URL } from "~/utility/constants.js";

const COPIED_STATUS_DURATION_MS = 2000 as const;

interface CopyState {
	nonce: number;
	status: "copied" | "error";
}

export function CopyInviteButton({ code }: { code: string }) {
	const [copy, setCopy] = useState<CopyState | null>(null);

	useEffect(() => {
		if (!copy) {
			return;
		}

		const timeout = window.setTimeout(() => setCopy(null), COPIED_STATUS_DURATION_MS);
		return () => window.clearTimeout(timeout);
	}, [copy]);

	async function copyLink() {
		try {
			if (!navigator.clipboard) {
				throw new Error("Clipboard API is unavailable.");
			}

			await navigator.clipboard.writeText(`${DISCORD_INVITE_BASE_URL}${code}`);
			setCopy((previous) => ({ nonce: (previous?.nonce ?? 0) + 1, status: "copied" }));
		} catch (error) {
			captureException(error);
			setCopy((previous) => ({ nonce: (previous?.nonce ?? 0) + 1, status: "error" }));
		}
	}

	return (
		<>
			<button
				aria-label={`Copy the link for ${code}.`}
				className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm p-1 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
				onClick={() => void copyLink()}
				type="button"
			>
				{copy?.status === "copied" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
			</button>
			<span className="sr-only" role="status">
				{copy?.status === "error"
					? `Could not copy the link for ${code}.`
					: copy?.status === "copied"
						? `Copied the link for ${code}.`
						: ""}
			</span>
		</>
	);
}
