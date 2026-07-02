import {
	type CataloguePacket,
	CLOTHING_SHOP,
	type EventIds,
	NESTING_WORKSHOP,
	SECRET_AREA,
	type SeasonIds,
	type SpiritIds,
	STARTER_PACKS,
	skyEvents,
	skyNow,
	skySeasons,
	spirits,
	Table,
	TIME_ZONE,
} from "@thatskyapplication/utility";
import { ArrowLeft } from "lucide-react";
import { type ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router";
import { CollectionView } from "~/components/catalogue/CollectionView";
import { EldersView } from "~/components/catalogue/EldersView";
import { EventsView } from "~/components/catalogue/EventsView";
import { EventView } from "~/components/catalogue/EventView";
import { RealmsView } from "~/components/catalogue/RealmsView";
import { ReturningSpiritsView } from "~/components/catalogue/ReturningSpiritsView";
import { SeasonsView } from "~/components/catalogue/SeasonsView";
import { SeasonView } from "~/components/catalogue/SeasonView";
import { SpiritView } from "~/components/catalogue/SpiritView";
import { StartView } from "~/components/catalogue/StartView";
import { TotalSpentView } from "~/components/catalogue/TotalSpentView";
import { SitePage } from "~/components/PageLayout";
import { getLocale } from "~/middleware/i18next.js";
import pg from "~/pg.server";
import { parseCosmetics, resolveScopeCosmetics } from "~/utility/catalogue.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import { getPreferredTimeZone } from "~/utility/time-zone.server.js";
import type { Route } from "./+types/me.catalogue.js";

export const loader = async ({ request, context, url }: Route.LoaderArgs) => {
	const locale = getLocale(context);
	const timeZone = await getPreferredTimeZone(request);
	const { discordUser } = await requireDiscordAuthentication(request, url);

	const cataloguePacket = await pg<CataloguePacket>(Table.Catalogue)
		.where({ user_id: discordUser.id })
		.first();

	return {
		data: cataloguePacket?.data ?? [],
		locale,
		now: skyNow().epochMilliseconds,
		showEverythingButton: cataloguePacket?.show_everything_button ?? false,
		timeZone,
	};
};

export const action = async ({ request, url }: Route.ActionArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request, url);

	const formData = await request.formData();
	const intent = formData.get("intent");

	if (intent === "settings-everything") {
		await pg<CataloguePacket>(Table.Catalogue)
			.insert({
				last_updated_at: new Date(),
				show_everything_button: formData.get("enabled") === "true",
				user_id: discordUser.id,
			})
			.onConflict("user_id")
			.merge();

		return;
	}

	const cataloguePacket = await pg<CataloguePacket>(Table.Catalogue)
		.where({ user_id: discordUser.id })
		.first();

	const existing: ReadonlySet<number> = new Set(cataloguePacket?.data);
	let data: ReadonlySet<number>;

	if (intent === "set-items") {
		const cosmetics = parseCosmetics(formData.get("cosmetics"));

		if (!cosmetics) {
			throw new Response("Could not parse items to set.", { status: 400 });
		}

		data =
			formData.get("owned") === "true"
				? existing.union(new Set(cosmetics))
				: existing.difference(new Set(cosmetics));
	} else if (intent === "everything") {
		const scopeCosmetics = resolveScopeCosmetics(formData.get("scope"));

		if (!scopeCosmetics) {
			throw new Response("Unknown scope.", { status: 400 });
		}

		data = existing.union(scopeCosmetics);
	} else {
		throw new Response("Unknown intent.", { status: 400 });
	}

	await pg<CataloguePacket>(Table.Catalogue)
		.insert({ data: [...data], last_updated_at: new Date(), user_id: discordUser.id })
		.onConflict("user_id")
		.merge();

	return;
};

export default function Catalogue({ loaderData }: Route.ComponentProps) {
	const { data: dataArray, locale, now: nowMillis, showEverythingButton, timeZone } = loaderData;
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const data = useMemo(() => new Set(dataArray), [dataArray]);
	const now = useMemo(
		() => Temporal.Instant.fromEpochMilliseconds(nowMillis).toZonedDateTimeISO(TIME_ZONE),
		[nowMillis],
	);
	const view = searchParams.get("view");

	let content: ReactNode = null;

	switch (view) {
		case "realms":
			content = (
				<RealmsView data={data} locale={locale} showEverythingButton={showEverythingButton} />
			);
			break;
		case "elders":
			content = (
				<EldersView data={data} locale={locale} showEverythingButton={showEverythingButton} />
			);
			break;
		case "seasons":
			content = <SeasonsView data={data} />;
			break;
		case "season": {
			const season = skySeasons().get(Number(searchParams.get("season")) as SeasonIds);

			if (season) {
				content = (
					<SeasonView
						data={data}
						locale={locale}
						seasonId={season.id}
						showEverythingButton={showEverythingButton}
					/>
				);
			}

			break;
		}
		case "events":
			content = <EventsView data={data} locale={locale} timeZone={timeZone} />;
			break;
		case "event": {
			const event = skyEvents().get(Number(searchParams.get("event")) as EventIds);

			if (event) {
				content = (
					<EventView
						data={data}
						eventId={event.id}
						locale={locale}
						showEverythingButton={showEverythingButton}
						timeZone={timeZone}
					/>
				);
			}

			break;
		}
		case "spirit": {
			const spirit = spirits().get(Number(searchParams.get("spirit")) as SpiritIds);

			if (spirit) {
				content = (
					<SpiritView
						data={data}
						locale={locale}
						showEverythingButton={showEverythingButton}
						spirit={spirit}
					/>
				);
			}

			break;
		}
		case "returning-spirits":
			content = <ReturningSpiritsView data={data} locale={locale} now={now} />;
			break;
		case "starter-packs":
			content = (
				<CollectionView
					collection={STARTER_PACKS}
					data={data}
					locale={locale}
					scope="starter-packs"
					showEverythingButton={showEverythingButton}
					title={t("catalogue.starter-packs", { ns: "features" })}
				/>
			);
			break;
		case "secret-area":
			content = (
				<CollectionView
					collection={SECRET_AREA}
					data={data}
					locale={locale}
					scope="secret-area"
					showEverythingButton={showEverythingButton}
					title={t("catalogue.secret-area", { ns: "features" })}
				/>
			);
			break;
		case "clothing-shop":
			content = (
				<CollectionView
					collection={CLOTHING_SHOP}
					data={data}
					locale={locale}
					scope="clothing-shop"
					showEverythingButton={showEverythingButton}
					title={t("catalogue.clothing-shop", { ns: "features" })}
				/>
			);
			break;
		case "nesting-workshop":
			content = (
				<CollectionView
					collection={NESTING_WORKSHOP}
					data={data}
					locale={locale}
					scope="nesting-workshop"
					showEverythingButton={showEverythingButton}
					title={t("catalogue.nesting-workshop", { ns: "features" })}
				/>
			);
			break;
		case "total-spent":
			content = <TotalSpentView data={data} locale={locale} />;
			break;
		default:
	}

	if (!content) {
		content = <StartView data={data} now={now} showEverythingButton={showEverythingButton} />;
	}

	return (
		<SitePage>
			<div className="grid w-full grid-cols-[1fr_min(48rem,100%)_1fr] gap-y-5 [&>:not([data-full-bleed])]:col-start-2">
				<Link
					className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
					to="/me"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>{t("navigation-back", { ns: "general" })}</span>
				</Link>

				{content}
			</div>
		</SitePage>
	);
}
