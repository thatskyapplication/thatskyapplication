import { type LoaderFunction, redirect } from "@remix-run/node";
import pg from "~/pg.server";
import { Table } from "~/utility/constants";
import type { ProfilePacket } from "~/utility/types.js";

export const loader: LoaderFunction = async () => {
	const countResult = await pg<ProfilePacket>(Table.Profiles)
		.whereNotNull("name")
		.count({ total: "*" })
		.first();

	const randomProfile = Math.floor(Math.random() * Number(countResult!.total!) + 1);

	const profilePacket = await pg<ProfilePacket>(Table.Profiles)
		.limit(1)
		.offset(randomProfile)
		.first();

	if (!profilePacket) {
		throw new Response("No profile found.", { status: 404 });
	}

	return redirect(`/sky-profiles/${profilePacket.user_id}`);
};
