interface ViteTypeOptions {
	strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
	readonly VITE_SENTRY_DATA_SOURCE_NAME?: string;
	readonly VITE_SENTRY_RELEASE?: string;
}
