import { captureException } from "@sentry/react-router";
import { clsx } from "clsx";
import { Check, Share2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActionButton } from "~/components/ActionButton.js";
import { writeToClipboard } from "~/utility/functions.js";

type ShareStatus = "copied" | "error" | "idle" | "pending";

const COPIED_STATUS_DURATION_MS = 2000 as const;

interface ShareButtonProps {
	appearance: "action" | "compact";
	className?: string;
	href: string;
	shareText?: string;
	shareTitle: string;
}

function isAbortError(error: unknown) {
	return (
		typeof error === "object" && error !== null && "name" in error && error.name === "AbortError"
	);
}

export function ShareButton(props: ShareButtonProps) {
	return <ShareButtonImplementation key={props.href} {...props} />;
}

function ShareButtonImplementation({
	appearance,
	className,
	href,
	shareText,
	shareTitle,
}: ShareButtonProps) {
	const { t } = useTranslation();
	const [status, setStatus] = useState<ShareStatus>("idle");

	useEffect(() => {
		if (status !== "copied") {
			return;
		}

		const timeout = window.setTimeout(() => setStatus("idle"), COPIED_STATUS_DURATION_MS);

		return () => window.clearTimeout(timeout);
	}, [status]);

	async function share() {
		const absoluteURL = new URL(href, window.location.origin).toString();
		const shareData: ShareData = { title: shareTitle, url: absoluteURL };

		if (shareText !== undefined) {
			shareData.text = shareText;
		}

		setStatus("pending");

		const useNativeShare =
			typeof navigator.share === "function" &&
			typeof window.matchMedia === "function" &&
			window.matchMedia("(hover: none) and (pointer: coarse)").matches;

		if (useNativeShare) {
			try {
				await navigator.share(shareData);
				setStatus("idle");
				return;
			} catch (error) {
				if (isAbortError(error)) {
					setStatus("idle");
					return;
				}

				captureException(error);
			}
		}

		try {
			await writeToClipboard(absoluteURL);
			setStatus("copied");
		} catch (error) {
			captureException(error);
			setStatus("error");
		}
	}

	let Icon = Share2;
	const shareLabel = t("share", { ns: "general" });
	let announcement = "";
	let label = shareLabel;

	if (status === "copied") {
		Icon = Check;
		label = t("link-copied", { ns: "general" });
		announcement = label;
	} else if (status === "error") {
		Icon = TriangleAlert;
		label = t("try-again", { ns: "general" });
		announcement = t("share-error", { ns: "general" });
	}

	const compact = appearance === "compact";
	const content = (
		<>
			<Icon aria-hidden="true" className={compact ? "h-4 w-4" : "h-6 w-6 shrink-0"} />
			<span className={compact ? "max-w-40 truncate" : "truncate"}>{label}</span>
		</>
	);

	let button;

	if (compact) {
		button = (
			<button
				aria-busy={status === "pending"}
				className={clsx(
					"inline-flex cursor-pointer items-center gap-1.5 disabled:cursor-wait disabled:opacity-70",
					className,
				)}
				disabled={status === "pending"}
				onClick={() => void share()}
				type="button"
			>
				{content}
			</button>
		);
	} else {
		button = (
			<ActionButton
				aria-busy={status === "pending"}
				className={className ?? ""}
				disabled={status === "pending"}
				onClick={() => void share()}
				variant={status === "copied" ? "success" : "neutral"}
			>
				{content}
			</ActionButton>
		);
	}

	return (
		<>
			{button}
			<span aria-atomic="true" className="sr-only" role="status">
				{announcement}
			</span>
		</>
	);
}
