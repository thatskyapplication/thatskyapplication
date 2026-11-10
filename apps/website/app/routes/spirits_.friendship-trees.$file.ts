import { friendshipTreeImageResponse } from "~/utility/friendship-tree.server.js";
import type { Route } from "./+types/spirits_.friendship-trees.$file.js";

export const loader = async ({ params, url }: Route.LoaderArgs) => {
	const response = await friendshipTreeImageResponse(params.file, url.searchParams.get("v"));

	if (!response) {
		throw new Response(null, { status: 404 });
	}

	return response;
};
