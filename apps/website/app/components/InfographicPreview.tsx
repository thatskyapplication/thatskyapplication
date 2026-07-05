import {
	FloatingFocusManager,
	FloatingOverlay,
	useDismiss,
	useFloating,
	useInteractions,
	useRole,
} from "@floating-ui/react";
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
	const onCloseRef = useRef(onClose);
	const previousFocusedElementRef = useRef<HTMLElement | null>(null);
	onCloseRef.current = onClose;
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
				onCloseRef.current();
			}
		};

		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [restorePreviousFocus, useModal]);

	const { context, refs } = useFloating({
		onOpenChange: (open) => {
			if (!open) {
				onCloseRef.current();
			}
		},
		open: useModal,
	});

	const dismiss = useDismiss(context, { enabled: useModal, outsidePressEvent: "mousedown" });
	const role = useRole(context, { enabled: useModal, role: "dialog" });
	const { getFloatingProps } = useInteractions([dismiss, role]);

	const modal = (
		<FloatingOverlay
			className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 p-4 backdrop-blur-sm sm:p-6"
			lockScroll
		>
			<FloatingFocusManager context={context} initialFocus={modalCloseButtonRef}>
				<div
					{...getFloatingProps()}
					aria-label={title}
					aria-modal="true"
					className="relative z-10 flex h-[calc(100vh_-_2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:h-[calc(100vh_-_3rem)]"
					ref={refs.setFloating}
					role="dialog"
				>
					<InfographicPreviewContent
						acknowledgement={acknowledgement}
						closeButtonRef={modalCloseButtonRef}
						imageURL={imageURL}
						onClose={onClose}
						title={title}
					/>
				</div>
			</FloatingFocusManager>
		</FloatingOverlay>
	);

	if (useModal) {
		return modal;
	}

	return (
		<aside
			aria-label={title}
			className="sticky top-[calc(var(--site-top-bar-height,0px)_+_1rem)] hidden max-h-[calc(100vh_-_var(--site-top-bar-height,0px)_-_2rem)] w-[min(42vw,40rem)] shrink-0 flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-900 lg:flex"
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
