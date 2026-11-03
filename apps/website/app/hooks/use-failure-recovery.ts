import { useEffect } from "react";
import { isRouteErrorResponse, useRevalidator } from "react-router";

const FAILURE_RECOVERY_INTERVAL = 5_000 as const;

const NETWORK_FAILURE_MESSAGES = new Set([
	"Failed to fetch",
	"Load failed",
	"NetworkError when attempting to fetch resource.",
]);

function isTransientFailure(error: unknown) {
	return isRouteErrorResponse(error)
		? error.status > 500
		: error instanceof TypeError && NETWORK_FAILURE_MESSAGES.has(error.message);
}

export function useFailureRecovery(error: unknown) {
	const { revalidate } = useRevalidator();
	const isTransient = isTransientFailure(error);

	useEffect(() => {
		if (!isTransient) {
			return;
		}

		const retry = () => {
			if (navigator.onLine && document.visibilityState === "visible") {
				void revalidate();
			}
		};

		const interval = setInterval(retry, FAILURE_RECOVERY_INTERVAL);
		window.addEventListener("online", retry);

		return () => {
			clearInterval(interval);
			window.removeEventListener("online", retry);
		};
	}, [isTransient, revalidate]);
}
