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
	[PlatformId.iOS]: <SiIos className="h-6 w-6" color={SiIosHex} />,
	[PlatformId.Android]: <SiAndroid className="h-6 w-6" color={SiAndroidHex} />,
	[PlatformId.Mac]: <SiMacos className="h-6 w-6" color={SiMacosHex} />,
	[PlatformId.NintendoSwitch]: <SiNintendoswitch className="h-6 w-6" color={SiNintendoswitchHex} />,
	[PlatformId.PlayStation]: <SiPlaystation className="h-6 w-6" color={SiPlaystationHex} />,
	[PlatformId.Steam]: <SiSteam className="h-6 w-6" color={SiSteamHex} />,
} as const;
