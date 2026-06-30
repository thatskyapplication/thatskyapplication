import { type LoaderFunction, redirect } from "react-router";
import { publicProfilesQuery } from "~/features/sky-profile/sky-profile-repository.server.js";

export const loader: LoaderFunction = async () => {
	const countResult = await publicProfilesQuery().count({ total: "*" }).first();
	const randomProfile = Math.floor(Math.random() * Number(countResult!.total!));

	const skyProfilePacket = await publicProfilesQuery().limit(1).offset(randomProfile).first();

	if (!skyProfilePacket) {
		throw new Response(null, { status: 404 });
	}

	return redirect(`/sky-profiles/${skyProfilePacket.user_id}`);
};
