import {
	autoUpdate,
	FloatingPortal,
	flip,
	offset,
	shift,
	useDismiss,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useMergeRefs,
	useRole,
} from "@floating-ui/react";
import { cloneElement, type ReactElement, type ReactNode, type Ref, useState } from "react";

interface TooltipProps {
	children: ReactElement<{ ref?: Ref<Element> }>;
	content: ReactNode;
}

export function Tooltip({ children, content }: TooltipProps) {
	const [open, setOpen] = useState(false);
	const { context, floatingStyles, refs } = useFloating({
		middleware: [offset(6), flip(), shift({ padding: 8 })],
		onOpenChange: setOpen,
		open,
		placement: "top",
		whileElementsMounted: autoUpdate,
	});
	const hover = useHover(context, { move: false });
	const focus = useFocus(context);
	const dismiss = useDismiss(context);
	const role = useRole(context, { role: "tooltip" });
	const { getFloatingProps, getReferenceProps } = useInteractions([hover, focus, dismiss, role]);
	const referenceRef = useMergeRefs([refs.setReference, children.props.ref]);

	return (
		<>
			{cloneElement(
				children,
				getReferenceProps({
					...children.props,
					ref: referenceRef,
				}),
			)}
			{open ? (
				<FloatingPortal>
					<div
						className="z-50 max-w-xs rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
						ref={refs.setFloating}
						style={floatingStyles}
						{...getFloatingProps()}
					>
						{content}
					</div>
				</FloatingPortal>
			) : null}
		</>
	);
}
