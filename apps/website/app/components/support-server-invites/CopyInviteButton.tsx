import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "~/hooks/use-copy-to-clipboard.js";
import { DISCORD_INVITE_BASE_URL } from "~/utility/constants.js";

export function CopyInviteButton({ code }: { code: string }) {
	const { copy, status } = useCopyToClipboard();

	return (
		<>
			<button
				aria-label={`Copy the link for ${code}.`}
				className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm p-1 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
				onClick={() => copy(`${DISCORD_INVITE_BASE_URL}${code}`)}
				type="button"
			>
				{status === "copied" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
			</button>
			<span className="sr-only" role="status">
				{status === "error"
					? `Could not copy the link for ${code}.`
					: status === "copied"
						? `Copied the link for ${code}.`
						: ""}
			</span>
		</>
	);
}
