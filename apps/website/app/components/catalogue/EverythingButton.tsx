import { catalogueComplete, catalogueProgress, type Item } from "@thatskyapplication/utility";
import { useTranslation } from "react-i18next";
import { useFetcher } from "react-router";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";
import { EmojiIcon } from "./EmojiIcon";

export function EverythingButton({
	data,
	items,
	scope,
}: {
	data: ReadonlySet<number>;
	items: Iterable<Item>;
	scope: string;
}) {
	const fetcher = useFetcher();
	const { t } = useTranslation();
	const progress = catalogueProgress(items, data);

	if (progress.total === 0) {
		return null;
	}

	return (
		<fetcher.Form method="post">
			<input name="intent" type="hidden" value="everything" />
			<input name="scope" type="hidden" value={scope} />
			<button
				className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={catalogueComplete(progress) || fetcher.state !== "idle"}
				type="submit"
			>
				<EmojiIcon emoji={MISCELLANEOUS_EMOJIS.ConstellationFlag} />
				{t("catalogue.i-have-everything-button-label", { ns: "features" })}
			</button>
		</fetcher.Form>
	);
}
