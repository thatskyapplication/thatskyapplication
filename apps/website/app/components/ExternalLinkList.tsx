export interface ExternalLinkListItem {
	readonly id: number | string;
	readonly label: string;
	readonly href: string;
}

export function ExternalLinkList({
	items,
	locale,
}: {
	readonly items: readonly ExternalLinkListItem[];
	readonly locale: string;
}) {
	return (
		<>
			{new Intl.ListFormat(locale, { style: "long", type: "conjunction" })
				.formatToParts(items.map((_, index) => String(index)))
				.map((part, index) => {
					if (part.type === "literal") {
						return <span key={`literal-${index}`}>{part.value}</span>;
					}

					const item = items[Number(part.value)]!;

					return (
						<a
							className="regular-link"
							href={item.href}
							key={item.id}
							rel="noopener noreferrer"
							target="_blank"
						>
							{item.label}
						</a>
					);
				})}
		</>
	);
}
