import {
	SiAndroid,
	SiAndroidHex,
	SiIos,
	SiIosHex,
	SiMacos,
	SiMacosHex,
	SiNintendoswitch,
	SiNintendoswitchHex,
	SiPlaystation,
	SiPlaystationHex,
	SiSteam,
	SiSteamHex,
} from "@icons-pack/react-simple-icons";
import { PlatformId } from "@thatskyapplication/utility";

export const PlatformToIcon = {
	[PlatformId.iOS]: <SiIos color={SiIosHex} className="h-6 w-6" />,
	[PlatformId.Android]: <SiAndroid color={SiAndroidHex} className="h-6 w-6" />,
	[PlatformId.Mac]: <SiMacos color={SiMacosHex} className="h-6 w-6" />,
	[PlatformId.NintendoSwitch]: <SiNintendoswitch color={SiNintendoswitchHex} className="h-6 w-6" />,
	[PlatformId.PlayStation]: <SiPlaystation color={SiPlaystationHex} className="h-6 w-6" />,
	[PlatformId.Steam]: <SiSteam color={SiSteamHex} className="h-6 w-6" />,
} as const;
