import { ExternalLink } from "~/components/ExternalLink";

export interface ExternalLinkListItem {
	readonly id: number | string;
	readonly label: string;
	readonly href: string;
}

export function ExternalLinkList({
	className,
	items,
	locale,
}: {
	readonly className?: string | undefined;
	readonly items: readonly ExternalLinkListItem[];
	readonly locale: string;
}) {
	return new Intl.ListFormat(locale, { style: "long", type: "conjunction" })
		.formatToParts(items.map((_, index) => String(index)))
		.map((part, index) => {
			if (part.type === "literal") {
				return <span key={`literal-${index}`}>{part.value}</span>;
			}

			const item = items[Number(part.value)]!;

			return (
				<ExternalLink
					className={className}
					href={item.href}
					icon
					iconClassName="ml-0.5 inline h-3 w-3"
					key={item.id}
				>
					{item.label}
				</ExternalLink>
			);
		});
}
