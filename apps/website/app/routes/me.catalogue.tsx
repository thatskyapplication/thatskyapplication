import { ArrowLeft } from "lucide-react";
import { type ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router";
import {
	CLOTHING_SHOP,
	isEventFamilyId,
	NESTING_WORKSHOP,
	SECRET_AREA,
	type SeasonIds,
	type SpiritIds,
	STARTER_PACKS,
	returningSpiritsSchedule,
	skyEventFamilies,
	skyNow,
	skySeasons,
	spirits,
	TIME_ZONE,
	CatalogueCollection,
	CatalogueCollectionToLocaleKey,
} from "@thatskyapplication/utility";
import { CatalogueSearch } from "~/components/catalogue/CatalogueSearch";
import { CollectionView } from "~/components/catalogue/CollectionView";
import { EldersView } from "~/components/catalogue/EldersView";
import { EventFamilyView } from "~/components/catalogue/EventFamilyView";
import { EventsView } from "~/components/catalogue/EventsView";
import { RealmsView } from "~/components/catalogue/RealmsView";
import { ReturningSpiritsView } from "~/components/catalogue/ReturningSpiritsView";
import { SeasonsView } from "~/components/catalogue/SeasonsView";
import { SeasonView } from "~/components/catalogue/SeasonView";
import { SpiritView } from "~/components/catalogue/SpiritView";
import { StartView } from "~/components/catalogue/StartView";
import { TotalSpentView } from "~/components/catalogue/TotalSpentView";
import { SitePage } from "~/components/PageLayout";
import database from "~/database.server";
import { parseCosmetics, resolveScopeCosmetics } from "~/utility/catalogue.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import { dateTimeLabels } from "~/utility/time.js";
import { getTimePreferences } from "~/utility/time.server.js";
import type { Route } from "./+types/me.catalogue.js";

function viewTimestamps(searchParams: URLSearchParams, now: Temporal.ZonedDateTime) {
	switch (searchParams.get("view")) {
		case "season": {
			const season = skySeasons().get(Number(searchParams.get("season")) as SeasonIds);
			return season ? [season.start.epochMilliseconds, season.end.epochMilliseconds] : [];
		}
		case "event-family": {
			const family = Number(searchParams.get("family"));
			const eventFamily = isEventFamilyId(family) ? skyEventFamilies().get(family) : undefined;

			return eventFamily
				? eventFamily.occurrences.flatMap((event) => [
						event.start.epochMilliseconds,
						event.end.epochMilliseconds,
					])
				: [];
		}
		case "returning-spirits": {
			const visit = returningSpiritsSchedule(now);
			return visit ? [visit.start.epochMilliseconds, visit.end.epochMilliseconds] : [];
		}
		default:
			return [];
	}
}

export const loader = async ({ request, context, url }: Route.LoaderArgs) => {
	const { locale, timeZone, timeZoneEstimated, hour12 } = getTimePreferences(request, context);
	const { discordUser } = requireDiscordAuthentication({ context, request, url });
	const now = skyNow();

	const cataloguePacket = await database
		.selectFrom("catalogue")
		.selectAll()
		.where("user_id", "=", discordUser.id)
		.executeTakeFirst();

	return {
		data: cataloguePacket?.data ?? [],
		dateTimeLabels: dateTimeLabels(viewTimestamps(url.searchParams, now), {
			locale,
			timeZone,
			hour12,
		}),
		locale,
		now: now.epochMilliseconds,
		showEverythingButton: cataloguePacket?.show_everything_button ?? false,
		timeZoneEstimated,
	};
};

export const action = async ({ context, request, url }: Route.ActionArgs) => {
	const { discordUser } = requireDiscordAuthentication({ context, request, url });

	const formData = await request.formData();
	const intent = formData.get("intent");

	if (intent === "settings-everything") {
		await database
			.insertInto("catalogue")
			.values({
				last_updated_at: new Date(),
				show_everything_button: formData.get("enabled") === "true",
				user_id: discordUser.id,
			})
			.onConflict((oc) =>
				oc.column("user_id").doUpdateSet((eb) => ({
					last_updated_at: eb.ref("excluded.last_updated_at"),
					show_everything_button: eb.ref("excluded.show_everything_button"),
				})),
			)
			.execute();

		return;
	}

	let mutation: { cosmetics: ReadonlySet<number>; operation: "add" | "remove" };

	if (intent === "set-items") {
		const cosmetics = parseCosmetics(formData.get("cosmetics"));

		if (!cosmetics) {
			throw new Response("Could not parse items to set.", { status: 400 });
		}

		mutation = {
			cosmetics: new Set(cosmetics),
			operation: formData.get("owned") === "true" ? "add" : "remove",
		};
	} else if (intent === "everything") {
		const scopeCosmetics = resolveScopeCosmetics(formData.get("scope"));

		if (!scopeCosmetics) {
			throw new Response("Unknown scope.", { status: 400 });
		}

		mutation = { cosmetics: scopeCosmetics, operation: "add" };
	} else {
		throw new Response("Unknown intent.", { status: 400 });
	}

	await database.transaction().execute(async (transaction) => {
		await transaction
			.insertInto("catalogue")
			.values({ last_updated_at: new Date(), user_id: discordUser.id })
			.onConflict((oc) => oc.column("user_id").doNothing())
			.execute();

		const cataloguePacket = await transaction
			.selectFrom("catalogue")
			.select("data")
			.where("user_id", "=", discordUser.id)
			.forUpdate()
			.executeTakeFirstOrThrow();

		const existing: ReadonlySet<number> = new Set(cataloguePacket.data);
		const data =
			mutation.operation === "add"
				? existing.union(mutation.cosmetics)
				: existing.difference(mutation.cosmetics);

		await transaction
			.updateTable("catalogue")
			.set({ data: [...data], last_updated_at: new Date() })
			.where("user_id", "=", discordUser.id)
			.execute();
	});

	return;
};

export default function Catalogue({ loaderData }: Route.ComponentProps) {
	const {
		data: dataArray,
		dateTimeLabels,
		locale,
		now: nowMillis,
		showEverythingButton,
		timeZoneEstimated,
	} = loaderData;
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
						dateTimeLabels={dateTimeLabels}
						locale={locale}
						seasonId={season.id}
						showEverythingButton={showEverythingButton}
						timeZoneEstimated={timeZoneEstimated}
					/>
				);
			}

			break;
		}
		case "events":
			content = <EventsView data={data} />;
			break;
		case "event-family": {
			const family = Number(searchParams.get("family"));
			const eventFamily = isEventFamilyId(family) ? skyEventFamilies().get(family) : undefined;

			if (eventFamily) {
				content = (
					<EventFamilyView
						data={data}
						dateTimeLabels={dateTimeLabels}
						family={eventFamily}
						locale={locale}
						showEverythingButton={showEverythingButton}
						timeZoneEstimated={timeZoneEstimated}
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
			content = (
				<ReturningSpiritsView
					data={data}
					dateTimeLabels={dateTimeLabels}
					locale={locale}
					now={now}
					timeZoneEstimated={timeZoneEstimated}
				/>
			);
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
					title={t(CatalogueCollectionToLocaleKey[CatalogueCollection.NestingWorkshop])}
				/>
			);
			break;
		case "total-spent":
			content = <TotalSpentView data={data} locale={locale} />;
			break;
		default:
	}

	const isStartView = !content;

	if (isStartView) {
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

				{isStartView ? null : <CatalogueSearch />}

				{content}
			</div>
		</SitePage>
	);
}
