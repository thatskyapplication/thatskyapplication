import { Locale } from "@discordjs/core/http-only";
import { getInstance } from "~/middleware/i18next.js";
import { friendshipTreeImageResponse } from "~/utility/friendship-tree.server.js";
import { isLocale } from "~/utility/locale.js";
import type { Route } from "./+types/spirits_.friendship-trees.$file.js";

export const loader = async ({ context, params, url }: Route.LoaderArgs) => {
	const locale = url.searchParams.get("lng") ?? Locale.EnglishGB;

	const response = isLocale(locale)
		? await friendshipTreeImageResponse(params.file, url.searchParams.get("v"), {
				locale,
				t: getInstance(context).getFixedT(locale),
			})
		: null;

	if (!response) {
		throw new Response(null, { status: 404 });
	}

	return response;
};
