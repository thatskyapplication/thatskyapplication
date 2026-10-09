import { SiCrowdin, SiDiscord } from "@icons-pack/react-simple-icons";
import type { TFunction } from "i18next";
import { BookOpen, Heart } from "lucide-react";
import { GUIDE_URL, INVITE_SUPPORT_SERVER_URL } from "~/utility/constants";

export function caelusLinks(t: TFunction) {
	return [
		{
			to: GUIDE_URL,
			label: "Guide",
			description: "Learn how to use Caelus.",
			icon: <BookOpen className="h-5 w-5 text-green-600" />,
			external: true,
		},
		{
			to: INVITE_SUPPORT_SERVER_URL,
			label: t("support-server", { ns: "general" }),
			description: "Get help, report bugs, or just hang out.",
			icon: <SiDiscord className="h-5 w-5 text-discord-button" />,
			external: true,
		},
		{
			to: "https://guide.thatskyapplication.com/translating",
			label: "Translations",
			description: "Help translate Caelus into your language.",
			icon: <SiCrowdin className="h-5 w-5 text-[#263238] dark:text-white" />,
			external: true,
		},
		{
			to: "/acknowledgements",
			label: "Acknowledgements",
			description: "The people that make Caelus possible.",
			icon: <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />,
			external: false,
		},
	] as const;
}
