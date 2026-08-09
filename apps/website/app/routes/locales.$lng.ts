import { Locale } from "@discordjs/core/http-only";
import {
	de,
	enGB,
	es419,
	esES,
	fr,
	it,
	ja,
	ko,
	ptBR,
	ru,
	th,
	vi,
	zhCN,
	zhTW,
} from "@thatskyapplication/utility";
import type { Route } from "./+types/locales.$lng.js";

const RESOURCES: Readonly<Record<string, { general: unknown; features: unknown }>> = {
	[Locale.German]: de,
	[Locale.EnglishGB]: enGB,
	[Locale.SpanishLATAM]: es419,
	[Locale.SpanishES]: esES,
	[Locale.French]: fr,
	[Locale.Italian]: it,
	[Locale.Japanese]: ja,
	[Locale.Korean]: ko,
	[Locale.PortugueseBR]: ptBR,
	[Locale.Russian]: ru,
	[Locale.Thai]: th,
	[Locale.Vietnamese]: vi,
	[Locale.ChineseCN]: zhCN,
	[Locale.ChineseTW]: zhTW,
};

export function loader({ params }: Route.LoaderArgs) {
	const resource = RESOURCES[params.lng] ?? enGB;

	return Response.json(
		{ general: resource.general, features: resource.features },
		{ headers: { "Cache-Control": "no-store", "Clear-Site-Data": '"cache"' } },
	);
}
