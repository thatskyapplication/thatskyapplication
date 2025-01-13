import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useLoaderData } from "@remix-run/react";
import Video from "~/components/Video";
import { INVITE_SUPPORT_SERVER_URL } from "~/utility/constants";
import { huggingGIFs3Unique } from "~/utility/functions";

export const loader = () => ({ gifs: huggingGIFs3Unique() });

export default function Hug() {
	const { gifs } = useLoaderData<typeof loader>();

	return (
		<div>
			<h1 className="mt-4">Hug</h1>
			<hr />
			<p>
				Just like Sky, you can hug someone! Use <code>/hug</code>!
			</p>
			<Video src="https://cdn.thatskyapplication.com/examples/hug.mp4" />
			<h2>Submit your GIF!</h2>
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
				and mention a developer that you want to submit a GIF!
			</p>
		</div>
	);
}
