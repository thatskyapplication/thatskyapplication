import { useState } from "react";
import type { Strings } from "../api.js";
import { openLink } from "../link.js";
import { ActionButton } from "./ActionButton.js";
import { Panel, PanelHeading } from "./Panel.js";

const INPUT_CLASS =
	"w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-white placeholder:text-white/30 focus:border-candle/50 focus:outline-none" as const;
const ERROR_CLASS = "text-center text-sm text-red-300/90" as const;

interface SkyProfileNameGateProps {
	busy: boolean;
	error: string | null;
	maximumLength: number;
	onSave: (name: string) => void;
	skyProfileURL: string;
	strings: Strings;
}

export function SkyProfileNameGate({
	busy,
	error,
	maximumLength,
	onSave,
	skyProfileURL,
	strings,
}: SkyProfileNameGateProps) {
	const [name, setName] = useState("");

	return (
		<Panel>
			<PanelHeading>{strings.nameRequired}</PanelHeading>
			<form
				className="flex flex-col gap-3"
				onSubmit={(event) => {
					event.preventDefault();
					onSave(name);
				}}
			>
				<input
					aria-label={strings.namePlaceholder}
					autoComplete="off"
					className={INPUT_CLASS}
					maxLength={maximumLength}
					onChange={(event) => setName(event.target.value)}
					placeholder={strings.namePlaceholder}
					required
					type="text"
					value={name}
				/>
				{error !== null && <p className={ERROR_CLASS}>{error}</p>}
				<ActionButton
					className="w-full"
					disabled={busy || name.trim().length === 0}
					size="large"
					type="submit"
					variant="primary"
				>
					{strings.save}
				</ActionButton>
			</form>
			<ActionButton
				onClick={() => {
					void openLink(skyProfileURL);
				}}
				size="medium"
				variant="quiet"
			>
				{strings.skyProfileWebsite}
			</ActionButton>
		</Panel>
	);
}
