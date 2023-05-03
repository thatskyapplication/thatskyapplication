export function DiscordLink({ href, title }: { href: string; title: string }) {
	return (
		<a
			className="text-[rgb(0,108,231)] dark:text-[rgb(0,168,252)]"
			href={href}
			rel="external noopener noreferrer"
			target="_blank"
		>
			{title}
		</a>
	);
}
