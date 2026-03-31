import { useRouteLoaderData } from "react-router";

type RootLoaderDataWithCDNURL = {
	cdnURL: string;
};

export function useCDNURL() {
	const rootData = useRouteLoaderData("root") as RootLoaderDataWithCDNURL | undefined;

	if (!rootData?.cdnURL) {
		throw new Error("CDN URL was missing from the root loader data.");
	}

	return rootData.cdnURL;
}
