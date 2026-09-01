import { clsx } from "clsx";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import { ExternalLink } from "~/components/ExternalLink";
import { SitePage } from "~/components/PageLayout";
import { SubredditLink } from "~/components/SubredditLink";
import { MAJOR_HEADING_CLASS, PAGE_TITLE_CLASS } from "~/utility/styles.js";
import type { Route } from "./+types/sky-elder.terms-privacy.js";

const SKY_ELDER_NAME = "Sky Elder" as const;
const SKY_ELDER_TITLE = `${SKY_ELDER_NAME} terms & privacy` as const;

const SKY_ELDER_DESCRIPTION =
	`${SKY_ELDER_NAME}, a Reddit application for Sky: Children of the Light communities.` as const;

const SKY_ELDER_REPOSITORY_URL =
	"https://github.com/thatskyapplication/thatskyapplication/tree/main/apps/sky-elder" as const;

const LIST_CLASS = "my-4 list-disc space-y-2 ps-6" as const;
const SKY_ELDER_ICON_URL = new URL("/sky-elder.webp", WEBSITE_URL).href;

export const meta: Route.MetaFunction = ({ location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title: SKY_ELDER_TITLE },
		{ name: "description", content: SKY_ELDER_DESCRIPTION },
		{ name: "theme-color", content: "#49add8" },
		{ property: "og:title", content: SKY_ELDER_TITLE },
		{ property: "og:description", content: SKY_ELDER_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: SKY_ELDER_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: SKY_ELDER_TITLE },
		{ name: "twitter:description", content: SKY_ELDER_DESCRIPTION },
		{ tagName: "link", rel: "canonical", href: url },
	];
};

export default function SkyElderTermsPrivacy() {
	return (
		<SitePage>
			<div className="container mx-auto max-w-2xl space-y-4">
				<h1 className={clsx(PAGE_TITLE_CLASS, "mb-6")}>Terms &amp; privacy</h1>
				<p className="text-gray-500 dark:text-gray-400">
					{SKY_ELDER_NAME} is a Reddit application. It helps moderate <SubredditLink /> and mirrors
					what happens there to Discord.
				</p>
				<hr />

				<h2 className={MAJOR_HEADING_CLASS}>What it does</h2>
				<p>{SKY_ELDER_NAME} is unlisted, but we are now enforced to make this.</p>
				<p>
					In <SubredditLink />, {SKY_ELDER_NAME}:
				</p>
				<ul className={LIST_CLASS}>
					<li>
						creates and maintains the friend codes megathread, and updates any rules or removal
						reasons that link to the previous one
					</li>
					<li>mirrors new posts to Discord</li>
					<li>mirrors comments to Discord as they are made, edited, and deleted</li>
					<li>
						flags user flair that appears to contain profanity, and clears the placeholder flair
						Reddit leaves behind
					</li>
					<li>Determines how often each post flair is used</li>
				</ul>

				<h2 className={MAJOR_HEADING_CLASS}>What it reads</h2>
				<p>
					Only what Reddit already shows publicly in <SubredditLink />.
				</p>

				<h2 className={MAJOR_HEADING_CLASS}>What it stores</h2>
				<p>Storage is provided by Reddit and lives on Reddit. {SKY_ELDER_NAME} keeps only:</p>
				<ul className={LIST_CLASS}>
					<li>
						comment bodies, so that an edit can be shown next to the original and a deletion can
						show what was removed. These expire seven days after the comment is posted or last
						edited, and are removed immediately when the comment is deleted.
					</li>
					<li>the id of the current friend codes megathread</li>
					<li>
						how many times each post flair has been used, and which flair each post currently has
					</li>
					<li>the id of the Discord message holding the post flair statistics</li>
				</ul>

				<h2 className={MAJOR_HEADING_CLASS}>Where it goes</h2>
				<p>
					{SKY_ELDER_NAME} posts to Discord webhook addresses set in its settings, and sends to
					those:
				</p>
				<ul className={LIST_CLASS}>
					<li>
						new posts, with the title, body, attached media, and the author's username and profile
						link
					</li>
					<li>
						comments as they are made, edited, and deleted, with the body, the author's username,
						profile link, and karma, and how many times the comment was reported. An edit sends the
						previous body next to the new one, and a deletion sends the body that was removed.
					</li>
					<li>
						user flair flagged as potentially inappropriate, alongside the username and the flair
						text
					</li>
					<li>post flair counts, which name nobody</li>
				</ul>
				<p>
					Posts marked NSFW are not mirrored. Discord is the only destination, and the only server
					reached is the one those settings point at.
				</p>

				<h2 className={MAJOR_HEADING_CLASS}>Deleting your data</h2>
				<p>
					Delete your comment on Reddit and the stored copy goes with it. Leave it be and the copy
					expires after seven days regardless.
				</p>

				<h2 className={MAJOR_HEADING_CLASS}>Use</h2>
				<p>
					{SKY_ELDER_NAME} acts only in <SubredditLink /> and is operated by its moderators.
				</p>
				<p>
					{SKY_ELDER_NAME} is{" "}
					<ExternalLink href={SKY_ELDER_REPOSITORY_URL} icon iconClassName="h-3.5 w-3.5">
						open source
					</ExternalLink>
					, so everything described here can be read in full.
				</p>

				<h2 className={MAJOR_HEADING_CLASS}>Contact</h2>
				<p>
					To report a problem with {SKY_ELDER_NAME}, to ask what it holds about you, or to have
					something removed, send a mod mail in to <SubredditLink />.
				</p>
			</div>
		</SitePage>
	);
}
