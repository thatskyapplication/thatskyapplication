import { clsx } from "clsx";
import { type ReactNode, useEffect, useRef, useState } from "react";

export function FriendshipTreeCarousel({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [overflowing, setOverflowing] = useState(false);

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		const update = () => {
			const first = element.firstElementChild;
			const last = element.lastElementChild;

			if (!(first instanceof HTMLElement && last instanceof HTMLElement)) {
				setOverflowing(false);
				return;
			}

			const span = last.offsetLeft + last.offsetWidth - first.offsetLeft;
			setOverflowing(span > element.clientWidth);
		};

		update();
		const observer = new ResizeObserver(update);
		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			className={clsx(
				"col-span-full flex gap-4 overflow-x-auto pb-2 [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto",
				overflowing && "md:px-16 lg:px-32",
			)}
			data-full-bleed
			ref={ref}
		>
			{children}
		</div>
	);
}
