import { Popover } from "@base-ui/react/popover";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { CostList } from "~/components/catalogue/CostList.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { ExternalLink } from "~/components/ExternalLink";
import type { CosmeticSelection } from "~/hooks/use-cosmetic-selection.js";
import {
	cosmeticName,
	cosmeticSources,
	type CosmeticTileData,
	releasedCosmetics,
} from "~/utility/cosmetics.js";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";

function CosmeticDetails({ tile }: { tile: CosmeticTileData }) {
	const { i18n, t } = useTranslation();
	const entry = releasedCosmetics().catalogue.get(tile.cosmetic);
	const sources = cosmeticSources(entry, t);
	const reserveEmojiSpace = sources.some((source) => source.emoji);

	return (
		<>
			{entry?.nameKeys && (
				<Popover.Title className="px-2 pt-1 text-base font-semibold text-gray-900 dark:text-gray-100">
					{cosmeticName(entry.nameKeys, i18n, t)}
				</Popover.Title>
			)}
			<h3 className="mt-1 px-2 text-xs font-medium text-gray-500 dark:text-gray-400">
				{t("cosmetics.source", { ns: "features", count: sources.length })}
			</h3>
			{sources.length === 0 ? (
				<p className="px-2 py-1.5 text-sm text-gray-600 dark:text-gray-400">
					{t("cosmetics.no-source", { ns: "features" })}
				</p>
			) : (
				<ul className="flex flex-col">
					{sources.map(
						({ costs, detail, emoji: sourceEmoji, name, pageURL, query, seasonPass, wikiURL }) => (
							<li className="px-2 py-1.5" key={query}>
								<div className="flex items-center gap-2">
									{sourceEmoji ? (
										<EmojiIcon className="size-5 shrink-0" emoji={sourceEmoji} />
									) : (
										reserveEmojiSpace && <span aria-hidden="true" className="size-5 shrink-0" />
									)}
									<span className="flex min-w-0 flex-1 flex-col">
										<span className="truncate text-sm text-gray-900 dark:text-gray-100">
											{name}
										</span>
										{detail && (
											<span className="truncate text-xs text-gray-600 dark:text-gray-300">
												{detail}
											</span>
										)}
									</span>
									{costs.length > 0 && (
										<span className="shrink-0 text-sm text-gray-600 dark:text-gray-400">
											<CostList costs={costs} locale={i18n.language} />
										</span>
									)}
									{seasonPass && (
										<EmojiIcon
											className="size-4 shrink-0"
											emoji={MISCELLANEOUS_EMOJIS.SeasonPass}
										/>
									)}
								</div>
								<div
									className={clsx(
										"mt-1 flex flex-wrap items-center gap-3 text-xs font-medium",
										reserveEmojiSpace && "pl-7",
									)}
								>
									{pageURL && (
										<Link className="regular-link" to={pageURL}>
											{t("view", { ns: "general" })}
										</Link>
									)}
									<Link className="regular-link" to={`/me/catalogue${query}`}>
										{t("catalogue.main-title", { ns: "features" })}
									</Link>
									{wikiURL && (
										<ExternalLink href={wikiURL} icon iconClassName="size-3">
											{t("wiki", { ns: "general" })}
										</ExternalLink>
									)}
								</div>
							</li>
						),
					)}
				</ul>
			)}
		</>
	);
}

export function CosmeticPopover({
	onOpenChange,
	selection,
}: {
	onOpenChange: (open: boolean, eventDetails: Popover.Root.ChangeEventDetails) => void;
	selection: CosmeticSelection | null;
}) {
	return (
		<Popover.Root onOpenChange={onOpenChange} open={selection?.open ?? false}>
			<Popover.Portal>
				<Popover.Positioner
					align="center"
					anchor={selection?.element}
					className="z-50"
					collisionPadding={8}
					key={selection?.tile.anchor}
					side="bottom"
					sideOffset={6}
				>
					<Popover.Popup
						className="max-h-(--available-height) w-72 max-w-[calc(100vw-1rem)] overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900"
						finalFocus={selection?.opener === "keyboard"}
						initialFocus={selection?.opener === "keyboard"}
					>
						{selection && <CosmeticDetails tile={selection.tile} />}
					</Popover.Popup>
				</Popover.Positioner>
			</Popover.Portal>
		</Popover.Root>
	);
}
