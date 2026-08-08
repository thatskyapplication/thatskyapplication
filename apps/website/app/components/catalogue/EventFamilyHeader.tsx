import { useTranslation } from "react-i18next";
import type { EventFamily } from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { NOTE_CLASS } from "~/utility/catalogue.js";
import { EventIdToEventTicketEmoji } from "~/utility/emojis.js";

export function EventFamilyHeader({ family, locale }: { family: EventFamily; locale: string }) {
	const { t } = useTranslation();
	const { latest } = family;
	const eventTicketEmoji = EventIdToEventTicketEmoji[latest.id];
	const [, ...otherNames] = family.names.keys();

	return (
		<div>
			<h1 className="my-0 inline-flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
				{eventTicketEmoji ? <EmojiIcon className="h-6 w-6" emoji={eventTicketEmoji} /> : null}
				<a
					className="regular-link"
					href={t(`event-wiki.${latest.id}`, { ns: "general" })}
					rel="noopener noreferrer"
					target="_blank"
				>
					{t(latest.name, { ns: "general" })}
				</a>
			</h1>
			{otherNames.length > 0 && (
				<p className={NOTE_CLASS}>
					{t("catalogue.event-family-also-known-as", {
						ns: "features",
						names: new Intl.ListFormat(locale, { style: "long", type: "conjunction" }).format(
							otherNames.map((name) => t(name, { ns: "general" })),
						),
					})}
				</p>
			)}
		</div>
	);
}
