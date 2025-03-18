export interface VersionsPacket {
	version: string;
	app_store_token: string;
}

interface AppPlatformAttributesIOSVersionHistory {
	releaseDate: string;
	releaseNotes: string;
	releaseTimestamp: string;
	versionDisplay: string;
}

interface AppPlatformAttributesIOS {
	versionHistory: AppPlatformAttributesIOSVersionHistory[];
}

interface AppPlatformAttributes {
	ios: AppPlatformAttributesIOS;
}

interface AppAttributes {
	platformAttributes: AppPlatformAttributes;
}

interface AppData {
	attributes: AppAttributes;
}

export interface AppStoreAppResponse {
	data: AppData[];
}
