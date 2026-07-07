import { type LoaderFunction, redirect } from "react-router";
import { publicProfilesQuery } from "~/features/sky-profile/sky-profile-repository.server.js";

export const loader: LoaderFunction = async () => {
	const countResult = await publicProfilesQuery()
		.select((eb) => eb.fn.countAll<string>().as("total"))
		.executeTakeFirst();

	const randomProfile = Math.floor(Math.random() * Number(countResult!.total));

	const skyProfilePacket = await publicProfilesQuery()
		.selectAll()
		.limit(1)
		.offset(randomProfile)
		.executeTakeFirst();

	if (!skyProfilePacket) {
		throw new Response(null, { status: 404 });
	}

	return redirect(`/sky-profiles/${skyProfilePacket.user_id}`);
};
