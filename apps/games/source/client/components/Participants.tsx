import type { Snowflake } from "@discordjs/core/http-only";
import { useSyncExternalStore } from "react";
import { profileFor, profilesSnapshot, subscribeToParticipants } from "../participants.js";

const CORNER_CLASS =
	"tile:hidden mt-[var(--safe-area-inset-top)] ml-[var(--safe-area-inset-left)] flex max-w-[10rem] shrink-0 flex-col gap-1 self-start" as const;
const HOST_ROW_CLASS = "flex items-center gap-1.5" as const;
const HOST_AVATAR_CLASS =
	"ring-candle/70 short:size-5 size-6 shrink-0 rounded-full bg-white/10 ring-2" as const;
const HOST_NAME_CLASS = "truncate text-xs font-medium text-white/85" as const;
const SPECTATOR_ROW_CLASS = "flex flex-wrap items-center gap-1" as const;
const SPECTATOR_AVATAR_CLASS = "short:size-4 size-5 rounded-full bg-white/10 opacity-70" as const;
const OVERFLOW_CLASS = "text-[0.625rem] font-semibold text-white/50 tabular-nums" as const;
const VISIBLE_LIMIT = 6 as const;

interface ParticipantsProps {
	hostLabel: string;
	participants: readonly Snowflake[];
	primaryUserId: Snowflake | null;
	unnamedLabel: string;
}

export function Participants({
	hostLabel,
	participants,
	primaryUserId,
	unnamedLabel,
}: ParticipantsProps) {
	useSyncExternalStore(subscribeToParticipants, profilesSnapshot);

	const hostId =
		primaryUserId === null ? null : (participants.find((id) => id === primaryUserId) ?? null);

	const host = hostId === null ? null : profileFor(hostId);
	const spectators = participants.filter((id) => id !== hostId);
	const visible = spectators.slice(0, VISIBLE_LIMIT);
	const overflow = spectators.length - visible.length;

	return (
		<div className={CORNER_CLASS}>
			{hostId !== null && (
				<div className={HOST_ROW_CLASS} title={hostLabel}>
					{host !== null && <img alt="" className={HOST_AVATAR_CLASS} src={host.avatarURL} />}
					<span className={HOST_NAME_CLASS}>{host?.name ?? unnamedLabel}</span>
				</div>
			)}
			{visible.length > 0 && (
				<div className={SPECTATOR_ROW_CLASS}>
					{visible.map((id) => {
						const profile = profileFor(id);

						return (
							profile !== null && (
								<img
									alt=""
									className={SPECTATOR_AVATAR_CLASS}
									key={id}
									src={profile.avatarURL}
									title={profile.name}
								/>
							)
						);
					})}
					{overflow > 0 && <span className={OVERFLOW_CLASS}>+{overflow}</span>}
				</div>
			)}
		</div>
	);
}
