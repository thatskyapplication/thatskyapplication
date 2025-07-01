import { data, Link, useLoaderData } from "@remix-run/react";
import {
	FRIENDSHIP_ACTIONS_CONTRIBUTORS_ARRAY,
	type SkyProfilePacket,
	Table,
} from "@thatskyapplication/utility";
import { ExternalLinkIcon } from "lucide-react";
import pg from "~/pg.server";
import { APPLICATION_NAME, WIKI_URL } from "~/utility/constants";

export const loader = async () => {
	const contributors = await pg<SkyProfilePacket>(Table.Profiles)
		.select("user_id", "name")
		.whereIn("user_id", FRIENDSHIP_ACTIONS_CONTRIBUTORS_ARRAY)
		.whereNotNull("name")
		.orderBy("name", "asc")
		.orderBy("user_id", "asc");

	return data(contributors, {
		headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
	});
};

export default function Acknowledgements() {
	const skyProfilePackets = useLoaderData<typeof loader>();

	return (
		<div>
			<h1 className="mt-4">Acknowledgements</h1>
			<hr />
			{skyProfilePackets.length > 0 && (
				<>
					<h2>Friendship actions contributors</h2>
					<p>
						Thank you to those who have contributed to{" "}
						<Link to="/caelus/friendship-actions" className="regular-link">
							friendship actions
						</Link>{" "}
						for everyone to enjoy!
					</p>
					<ul className="list-disc pl-5 space-y-1">
						{skyProfilePackets.map((profile) => (
							<li key={profile.user_id}>
								<Link to={`/sky-profiles/${profile.user_id}`} className="regular-link">
									{profile.name}
								</Link>
							</li>
						))}
					</ul>
				</>
			)}
			<h2>Wiki</h2>
			<p>
				{APPLICATION_NAME} has over 1,000 assets uploaded directly from the{" "}
				<a
					href={WIKI_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="regular-link inline-flex items-center transition duration-200"
				>
					Sky: Children of the Light
					<ExternalLinkIcon className="ml-1 w-4 h-4" />
				</a>{" "}
				wiki. We are thankful for them!
			</p>
		</div>
	);
}
