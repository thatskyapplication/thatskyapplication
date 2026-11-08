import type { ChecklistColumn, CostEntry, Emoji } from "@thatskyapplication/utility";
import type { ExternalLinkListItem } from "~/components/ExternalLinkList";
import type { OfferTile } from "~/utility/cosmetics.js";

export const WHATS_HAPPENING_IN_SKY_CARD_CLASS =
	"flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900" as const;

export interface SpiritOffer {
	key: string;
	label: string;
	pageURL?: string | undefined;
	tiles: readonly OfferTile[];
}

export interface SpiritTree {
	key: string;
	label: string;
	levels: readonly (readonly (OfferTile | null)[])[];
	pageURL: string;
}

export interface Offer {
	flat: readonly OfferTile[];
	ownedLabel: string | null;
	remaining: readonly CostEntry[] | null;
	spirits: readonly SpiritOffer[];
	total: readonly CostEntry[];
	trees: readonly SpiritTree[];
}

export interface ChecklistToggleData {
	column: ChecklistColumn;
	complete: boolean;
	completeLabel: string;
	incompleteLabel: string;
}

export interface CardEarn {
	emoji: Emoji | null;
	text: string;
}

export interface CardNote {
	emoji: Emoji;
	key: string;
	label: string;
	relative: string;
	when: string;
}

export interface ActiveCard {
	catalogueURL?: string | undefined;
	dayOf: string;
	daysLeft: string;
	dyes?: readonly Emoji[] | undefined;
	earn?: CardEarn | undefined;
	emoji: Emoji | null;
	ends: string;
	endUnconfirmed?: boolean | undefined;
	key: string;
	label: string;
	notes?: readonly CardNote[] | undefined;
	offer?: Offer | undefined;
	pageURL?: string | null | undefined;
	spiritLinks?: readonly ExternalLinkListItem[] | undefined;
	toggle?: ChecklistToggleData | undefined;
	wide?: boolean | undefined;
	wikiURL?: string | null | undefined;
}

export type ActiveEntry = ActiveCard | ChecklistToggleData;

export interface UpcomingRow {
	emoji?: Emoji | null | undefined;
	key: string;
	label?: string | undefined;
	relative: string;
	spiritLinks?: readonly ExternalLinkListItem[] | undefined;
	url?: string | null | undefined;
	when: string;
}

export interface TodayView {
	quests: readonly string[];
	questsToggle: ChecklistToggleData | undefined;
	shard: {
		label: string;
		reward: number;
		strong: boolean;
		timestamps: readonly {
			end: { format: string; unix: number };
			start: { format: string; unix: number };
		}[];
		toggle: ChecklistToggleData | undefined;
	} | null;
}
