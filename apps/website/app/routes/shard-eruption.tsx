import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { type MetaFunction, useLoaderData } from "@remix-run/react";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import { DateTime } from "luxon";
import TopBar from "~/components/TopBar";
import {
	APPLICATION_NAME,
	SHARD_ERUPTION_DESCRIPTION,
	SHARD_ERUPTION_ICON_URL,
} from "~/utility/constants";
import { TIME_ZONE, skyNow, skyToday } from "~/utility/dates";
import { getLocaleFromRequest } from "~/utility/functions";
import { type ShardEruptionRaw, shardEruption } from "~/wind-paths";

type ShardEruptionCardData = (
	| (Omit<ShardEruptionRaw, "timestamps"> & {
			offset: number;
			timestamps: {
				start: { unix: number; format: string };
				end: { unix: number; format: string };
			}[];
	  })
	| { offset: number }
) & { format: string };

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
		const shards = [];
		const locale = getLocaleFromRequest(request);
		const timeZone = request.headers.get("cf-timezone") ?? TIME_ZONE;

		for (let index = 0; index < 31; index++) {
			shards.push(shardEruption(index));
		}

		const resolvedShards = await Promise.all(shards);

		return resolvedShards.map((shard) => {
			const format = new Intl.DateTimeFormat(locale, {
				timeZone,
				dateStyle: "full",
			}).format(skyToday().plus({ days: shard.offset }).toMillis());

			if (!("timestamps" in shard)) {
				return { ...shard, format };
			}

			return {
				...shard,
				format,
				timestamps: shard.timestamps.map(({ start, end }) => {
					return {
						start: {
							unix: DateTime.fromISO(start).toSeconds(),
							format: new Intl.DateTimeFormat(locale, {
								timeZone,
								hour: "2-digit",
								minute: "2-digit",
								second: "2-digit",
							}).format(new Date(start)),
						},
						end: {
							unix: DateTime.fromISO(end).toSeconds(),
							format: new Intl.DateTimeFormat(locale, {
								timeZone,
								hour: "2-digit",
								minute: "2-digit",
								second: "2-digit",
							}).format(new Date(end)),
						},
					};
				}),
			};
		});
	} catch {
		throw new Response("Unable to fetch the shard eruption.", { status: 500 });
	}
};

function shardEruptionCard(shard: ShardEruptionCardData, now: number) {
	return (
		<div className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border-gray-200 dark:border-gray-700 border rounded-lg shadow flex flex-col items-center text-center w-full max-w-sm p-6">
			<div className="flex flex-row items-center justify-center">
				{"strong" in shard && (
					<img
						src={`https://cdn.thatskyapplication.com/assets/${shard.strong ? "shard_strong" : "shard_regular"}.webp`}
						alt={`${shard.strong ? "Strong" : "Regular"} shard eruption icon.`}
						className="w-5 h-5 mr-1"
					/>
				)}
				<h2 className="text-lg my-0">{shard.format}</h2>
			</div>
			{"url" in shard ? (
				<>
					<a
						href={shard.url}
						target="_blank"
						rel="noopener noreferrer"
						className="regular-link inline-flex items-center text-sm"
					>
						{shard.realm} ({shard.sky_map})
						<ArrowTopRightOnSquareIcon className="ml-1 w-4 h-4" />
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
	const shards = useLoaderData<typeof loader>();
	const now = skyNow();
	const shardCards = shards.map((shard) => shardEruptionCard(shard, now.toUnixInteger()));
	const [firstShard, ...restShards] = shardCards;

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<TopBar />
			<div className="flex flex-wrap pt-20 pb-4 px-4">
				<div className="flex mb-3 w-full justify-center">{firstShard}</div>
				<div className="gap-2 flex flex-wrap justify-center w-full max-w-full">{restShards}</div>
			</div>
		</div>
	);
}
