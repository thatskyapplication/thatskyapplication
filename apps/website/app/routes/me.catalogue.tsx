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
	skyEventFamilies,
	skyNow,
	skySeasons,
	spirits,
	TIME_ZONE,
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
import { getLocale } from "~/middleware/i18next.js";
import { parseCosmetics, resolveScopeCosmetics } from "~/utility/catalogue.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import { getPreferredHour12 } from "~/utility/hour-cycle.server.js";
import { getPreferredTimeZone } from "~/utility/time-zone.server.js";
import type { Route } from "./+types/me.catalogue.js";

export const loader = async ({ request, context, url }: Route.LoaderArgs) => {
	const locale = getLocale(context);
	const timeZone = await getPreferredTimeZone(request);
	const hour12 = getPreferredHour12(request);
	const { discordUser } = requireDiscordAuthentication({ context, request, url });

	const cataloguePacket = await database
		.selectFrom("catalogue")
		.selectAll()
		.where("user_id", "=", discordUser.id)
		.executeTakeFirst();

	return {
		data: cataloguePacket?.data ?? [],
		locale,
		now: skyNow().epochMilliseconds,
		showEverythingButton: cataloguePacket?.show_everything_button ?? false,
		timeZone,
		hour12,
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

	const cataloguePacket = await database
		.selectFrom("catalogue")
		.selectAll()
		.where("user_id", "=", discordUser.id)
		.executeTakeFirst();

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

	await database
		.insertInto("catalogue")
		.values({ data: [...data], last_updated_at: new Date(), user_id: discordUser.id })
		.onConflict((oc) =>
			oc.column("user_id").doUpdateSet((eb) => ({
				data: eb.ref("excluded.data"),
				last_updated_at: eb.ref("excluded.last_updated_at"),
			})),
		)
		.execute();

	return;
};

export default function Catalogue({ loaderData }: Route.ComponentProps) {
	const {
		data: dataArray,
		locale,
		now: nowMillis,
		showEverythingButton,
		timeZone,
		hour12,
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
						locale={locale}
						seasonId={season.id}
						showEverythingButton={showEverythingButton}
						timeZone={timeZone}
						hour12={hour12}
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
						family={eventFamily}
						locale={locale}
						showEverythingButton={showEverythingButton}
						timeZone={timeZone}
						hour12={hour12}
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
