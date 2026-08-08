import { Dialog } from "@base-ui/react/dialog";
import { ExternalLinkIcon, X } from "lucide-react";
import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SKY_COTL_INFOGRAPHICS_DATABASE_URL } from "~/utility/constants.js";

export interface SelectedInfographic {
	acknowledgement: string | null;
	imageURL: string;
}

interface InfographicPreviewProps extends SelectedInfographic {
	desktop?: "inline" | "modal";
	onClose: () => void;
	title: string;
}

interface InfographicPreviewContentProps extends SelectedInfographic {
	closeButtonRef?: RefObject<HTMLButtonElement | null>;
	onClose: () => void;
	title: string;
}

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)" as const;

function isDesktopViewport() {
	return typeof window === "undefined" ? false : window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

function InfographicPreviewContent({
	acknowledgement,
	closeButtonRef,
	imageURL,
	onClose,
	title,
}: InfographicPreviewContentProps) {
	const { t } = useTranslation();

	return (
		<>
			<div className="mb-4 flex shrink-0 items-center justify-between gap-3">
				<h2 className="m-0 text-sm font-semibold text-gray-900 dark:text-white">{title}</h2>
				<button
					aria-label="Close infographic"
					className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
					onClick={onClose}
					ref={closeButtonRef}
					type="button"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
			<div className="flex min-h-0 flex-1 flex-col items-center">
				<img
					alt={t("infographic", { ns: "general" })}
					className="block min-h-0 max-w-full rounded-lg object-contain shadow-lg"
					src={imageURL}
				/>
			</div>
			{acknowledgement && (
				<p className="m-0 mt-3 shrink-0 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
					{t("infographic-by", { ns: "general", acknowledgement })}{" "}
					<a
						className="regular-link inline-flex items-center gap-1"
						href={SKY_COTL_INFOGRAPHICS_DATABASE_URL}
						rel="noopener noreferrer"
						target="_blank"
					>
						Sky:CoTL Infographics Database
						<ExternalLinkIcon className="h-3 w-3" />
					</a>
				</p>
			)}
		</>
	);
}

export function InfographicPreview({
	acknowledgement,
	desktop = "modal",
	imageURL,
	onClose,
	title,
}: InfographicPreviewProps) {
	const [isDesktop, setIsDesktop] = useState(isDesktopViewport);
	const modalCloseButtonRef = useRef<HTMLButtonElement>(null);
	const previousFocusedElementRef = useRef<HTMLElement | null>(null);
	const useModal = desktop === "modal" || !isDesktop;

	useEffect(() => {
		const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
		const updateIsDesktop = () => setIsDesktop(mediaQuery.matches);

		updateIsDesktop();
		mediaQuery.addEventListener("change", updateIsDesktop);

		return () => mediaQuery.removeEventListener("change", updateIsDesktop);
	}, []);

	useEffect(() => {
		previousFocusedElementRef.current =
			document.activeElement instanceof HTMLElement ? document.activeElement : null;
	}, []);

	const restorePreviousFocus = useCallback(() => {
		const previousFocusedElement = previousFocusedElementRef.current;

		if (previousFocusedElement && document.contains(previousFocusedElement)) {
			previousFocusedElement.focus();
		}
	}, []);

	const closeInlinePreview = () => {
		restorePreviousFocus();
		onClose();
	};

	useEffect(() => {
		if (useModal) {
			return;
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				restorePreviousFocus();
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [onClose, restorePreviousFocus, useModal]);

	if (useModal) {
		return (
			<Dialog.Root
				onOpenChange={(open) => {
					if (!open) {
						onClose();
					}
				}}
				open
			>
				<Dialog.Portal>
					<Dialog.Backdrop className="fixed inset-0 z-50 bg-gray-950/70 backdrop-blur-sm" />
					<Dialog.Popup
						aria-label={title}
						className="fixed top-1/2 left-1/2 z-50 flex h-[calc(100vh_-_2rem)] w-[calc(100vw_-_2rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-2xl sm:h-[calc(100vh_-_3rem)] dark:border-gray-700 dark:bg-gray-900"
						initialFocus={modalCloseButtonRef}
					>
						<InfographicPreviewContent
							acknowledgement={acknowledgement}
							closeButtonRef={modalCloseButtonRef}
							imageURL={imageURL}
							onClose={onClose}
							title={title}
						/>
					</Dialog.Popup>
				</Dialog.Portal>
			</Dialog.Root>
		);
	}

	return (
		<aside
			aria-label={title}
			className="sticky top-[calc(var(--site-top-bar-height,0px)_+_1rem)] hidden max-h-[calc(100vh_-_var(--site-top-bar-height,0px)_-_2rem)] w-[min(42vw,40rem)] shrink-0 flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-2xl lg:flex dark:border-gray-700 dark:bg-gray-900"
		>
			<InfographicPreviewContent
				acknowledgement={acknowledgement}
				imageURL={imageURL}
				onClose={closeInlinePreview}
				title={title}
			/>
		</aside>
	);
}
