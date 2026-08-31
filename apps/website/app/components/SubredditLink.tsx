import { ExternalLink } from "~/components/ExternalLink";

const SUBREDDIT_NAME = "SkyChildrenOfLight" as const;
const SUBREDDIT_URL = `https://reddit.com/r/${SUBREDDIT_NAME}` as const;

export function SubredditLink() {
	return (
		<ExternalLink href={SUBREDDIT_URL} icon iconClassName="h-3.5 w-3.5">
			r/{SUBREDDIT_NAME}
		</ExternalLink>
	);
}
