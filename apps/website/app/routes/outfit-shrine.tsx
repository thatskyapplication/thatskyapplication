import { clsx } from "clsx";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { SitePage } from "~/components/PageLayout";
import { OUTFIT_SHRINE_SECTIONS } from "~/utility/outfit-shrine.js";
import { PAGE_TITLE_CLASS, SECTION_HEADING_CLASS } from "~/utility/styles.js";

export default function OutfitShrine() {
	return (
		<SitePage>
			<div className="container mx-auto max-w-4xl space-y-4">
				<h1 className={clsx(PAGE_TITLE_CLASS, "mb-6")}>Outfit shrine</h1>
				<hr />

				{OUTFIT_SHRINE_SECTIONS.map((section) => (
					<section className="flex flex-col gap-3" key={section.name}>
						<h2 className={SECTION_HEADING_CLASS}>
							{section.name} ({section.emojis.length})
						</h2>
						<ul className="mx-auto flex max-w-[32.5rem] flex-wrap justify-center gap-2.5">
							{section.emojis.map((emoji) => (
								<li
									className="flex size-12 items-center justify-center rounded-xl bg-black/70 dark:bg-black/30"
									key={emoji.id}
								>
									<EmojiIcon className="size-8" emoji={emoji} label={emoji.name} />
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</SitePage>
	);
}
