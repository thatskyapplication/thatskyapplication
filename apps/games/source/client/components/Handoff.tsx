import type { Snowflake } from "@discordjs/core/http-only";
import type { Strings } from "../api.js";
import { profileFor } from "../participants.js";
import { ActionButton } from "./ActionButton.js";
import { Panel, PanelHeading } from "./Panel.js";

const ROW_CLASS = "flex items-center justify-center gap-2" as const;
const AVATAR_CLASS = "size-5 shrink-0 rounded-full bg-white/10" as const;

interface HandoffProps {
	busy: boolean;
	onGive: (userId: Snowflake) => void;
	participants: readonly Snowflake[];
	strings: Strings;
}

export function Handoff({ busy, onGive, participants, strings }: HandoffProps) {
	return (
		<Panel>
			<PanelHeading>{strings.giveControl}</PanelHeading>
			<div className="flex flex-col gap-2">
				{participants.map((id) => (
					<ActionButton
						className="w-full"
						disabled={busy}
						key={id}
						onClick={() => onGive(id)}
						size="medium"
						variant="option"
					>
						<span className={ROW_CLASS}>
							<img alt="" className={AVATAR_CLASS} src={profileFor(id)?.avatarURL} />
							{profileFor(id)?.name ?? strings.leaderboardUnnamed}
						</span>
					</ActionButton>
				))}
			</div>
		</Panel>
	);
}
