import { clsx } from "clsx";
import type React from "react";

const PANEL_CLASS =
	"kindling mx-auto flex w-full max-w-md landscape:max-w-2xl flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl short:gap-3 short:p-4 tiny:gap-2 tiny:rounded-xl tiny:p-3" as const;

export const SPLIT_CLASS =
	"flex flex-col gap-5 short:gap-3 landscape:flex-row landscape:items-center landscape:gap-6" as const;

export const SPLIT_ASIDE_CLASS = "flex flex-1 flex-col gap-4 short:gap-3" as const;

const PANEL_HEADING_CLASS =
	"text-center text-lg font-semibold tracking-wide text-white short:text-base tiny:text-sm" as const;

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={clsx(PANEL_CLASS, className)}>{children}</div>;
}

export function PanelHeading({ children }: { children: React.ReactNode }) {
	return <h1 className={PANEL_HEADING_CLASS}>{children}</h1>;
}
