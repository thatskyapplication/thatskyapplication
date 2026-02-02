import { SiDiscord } from "@icons-pack/react-simple-icons";
import {
	AlarmClock,
	Bot,
	CheckSquare,
	Clock,
	ExternalLinkIcon,
	LinkIcon,
	Users,
	Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { INVITE_APPLICATION_URL, INVITE_SUPPORT_SERVER_URL } from "~/utility/constants";

interface NavigationItem {
	to: string;
	label: string;
	icon: React.ReactNode;
	description: string;
	external?: true;
}

export interface NavigationGroup {
	label: string;
	items: readonly NavigationItem[];
}

export function useNavigationGroups(): readonly NavigationGroup[] {
	const { t } = useTranslation();

	return [
		{
			label: "Features",
			items: [
				{
					to: "/daily-guides",
					label: t("daily-guides.name", { ns: "features" }),
					icon: <Clock className="h-5 w-5" />,
					description: t("daily-guides.description-short", { ns: "features" }),
				},
				{
					to: "/shard-eruption",
					label: t("shard-eruption.name-plural", { ns: "features" }),
					icon: <Zap className="h-5 w-5" />,
					description: t("shard-eruption.description-short", { ns: "features" }),
				},
				{
					to: "/sky-profiles",
					label: t("sky-profile.name-plural", { ns: "features" }),
					icon: <Users className="h-5 w-5" />,
					description: t("sky-profile.description-short", { ns: "features" }),
				},
				{
					to: "/schedule",
					label: t("schedule.name", { ns: "features" }),
					icon: <AlarmClock className="h-5 w-5" />,
					description: t("schedule.description-short", { ns: "features" }),
				},
				{
					to: "/checklist",
					label: t("checklist.title", { ns: "features" }),
					icon: <CheckSquare className="h-5 w-5" />,
					description: t("checklist.description-short", { ns: "features" }),
				},
			],
		},
		{
			label: "Other",
			items: [
				{
					to: "/thatskylink",
					label: "thatskylink",
					icon: <LinkIcon className="h-5 w-5" />,
					description: "Making long links short and memorable.",
				},
			],
		},
		{
			label: "Links",
			items: [
				{
					to: INVITE_SUPPORT_SERVER_URL,
					label: "Support server",
					icon: <SiDiscord className="h-5 w-5" />,
					description: "Join our Discord support server.",
					external: true,
				},
				{
					to: INVITE_APPLICATION_URL,
					label: "Invite Caelus",
					icon: <Bot className="h-5 w-5" />,
					description: "Add Caelus to your Discord server.",
					external: true,
				},
				{
					to: "/caelus/terms-privacy",
					label: "Terms & privacy",
					icon: <ExternalLinkIcon className="h-5 w-5" />,
					description: "Terms of service and privacy policy.",
				},
				{
					to: "/acknowledgements",
					label: "Acknowledgements",
					icon: <ExternalLinkIcon className="h-5 w-5" />,
					description: "Community contributors and credits.",
				},
			],
		},
	] satisfies NavigationGroup[];
}
