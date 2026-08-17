import { Link } from "react-router";
import { useCDN } from "~/hooks/use-cdn-url.js";

interface AcknowledgementProfile {
	icon: string | null;
	name: string;
	user_id: string;
}

export function AcknowledgementProfileCards({
	profiles,
}: {
	profiles: readonly AcknowledgementProfile[];
}) {
	const cdn = useCDN();

	return (
		<div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
			{profiles.map((profile) => (
				<Link
					aria-label={profile.name}
					className="group flex items-center gap-3 rounded-lg border-2 border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
					key={profile.user_id}
					to={`/sky-profiles/${profile.user_id}`}
				>
					{profile.icon ? (
						<div
							aria-hidden="true"
							className="h-8 w-8 shrink-0 rounded-full bg-cover bg-center"
							style={{
								backgroundImage: `url(${cdn.skyProfileIconURL(profile.user_id, profile.icon)})`,
							}}
						/>
					) : (
						<div
							aria-hidden="true"
							className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400"
						>
							{profile.name.charAt(0).toUpperCase()}
						</div>
					)}
					<span className="truncate text-sm font-medium transition-colors group-hover:text-pink-600 dark:group-hover:text-pink-400">
						{profile.name}
					</span>
				</Link>
			))}
		</div>
	);
}
