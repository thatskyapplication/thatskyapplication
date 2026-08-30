import { clsx } from "clsx";
import { Equal, Plus, Search } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	LATEST_PATCH_NOTE,
	LATEST_PATCH_NOTE_IDENTIFIER,
	PATCH_NOTE_REDIRECTS,
	patchNoteVersion,
	REDIRECTS,
	resolveRedirect,
	THATSKYLINK_URL,
} from "@thatskyapplication/sky-links";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import { SitePage } from "~/components/PageLayout";
import { Tooltip } from "~/components/Tooltip";
import { useSearchShortcut } from "~/hooks/use-search-shortcut.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { APPLICATION_ICON_URL } from "~/utility/constants";
import { PASSWORD_MANAGER_IGNORE_ATTRIBUTES } from "~/utility/password-manager.js";
import {
	SEARCH_ICON_CLASS,
	SEARCH_INPUT_CLASS,
	SEARCH_SHORTCUT_HINT_CLASS,
} from "~/utility/styles.js";
import type { Route } from "./+types/thatskylink.js";

const THATSKYLINK_TITLE = "thatskylink" as const;

const THATSKYLINK_DESCRIPTION =
	"A link redirector for Sky: Children of the Light. Point anyone to the wiki, patch notes, Sky profiles, and more." as const;

const HTTPS_SCHEME = "https://" as const;

const EXAMPLE_IDENTIFIER = "wiki" as const;

const IDENTIFIER_CLASS =
	"rounded-sm bg-gray-200 px-1.5 py-0.5 font-mono text-sm text-black transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600" as const;

const OPERATOR_CLASS =
	"flex shrink-0 justify-center self-center text-gray-500 dark:text-gray-400" as const;

const FORMULA_TERM_CLASS =
	"grow rounded-lg border p-3 text-center font-mono text-sm break-all transition-colors" as const;

const FORMULA_NEUTRAL_CLASS =
	"border-gray-200 bg-gray-100 text-black dark:border-gray-700 dark:bg-gray-900 dark:text-white" as const;

const FORMULA_GREEN_CLASS =
	"border-green-200 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-900/20 dark:text-green-200" as const;

const CARD_CLASS =
	"mb-3 break-inside-avoid rounded-lg border border-gray-200 bg-gray-100 p-3 dark:border-gray-700 dark:bg-gray-900" as const;

const GRID_CLASS = "m-0 list-none columns-1 gap-3 p-0 sm:columns-2 lg:columns-3" as const;

const DETAIL_CLASS = "m-0 mt-2 text-sm text-gray-600 dark:text-gray-400" as const;

const FLOATING_SURFACE_CLASS =
	"bg-white/90 shadow-lg backdrop-blur-md dark:bg-gray-900/90" as const;

function searchTerms(...terms: readonly string[]) {
	return terms.map((term) => term.toLowerCase());
}

const LINKS = REDIRECTS.map(({ identifiers, url }) => ({
	destination: displayURL(url),
	identifiers,
	search: searchTerms(...identifiers, displayURL(url)),
	url,
}));

const PATCH_NOTE_LINKS = PATCH_NOTE_REDIRECTS.toReversed().map(
	({ identifier, identifiers, url }) => {
		const version = patchNoteVersion(identifier);

		return {
			identifier,
			identifiers,
			search: searchTerms(...identifiers, version, displayURL(url)),
			url,
			version,
		};
	},
);

const LATEST_PATCH_NOTE_VERSION = patchNoteVersion(LATEST_PATCH_NOTE.identifier);

function destinationOf(pathname: string) {
	const redirect = resolveRedirect(pathname);

	if (redirect === null) {
		throw new Error(`${pathname} does not resolve to a redirect.`);
	}

	return redirect.url;
}

function pattern(example: string, path: string, translationKey: string) {
	const destination = destinationOf(example);
	return {
		destination,
		example,
		path,
		search: searchTerms(example, path, displayURL(destination)),
		translationKey,
	};
}

const PATTERNS = [
	pattern("profiles/618976181026422814", "profiles/<user id>", "thatskylink.sky-profiles"),
	pattern("tmis202601", "tmis<YYYY><MM>", "thatskylink.this-month-in-sky"),
	pattern(
		LATEST_PATCH_NOTE_IDENTIFIER,
		LATEST_PATCH_NOTE_IDENTIFIER,
		"thatskylink.latest-patch-notes",
	),
];

const EXAMPLE_URL = destinationOf(EXAMPLE_IDENTIFIER);

export const loader = ({ context }: Route.LoaderArgs) => {
	const t = getInstance(context).getFixedT(getLocale(context));
	return { description: t("thatskylink.meta-description", { ns: "features" }) };
};

export const meta: Route.MetaFunction = ({ loaderData, location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));
	const description = loaderData?.description ?? THATSKYLINK_DESCRIPTION;

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title: THATSKYLINK_TITLE },
		{ name: "description", content: description },
		{ name: "theme-color", content: "#49add8" },
		{ property: "og:title", content: THATSKYLINK_TITLE },
		{ property: "og:description", content: description },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: APPLICATION_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: THATSKYLINK_TITLE },
		{ name: "twitter:description", content: description },
		{ tagName: "link", rel: "canonical", href: url },
	];
};

function displayURL(url: string) {
	return url.slice(HTTPS_SCHEME.length);
}

function matchesQuery(search: readonly string[], query: string) {
	return search.some((term) => term.includes(query));
}

function Identifier({ identifier }: { identifier: string }) {
	return (
		<a
			className={IDENTIFIER_CLASS}
			href={`${THATSKYLINK_URL}/${identifier}`}
			rel="noopener noreferrer"
			target="_blank"
		>
			{identifier}
		</a>
	);
}

function RedirectLink({ destination, path }: { destination: string; path: string }) {
	return (
		<Tooltip content={<span className="font-mono break-all">{displayURL(destination)}</span>}>
			<a
				className="regular-link mt-2 block font-mono text-sm break-all"
				href={`${THATSKYLINK_URL}/${path}`}
				rel="noopener noreferrer"
				target="_blank"
			>
				/{path}
			</a>
		</Tooltip>
	);
}

function Identifiers({ identifiers }: { identifiers: readonly string[] }) {
	return (
		<div className="flex flex-wrap gap-1.5">
			{identifiers.map((identifier) => (
				<Identifier identifier={identifier} key={identifier} />
			))}
		</div>
	);
}

export default function Thatskylink() {
	const { t } = useTranslation();
	const [query, setQuery] = useState("");
	const searchRef = useRef<HTMLInputElement>(null);
	const searchShortcutHint = useSearchShortcut(searchRef);
	const normalisedQuery = query.trim().toLowerCase();

	const links = LINKS.filter(({ search }) => matchesQuery(search, normalisedQuery));
	const patterns = PATTERNS.filter(({ search }) => matchesQuery(search, normalisedQuery));

	const patchNoteLinks = PATCH_NOTE_LINKS.filter(({ search }) =>
		matchesQuery(search, normalisedQuery),
	);

	return (
		<SitePage>
			<div className="container mx-auto max-w-4xl">
				<h1>{THATSKYLINK_TITLE}</h1>
				<p className="text-gray-500 dark:text-gray-400">
					{t("thatskylink.description", { ns: "features" })}
				</p>
				<div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
					<code className={clsx(FORMULA_TERM_CLASS, FORMULA_NEUTRAL_CLASS)}>
						{`${THATSKYLINK_URL}/`}
					</code>
					<span className={OPERATOR_CLASS}>
						<Plus aria-hidden="true" className="h-4 w-4" />
						<span className="sr-only">+</span>
					</span>
					<a
						className={clsx(
							FORMULA_TERM_CLASS,
							FORMULA_NEUTRAL_CLASS,
							"hover:bg-gray-200 dark:hover:bg-gray-800",
						)}
						href={`${THATSKYLINK_URL}/${EXAMPLE_IDENTIFIER}`}
						rel="noopener noreferrer"
						target="_blank"
					>
						{EXAMPLE_IDENTIFIER}
					</a>
					<span className={OPERATOR_CLASS}>
						<Equal aria-hidden="true" className="h-4 w-4" />
						<span className="sr-only">=</span>
					</span>
					<a
						className={clsx(
							FORMULA_TERM_CLASS,
							FORMULA_GREEN_CLASS,
							"hover:bg-green-100 dark:hover:bg-green-900/40",
						)}
						href={EXAMPLE_URL}
						rel="noopener noreferrer"
						target="_blank"
					>
						{displayURL(EXAMPLE_URL)}
					</a>
				</div>

				<div
					className="sticky z-20 my-4"
					style={{ top: "calc(var(--site-top-bar-height, 0px) + 0.5rem)" }}
				>
					<div className="relative">
						<label className="sr-only" htmlFor="thatskylink-search">
							{t("search-label", { ns: "general" })}
						</label>
						<Search className={SEARCH_ICON_CLASS} />
						<input
							className={clsx(SEARCH_INPUT_CLASS, FLOATING_SURFACE_CLASS)}
							id="thatskylink-search"
							onChange={(event) => setQuery(event.target.value)}
							placeholder={t("thatskylink.search-placeholder", { ns: "features" })}
							ref={searchRef}
							type="search"
							value={query}
							{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
						/>
						{searchShortcutHint && (
							<span aria-hidden="true" className={SEARCH_SHORTCUT_HINT_CLASS}>
								{searchShortcutHint}
							</span>
						)}
					</div>
				</div>

				{links.length === 0 && patterns.length === 0 && patchNoteLinks.length === 0 && (
					<p className="text-gray-600 dark:text-gray-400">{t("no-results", { ns: "general" })}</p>
				)}

				{links.length > 0 && (
					<section>
						<h2>{t("thatskylink.links", { ns: "features" })}</h2>
						<ul className={GRID_CLASS}>
							{links.map((link) => (
								<li className={CARD_CLASS} key={link.identifiers.join(" ")}>
									<Identifiers identifiers={link.identifiers} />
									<a
										className="regular-link mt-2 block text-sm break-all"
										href={link.url}
										rel="noopener noreferrer"
										target="_blank"
									>
										{link.destination}
									</a>
								</li>
							))}
						</ul>
					</section>
				)}

				{patterns.length > 0 && (
					<section>
						<h2>{t("thatskylink.patterns", { ns: "features" })}</h2>
						<ul className={GRID_CLASS}>
							{patterns.map((pattern) => (
								<li className={CARD_CLASS} key={pattern.path}>
									<code className="break-all">{pattern.path}</code>
									<p className={DETAIL_CLASS}>
										{t(pattern.translationKey, {
											ns: "features",
											version: LATEST_PATCH_NOTE_VERSION,
										})}
									</p>
									<RedirectLink destination={pattern.destination} path={pattern.example} />
								</li>
							))}
						</ul>
					</section>
				)}

				{patchNoteLinks.length > 0 && (
					<section>
						<h2>{t("thatskylink.patch-notes", { ns: "features" })}</h2>
						<ul className={GRID_CLASS}>
							{patchNoteLinks.map((patchNoteLink) => (
								<li className={CARD_CLASS} key={patchNoteLink.identifier}>
									<div className="flex flex-wrap items-center justify-between gap-2">
										<Identifiers identifiers={patchNoteLink.identifiers} />
										<span className="font-mono text-sm text-gray-600 dark:text-gray-400">
											{patchNoteLink.version}
										</span>
									</div>
									<RedirectLink destination={patchNoteLink.url} path={patchNoteLink.identifier} />
								</li>
							))}
						</ul>
					</section>
				)}
			</div>
		</SitePage>
	);
}
