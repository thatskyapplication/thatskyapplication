import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useLoaderData } from "@remix-run/react";
import { INVITE_SUPPORT_SERVER_URL } from "~/utility/constants";
import { friendshipActionGIFs } from "~/utility/functions.js";

export const loader = () => ({ gifs: friendshipActionGIFs() });

export default function FriendshipActions() {
	const { gifs } = useLoaderData<typeof loader>();

	return (
		<div>
			<h1 className="mt-4">Friendship Actions</h1>
			<hr />
			<p>Just like Sky, you can do all sorts of friendship actions! Try the following out:</p>
			<ul className="list-disc pl-5">
				<li>
					<code>/hair-tousle</code>
				</li>
				<li>
					<code>/high-five</code>
				</li>
				<li>
					<code>/hug</code>
				</li>
				<li>
					<code>/play-fight</code>
				</li>
			</ul>
			<p>
				There is also a <code>/krill</code> command!
			</p>
			<h2>Example GIFs</h2>
			<div className="flex flex-wrap justify-center gap-4">
				{gifs.map((gif) => (
					<img
						key={gif}
						src={gif}
						alt="Hugging GIF."
						className="w-[calc(33.33%-16px)] max-w-[400px] aspect-square rounded-md shadow-md"
					/>
				))}
			</div>
			<h2>Submit your GIF!</h2>
			<p>Like what you see? These were all created by the community!</p>
			<p>You can submit one too. GIFs must meet the following criteria:</p>
			<ul className="list-disc pl-5">
				<li>
					Recorded on a device with native screen recording (iOS, macOS, etc.) to ensure elements
					are not visible
				</li>
				<li>Recorded in the highest definition mode possible</li>
				<li>Must be an aspect ratio of 1:1</li>
				<li>Must not exceed 512x512</li>
				<li>Must not exceed 5 MB</li>
				<li>Must not have noticeable compression</li>
			</ul>
			<p>
				Once you've ensured your GIF meets the requirements, you can head on over to the{" "}
				<a
					href={INVITE_SUPPORT_SERVER_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="regular-link inline-flex items-center transition duration-200"
				>
					support server
					<ArrowTopRightOnSquareIcon className="ml-1 w-4 h-4" />
				</a>{" "}
				and mention a developer that you want to submit a GIF! You may also submit a raw video and
				the work will be done for you.
			</p>
		</div>
	);
}
