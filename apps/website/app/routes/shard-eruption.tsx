import type { LoaderFunctionArgs } from "@remix-run/node";
import { type MetaFunction, useLoaderData } from "@remix-run/react";
import {
	type ShardEruptionData,
	shardEruption,
	skyNow,
	skyToday,
	TIME_ZONE,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { ExternalLinkIcon } from "lucide-react";
import Pagination from "~/components/Pagination.js";
import {
	APPLICATION_NAME,
	SHARD_ERUPTION_DESCRIPTION,
	SHARD_ERUPTION_ICON_URL,
} from "~/utility/constants";
import { getLocaleFromRequest } from "~/utility/functions";

type ShardEruptionCardData = {
	shard:
		| (Omit<ShardEruptionData, "timestamps"> & {
				timestamps: {
					start: { unix: number; format: string };
					end: { unix: number; format: string };
				}[];
		  })
		| null;
	todayFormat: string;
};

export const meta: MetaFunction = ({ location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application, Shard Eruptions, Shards`,
		},
		{ title: "Shard Eruption" },
		{ name: "description", content: SHARD_ERUPTION_DESCRIPTION },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: "Shard Eruption" },
		{ property: "og:description", content: SHARD_ERUPTION_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: SHARD_ERUPTION_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: "Shard Eruption" },
		{ name: "twitter:description", content: SHARD_ERUPTION_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const pageParameter = url.searchParams.get("page");
		const shards = [];
		const locale = getLocaleFromRequest(request);
		const timeZone = request.headers.get("cf-timezone") ?? TIME_ZONE;
		const page = pageParameter ? Number(pageParameter) : 0;
		const amount = page === 0 ? 31 : 30;
		const startIndex = page * amount + (page <= 0 ? 0 : 1);
		const endIndex = startIndex + amount;

		for (let index = startIndex; index < endIndex; index++) {
			const shard = shardEruption(index);

			const todayFormat = new Intl.DateTimeFormat(locale, {
				timeZone,
				dateStyle: "full",
			}).format(skyToday().plus({ days: index }).toMillis());

			shards.push({
				shard: shard && {
					...shard,
					timestamps: shard.timestamps.map(({ start, end }) => ({
						start: {
							unix: start.toUnixInteger(),
							format: new Intl.DateTimeFormat(locale, {
								timeZone,
								hour: "2-digit",
								minute: "2-digit",
								second: "2-digit",
							}).format(start.toMillis()),
						},
						end: {
							unix: end.toUnixInteger(),
							format: new Intl.DateTimeFormat(locale, {
								timeZone,
								hour: "2-digit",
								minute: "2-digit",
								second: "2-digit",
							}).format(end.toMillis()),
						},
					})),
				},
				todayFormat,
			});
		}

		return { shards, page };
	} catch {
		throw new Response("Unable to fetch the shard eruption.", { status: 500 });
	}
};

function shardEruptionCard({ shard, todayFormat }: ShardEruptionCardData, now: number) {
	return (
		<div
			key={todayFormat}
			className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border-gray-200 dark:border-gray-700 border rounded-lg shadow flex flex-col items-center text-center w-full max-w-sm p-6"
		>
			<div className="flex flex-row items-center justify-center">
				{shard && (
					<img
						src={`https://cdn.thatskyapplication.com/assets/${shard.strong ? "shard_strong" : "shard_regular"}.webp`}
						alt={`${shard.strong ? "Strong" : "Regular"} shard eruption icon.`}
						className="w-5 h-5 mr-1"
					/>
				)}
				<h2 className="text-lg my-0">{todayFormat}</h2>
			</div>
			{shard ? (
				<>
					<a
						href={shard.url}
						target="_blank"
						rel="noopener noreferrer"
						className="regular-link inline-flex items-center text-sm"
					>
						{shard.realm} ({shard.skyMap})
						<ExternalLinkIcon className="ml-1 w-4 h-4" />
					</a>
					<div className="inline-flex items-center">
						<span className="text-sm">{shard.reward}</span>
						{shard.strong ? (
							<img
								src="https://cdn.thatskyapplication.com/icons/ascended_candle.webp"
								alt="Ascended candle."
								className="h-4 w-4 ml-1"
							/>
						) : (
							<img
								src="https://cdn.thatskyapplication.com/icons/piece_of_light.webp"
								alt="Piece of light."
								className="h-4 w-4 ml-1"
							/>
						)}
					</div>
					{shard.timestamps.map(({ start, end }) => (
						<span key={start.unix}>
							<code
								className={`bg-inherit text-xs ${end.unix < now ? "line-through text-black/50 dark:text-white/50" : ""}`}
							>{`${start.format} - ${end.format}`}</code>
						</span>
					))}
				</>
			) : (
				<p className="pt-6">None</p>
			)}
		</div>
	);
}

export default function ShardEruption() {
	const { shards, page } = useLoaderData<typeof loader>();
	const now = skyNow();
	const shardCards = shards.map((shard) => shardEruptionCard(shard, now.toUnixInteger()));
	const [firstShard, ...restShards] = shardCards;

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<div className="flex-wrap pt-20 pb-4 px-4">
				{page === 0 ? (
					<>
						<div className="flex mb-3 w-full justify-center">{firstShard}</div>
						<div className="gap-2 flex flex-wrap justify-center w-full max-w-full">
							{restShards}
						</div>
					</>
				) : (
					<div className="gap-2 flex flex-wrap justify-center w-full max-w-full">{shardCards}</div>
				)}
				{<Pagination currentPage={page} />}
			</div>
		</div>
	);
}
