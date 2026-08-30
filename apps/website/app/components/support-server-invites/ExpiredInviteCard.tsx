import { SkeletonText } from "~/components/SkeletonText.js";
import { DeleteExpiredInvite } from "~/components/support-server-invites/DeleteExpiredInvite.js";

export interface ExpiredInvite {
	code: string;
	createdAt: number;
	createdLabel: string;
	expiredLabel: string;
	name: string;
	uses: number;
}

export function ExpiredInviteCard({
	invite,
	timeZoneEstimated,
}: {
	invite: ExpiredInvite;
	timeZoneEstimated: boolean;
}) {
	const { createdLabel, expiredLabel } = invite;

	return (
		<div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
			<div className="flex min-w-0 grow flex-col gap-1">
				<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
					<span className="truncate text-sm font-medium text-gray-700 dark:text-gray-300">
						{invite.name}
					</span>
					<span className="rounded-sm bg-gray-200 px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
						Expired
					</span>
				</div>
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-700 dark:text-gray-300">
					<span className="font-mono line-through">{invite.code}</span>
					<span className="font-medium">{invite.uses === 1 ? "1 use" : `${invite.uses} uses`}</span>
				</div>
				<div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
					<span>
						Created {timeZoneEstimated ? <SkeletonText>{createdLabel}</SkeletonText> : createdLabel}
					</span>
					<span>
						Expired {timeZoneEstimated ? <SkeletonText>{expiredLabel}</SkeletonText> : expiredLabel}
					</span>
				</div>
			</div>
			<DeleteExpiredInvite code={invite.code} createdAt={invite.createdAt} name={invite.name} />
		</div>
	);
}
