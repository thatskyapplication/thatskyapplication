import { useTranslation } from "react-i18next";
import { resolveReturningSpirits, returningSpiritsSchedule } from "@thatskyapplication/utility";
import { SkeletonText } from "~/components/SkeletonText.js";
import { NOTE_CLASS } from "~/utility/catalogue.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { FriendshipTreeCarousel } from "./FriendshipTreeCarousel";
import { SpiritTreeColumn } from "./SpiritTreeColumn";

export function ReturningSpiritsView({
	data,
	locale,
	now,
	timeZone,
	timeZoneEstimated,
	hour12,
}: {
	data: ReadonlySet<number>;
	locale: string;
	now: Temporal.ZonedDateTime;
	timeZone: string;
	timeZoneEstimated: boolean;
	hour12: boolean | undefined;
}) {
	const { t } = useTranslation();
	const returningSpirits = resolveReturningSpirits(now);
	const visit = returningSpiritsSchedule(now);
	const spiritTreeColumns = [];
	const dateFormat = new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone,
		hour12,
	});

	if (returningSpirits) {
		for (const spirit of returningSpirits.values()) {
			if (spirit.displayFriendshipTree.length === 0) {
				continue;
			}

			spiritTreeColumns.push(
				<SpiritTreeColumn data={data} key={spirit.id} locale={locale} spirit={spirit} />,
			);
		}
	}

	return (
		<>
			<Breadcrumb
				current={t("returning-spirits", { ns: "general" })}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			{returningSpirits && visit?.active && (
				<div>
					<h1 className="my-0 text-2xl font-bold text-gray-900 dark:text-gray-100">
						{t("returning-spirits", { ns: "general" })}
					</h1>
					<p className={NOTE_CLASS}>
						{timeZoneEstimated ? (
							<SkeletonText>
								{t("time-range", {
									ns: "general",
									start: dateFormat.format(visit.start.epochMilliseconds),
									end: dateFormat.format(visit.end.epochMilliseconds),
								})}
							</SkeletonText>
						) : (
							t("time-range", {
								ns: "general",
								start: dateFormat.format(visit.start.epochMilliseconds),
								end: dateFormat.format(visit.end.epochMilliseconds),
							})
						)}
					</p>
				</div>
			)}

			{spiritTreeColumns.length > 0 && (
				<FriendshipTreeCarousel>{spiritTreeColumns}</FriendshipTreeCarousel>
			)}
			<BackButton to="/me/catalogue" />
		</>
	);
}
