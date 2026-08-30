import { SkeletonText } from "~/components/SkeletonText.js";
import { CopyInviteButton } from "~/components/support-server-invites/CopyInviteButton.js";
import { InviteName } from "~/components/support-server-invites/InviteName.js";

export interface SupportServerInvite {
	channelName: string | null;
	code: string;
	createdLabel: string;
	expiresLabel: string | null;
	maximumUses: number;
	name: string;
	temporary: boolean;
	uses: number;
}

const HEADER_CLASS =
	"px-3 py-2 text-left text-xs font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400" as const;

const CELL_CLASS = "px-3 py-2 align-middle text-sm text-gray-600 dark:text-gray-400" as const;

function usesLabel(uses: number, maximumUses: number) {
	return maximumUses > 0 ? `${uses} / ${maximumUses}` : String(uses);
}

export function InviteTable({
	invites,
	timeZoneEstimated,
}: {
	invites: readonly SupportServerInvite[];
	timeZoneEstimated: boolean;
}) {
	return (
		<div className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-100 shadow-md dark:border-gray-700 dark:bg-gray-900">
			<table className="w-full border-collapse">
				<thead>
					<tr className="border-b border-gray-200 dark:border-gray-700">
						<th className={HEADER_CLASS} scope="col">
							Name
						</th>
						<th className={HEADER_CLASS} scope="col">
							Channel
						</th>
						<th className={HEADER_CLASS} scope="col">
							Invite
						</th>
						<th className={HEADER_CLASS} scope="col">
							Uses
						</th>
						<th className={HEADER_CLASS} scope="col">
							Created
						</th>
						<th className={HEADER_CLASS} scope="col">
							Expires
						</th>
					</tr>
				</thead>
				<tbody>
					{invites.map((invite) => (
						<tr
							className="border-b border-gray-200 last:border-b-0 dark:border-gray-700"
							key={invite.code}
						>
							<td className={CELL_CLASS}>
								<InviteName code={invite.code} name={invite.name} />
							</td>
							<td className={CELL_CLASS}>
								{invite.channelName ? `#${invite.channelName}` : "—"}
								{invite.temporary ? (
									<span className="ml-2 text-xs text-gray-500 dark:text-gray-400">Temporary</span>
								) : null}
							</td>
							<td className={CELL_CLASS}>
								<span className="flex items-center gap-1">
									<span className="font-mono text-gray-900 dark:text-gray-100">{invite.code}</span>
									<CopyInviteButton code={invite.code} />
								</span>
							</td>
							<td className={`${CELL_CLASS} whitespace-nowrap tabular-nums`}>
								{usesLabel(invite.uses, invite.maximumUses)}
							</td>
							<td className={`${CELL_CLASS} whitespace-nowrap tabular-nums`}>
								{timeZoneEstimated ? (
									<SkeletonText>{invite.createdLabel}</SkeletonText>
								) : (
									invite.createdLabel
								)}
							</td>
							<td className={`${CELL_CLASS} whitespace-nowrap tabular-nums`}>
								{invite.expiresLabel ? (
									timeZoneEstimated ? (
										<SkeletonText>{invite.expiresLabel}</SkeletonText>
									) : (
										invite.expiresLabel
									)
								) : (
									"Never"
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
