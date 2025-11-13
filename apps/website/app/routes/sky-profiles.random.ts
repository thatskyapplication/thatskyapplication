import { type SkyProfilePacket, Table } from "@thatskyapplication/utility";
import { type LoaderFunction, redirect } from "react-router";
import pg from "~/pg.server";

export const loader: LoaderFunction = async () => {
	const countResult = await pg<SkyProfilePacket>(Table.Profiles)
		.whereNotNull("name")
		.count({ total: "*" })
		.first();

	const randomProfile = Math.floor(Math.random() * Number(countResult!.total!) + 1);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.whereNotNull("name")
		.limit(1)
		.offset(randomProfile)
		.first();

	if (!skyProfilePacket) {
		throw new Response(null, { status: 404 });
	}

	return redirect(`/sky-profiles/${skyProfilePacket.user_id}`);
};
