import { type ReactNode, createContext, useContext } from "react";

const LocaleContext = createContext<string | string[]>("");

interface LocaleProviderProps {
	locale: string | string[];
	children: ReactNode;
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
	return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
	return useContext(LocaleContext);
}
