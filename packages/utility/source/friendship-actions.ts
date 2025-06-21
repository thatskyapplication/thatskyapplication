import { CDN_URL } from "./cdn.js";
import type { Snowflake } from "./types/index.js";

type HighFivesRoute = `${typeof CDN_URL}/high_fives/${number}.gif`;

function highFivesRoute(id: number): HighFivesRoute {
	return `${CDN_URL}/high_fives/${id}.gif`;
}

type HugsRoute = `${typeof CDN_URL}/hugs/${number}.gif`;

function hugsRoute(id: number): HugsRoute {
	return `${CDN_URL}/hugs/${id}.gif`;
}

type HairTouslesRoute = `${typeof CDN_URL}/hair_tousles/${number}.gif`;

function hairTouslesRoute(id: number): HairTouslesRoute {
	return `${CDN_URL}/hair_tousles/${id}.gif`;
}

interface FriendshipAction {
	/**
	 * The URL to the asset.
	 */
	url: HighFivesRoute | HugsRoute | HairTouslesRoute;
	/**
	 * A user involved.
	 */
	user1: Snowflake | null;
	/**
	 * A user involved.
	 */
	user2: Snowflake | null;
	/**
	 * Whether the hug is 1:1.
	 */
	square: boolean;
	/**
	 * A message link that references the context of the hug.
	 */
	reference: `https://discord.com/channels/${"@me" | Snowflake}/${Snowflake}/${Snowflake}` | null;
}

export const HIGH_FIVES = [
	{
		url: highFivesRoute(1),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1203386825532768308",
	},
	{
		url: highFivesRoute(2),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		url: highFivesRoute(3),
		user1: "618976181026422814",
		user2: "820687453290496034",
		square: true,
		reference: null,
	},
	{
		url: highFivesRoute(4),
		user1: "618976181026422814",
		user2: "820687453290496034",
		square: true,
		reference: null,
	},
	{
		url: highFivesRoute(5),
		user1: "618976181026422814",
		user2: "820687453290496034",
		square: true,
		reference: null,
	},
	{
		url: highFivesRoute(6),
		user1: "618976181026422814",
		user2: "820687453290496034",
		square: true,
		reference: null,
	},
	{
		url: highFivesRoute(7),
		user1: "678313351641563214",
		user2: "840297266311987201",
		square: true,
		reference: null,
	},
	{
		url: highFivesRoute(8),
		user1: "678313351641563214",
		user2: "840297266311987201",
		square: true,
		reference: "https://discord.com/channels/@me/981986807354896394/1328649378558251060",
	},
	{
		url: highFivesRoute(9),
		user1: "824821969517674536",
		user2: null,
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1357521020067512390",
	},
] as const satisfies Readonly<FriendshipAction[]>;

export const HUGS = [
	{
		url: hugsRoute(1),
		user1: "618976181026422814",
		user2: "826803719323910184",
		square: true,
		reference: "https://discord.com/channels/@me/966748908569112617/1075455587892084836",
	},
	{
		url: hugsRoute(2),
		user1: "618976181026422814",
		user2: "826803719323910184",
		square: true,
		reference: "https://discord.com/channels/@me/966748908569112617/1075468403944464445",
	},
	{
		url: hugsRoute(3),
		user1: "618976181026422814",
		user2: "826803719323910184",
		square: false,
		reference: "https://discord.com/channels/@me/966748908569112617/1075476870952390747",
	},
	{
		url: hugsRoute(4),
		user1: "618976181026422814",
		user2: "588116773392351246",
		square: true,
		reference: null,
	},
	{
		url: hugsRoute(5),
		user1: "618976181026422814",
		user2: "588116773392351246",
		square: false,
		reference: null,
	},
	{
		url: hugsRoute(6),
		user1: "618976181026422814",
		user2: null,
		square: false,
		reference: null,
	},
	{
		url: hugsRoute(7),
		user1: null,
		user2: null,
		square: false,
		reference: null,
	},
	{
		url: hugsRoute(8),
		user1: null,
		user2: null,
		square: false,
		reference: null,
	},
	{
		url: hugsRoute(9),
		user1: "319884785050714112",
		user2: "588116773392351246",
		square: false,
		reference: null,
	},
	{
		url: hugsRoute(10),
		user1: "618976181026422814",
		user2: "319884785050714112",
		square: false,
		reference: "https://discord.com/channels/@me/996478536674201622/1076275606293065889",
	},
	{
		url: hugsRoute(11),
		user1: "618976181026422814",
		user2: "323864336793862144",
		square: false,
		reference: "https://discord.com/channels/@me/981986807354896394/1076568094857760939",
	},
	{
		url: hugsRoute(12),
		user1: "618976181026422814",
		user2: "618976181026422814",
		square: false,
		reference: "https://discord.com/channels/@me/966748908569112617/1077651301107773450",
	},
	{
		url: hugsRoute(13),
		user1: "319884785050714112",
		user2: "588116773392351246",
		square: false,
		reference: null,
	},
	{
		url: hugsRoute(14),
		user1: "618976181026422814",
		user2: "685979313689985095",
		square: false,
		reference: "https://discord.com/channels/@me/1065544020417323079/1080580366089326722",
	},
	{
		url: hugsRoute(15),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: false,
		reference: "https://discord.com/channels/@me/978871599669313536/1089306088245043242",
	},
	{
		url: hugsRoute(16),
		user1: "618976181026422814",
		user2: "976366720916799538",
		square: true,
		reference: null,
	},
	{
		url: hugsRoute(17),
		user1: "618976181026422814",
		user2: "976366720916799538",
		square: true,
		reference: null,
	},
	{
		url: hugsRoute(18),
		user1: "618976181026422814",
		user2: "820687453290496034",
		square: true,
		reference: null,
	},
	{
		url: hugsRoute(19),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		url: hugsRoute(20),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		url: hugsRoute(21),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1133604012525109339",
	},
	{
		url: hugsRoute(22),
		user1: "618976181026422814",
		user2: "881146771412250625",
		square: true,
		reference: "https://discord.com/channels/@me/1169413845710815342/1169426206261788774",
	},
	{
		url: hugsRoute(23),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1169468680443281428",
	},
	{
		url: hugsRoute(24),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1169476505433276507",
	},
	{
		url: hugsRoute(25),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		url: hugsRoute(26),
		user1: "678313351641563214",
		user2: "676086722475458611",
		square: true,
		reference: null,
	},
	{
		url: hugsRoute(27),
		user1: "618976181026422814",
		user2: "319884785050714112",
		square: true,
		reference: "https://discord.com/channels/@me/996478536674201622/1236226811319549982",
	},
	{
		url: hugsRoute(28),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		url: hugsRoute(29),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		url: hugsRoute(30),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1313687995592736870",
	},
	{
		url: hugsRoute(31),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1313687995592736870",
	},
	{
		url: hugsRoute(32),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1313687995592736870",
	},
	{
		url: hugsRoute(33),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1313687995592736870",
	},
	{
		url: hugsRoute(34),
		user1: "1088471588606853212",
		user2: null,
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1315148576166514758",
	},
	{
		url: hugsRoute(35),
		user1: "1088471588606853212",
		user2: null,
		square: true,
		reference: "https://discord.com/channels/@me/1301966613045841981/1317491732362956890",
	},
	{
		url: hugsRoute(36),
		user1: "618976181026422814",
		user2: "323864336793862144",
		square: true,
		reference: null,
	},
	{
		url: hugsRoute(37),
		user1: "824821969517674536",
		user2: null,
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1357521020067512390",
	},
	{
		url: hugsRoute(38),
		user1: "1080830389628710952",
		user2: "1073784513014018078",
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1357521020067512390",
	},
	{
		url: hugsRoute(39),
		user1: "1080830389628710952",
		user2: "1073784513014018078",
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1357521020067512390",
	},
	{
		url: hugsRoute(40),
		user1: "1080830389628710952",
		user2: "1073784513014018078",
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1357521020067512390",
	},
	{
		url: hugsRoute(41),
		user1: "678313351641563214",
		user2: null,
		square: true,
		reference: "https://discord.com/channels/@me/1229370707830378496/1359911288821518376",
	},
] as const satisfies Readonly<FriendshipAction[]>;

export const HAIR_TOUSLES = [
	{
		url: hairTouslesRoute(1),
		user1: "618976181026422814",
		user2: "323864336793862144",
		square: true,
		reference: "https://discord.com/channels/@me/981986807354896394/1332476262308122669",
	},
	{
		url: hairTouslesRoute(2),
		user1: "618976181026422814",
		user2: "323864336793862144",
		square: true,
		reference: "https://discord.com/channels/@me/981986807354896394/1332475548240445521",
	},
	{
		url: hairTouslesRoute(3),
		user1: "618976181026422814",
		user2: "820687453290496034",
		square: true,
		reference: "https://discord.com/channels/@me/1118611467164467250/1332764981829173279",
	},
] as const satisfies Readonly<FriendshipAction[]>;
