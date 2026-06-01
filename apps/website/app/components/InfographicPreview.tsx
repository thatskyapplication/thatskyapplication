import { X } from "lucide-react";
import { type RefObject, useEffect, useRef } from "react";

interface InfographicPreviewProps {
	desktop?: "inline" | "modal";
	imageURL: string;
	onClose: () => void;
	title: string;
}

interface InfographicPreviewContentProps {
	closeButtonRef?: RefObject<HTMLButtonElement | null>;
	imageURL: string;
	onClose: () => void;
	title: string;
}

function InfographicPreviewContent({
	closeButtonRef,
	imageURL,
	onClose,
	title,
}: InfographicPreviewContentProps) {
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
			<div className="flex min-h-0 flex-1 items-start justify-center">
				<img
					alt="Infographic"
					className="block max-h-full max-w-full rounded-lg object-contain shadow-lg"
					src={imageURL}
				/>
			</div>
		</>
	);
}

export function InfographicPreview({
	desktop = "modal",
	imageURL,
	onClose,
	title,
}: InfographicPreviewProps) {
	const inlineRootRef = useRef<HTMLElement>(null);
	const modalRootRef = useRef<HTMLDivElement>(null);
	const modalCloseButtonRef = useRef<HTMLButtonElement>(null);
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		const previousFocusedElement =
			document.activeElement instanceof HTMLElement ? document.activeElement : null;
		let modalWasActive = false;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onCloseRef.current();
			}
		};

		const focusModalCloseButton = () => {
			window.requestAnimationFrame(() => modalCloseButtonRef.current?.focus());
		};

		const restoreFocus = () => {
			if (previousFocusedElement && document.contains(previousFocusedElement)) {
				previousFocusedElement.focus();
			}
		};

		const focusIsWithinPreview = () => {
			const activeElement = document.activeElement;

			return (
				activeElement instanceof HTMLElement &&
				[inlineRootRef.current, modalRootRef.current].some((element) =>
					element?.contains(activeElement),
				)
			);
		};

		const previousOverflow = document.body.style.overflow;
		const desktopMediaQuery =
			desktop === "inline" ? window.matchMedia("(min-width: 1024px)") : null;
		const shouldUseModal = () => desktopMediaQuery?.matches !== true;
		const updateBodyOverflow = () => {
			const modalIsActive = shouldUseModal();
			document.body.style.overflow = modalIsActive ? "hidden" : previousOverflow;

			if (modalIsActive && !modalWasActive) {
				focusModalCloseButton();
			}

			if (!modalIsActive && modalWasActive) {
				restoreFocus();
			}

			modalWasActive = modalIsActive;
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			handleEscape(event);

			if (event.key === "Tab" && shouldUseModal()) {
				event.preventDefault();
				modalCloseButtonRef.current?.focus();
			}
		};

		updateBodyOverflow();
		desktopMediaQuery?.addEventListener("change", updateBodyOverflow);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			if (modalWasActive || focusIsWithinPreview() || document.activeElement === document.body) {
				restoreFocus();
			}

			desktopMediaQuery?.removeEventListener("change", updateBodyOverflow);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [desktop]);

	const modal = (
		<div
			className={`${desktop === "inline" ? "lg:hidden " : ""}fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 p-4 backdrop-blur-sm sm:p-6`}
			ref={modalRootRef}
		>
			<button
				aria-hidden="true"
				className="absolute inset-0 cursor-default"
				onClick={onClose}
				tabIndex={-1}
				type="button"
			/>
			<div
				aria-label={title}
				aria-modal="true"
				className="relative z-10 flex h-[calc(100vh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:h-[calc(100vh-3rem)]"
				role="dialog"
			>
				<InfographicPreviewContent
					closeButtonRef={modalCloseButtonRef}
					imageURL={imageURL}
					onClose={onClose}
					title={title}
				/>
			</div>
		</div>
	);

	if (desktop === "modal") {
		return modal;
	}

	return (
		<>
			<aside
				aria-label={title}
				className="sticky top-[calc(var(--site-top-bar-height,0px)+1rem)] hidden max-h-[calc(100vh-var(--site-top-bar-height,0px)-2rem)] w-[min(42vw,40rem)] shrink-0 flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-900 lg:flex"
				ref={inlineRootRef}
			>
				<InfographicPreviewContent imageURL={imageURL} onClose={onClose} title={title} />
			</aside>
			{modal}
		</>
	);
}
