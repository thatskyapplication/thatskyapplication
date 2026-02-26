import { CDN_URL } from "./routes.js";
import type { ChannelLink, MessageLink, Snowflake } from "./types/index.js";

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

type PlayFightsRoute = `${typeof CDN_URL}/play_fights/${number}.gif`;

function playFightsRoute(id: number): PlayFightsRoute {
	return `${CDN_URL}/play_fights/${id}.gif`;
}

interface FriendshipAction {
	/**
	 * The URL to the asset.
	 */
	url: HighFivesRoute | HugsRoute | HairTouslesRoute | PlayFightsRoute;
	/**
	 * A user involved.
	 */
	user1: Snowflake | null;
	/**
	 * A user involved.
	 */
	user2: Snowflake | null;
	/**
	 * Whether the asset is 1:1.
	 */
	square: boolean;
	/**
	 * A channel link or a message link that references the context of the friendship action.
	 *
	 * @remarks A channel link should be used if the context was from a private thread in the friendship actions channel.
	 */
	reference: ChannelLink | MessageLink;
}

interface Krill {
	/**
	 * The URL to the asset.
	 */
	url: KrillRoute;
	/**
	 * Users involved.
	 */
	users: Snowflake[] | null;
	/**
	 * Whether the asset is 1:1.
	 */
	square: boolean;
	/**
	 * A message link that references the context of the hug.
	 */
	reference: MessageLink;
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
		user2: "1151275117683408998",
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1357521020067512390",
	},
	{
		url: highFivesRoute(10),
		user1: "588116773392351246",
		user2: "319884785050714112",
		square: true,
		reference: null,
	},
	{
		url: highFivesRoute(11),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/1017993798170726411/1416913514676617327",
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
		user1: "713002852909449236",
		user2: "713002852909449236",
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
		user2: "1332602559533154415",
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1315148576166514758",
	},
	{
		url: hugsRoute(35),
		user1: "1088471588606853212",
		user2: "1332602559533154415",
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
	{
		url: hugsRoute(42),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/1017993798170726411/1416913514676617327",
	},
	{
		url: hugsRoute(43),
		user1: "688325155214196802",
		user2: "968297785529077810",
		square: true,
		reference: "https://discord.com/channels/1017993798170726411/1421860448340541583",
	},
	{
		url: hugsRoute(44),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/1017993798170726411/1435431647330963559",
	},
	{
		url: hugsRoute(45),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/1017993798170726411/1476612623381303419",
	},
] as const satisfies Readonly<FriendshipAction[]>;

export const HUGS_SQUARE = HUGS.filter(({ square }) => square);

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
	{
		url: hairTouslesRoute(4),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/1017993798170726411/1416913514676617327",
	},
	{
		url: hairTouslesRoute(5),
		user1: "618976181026422814",
		user2: "274238153525821450",
		square: true,
		reference: "https://discord.com/channels/1017993798170726411/1476186299810578482",
	},
] as const satisfies Readonly<FriendshipAction[]>;

export const PLAY_FIGHTS = [
	{
		url: playFightsRoute(1),
		user1: "618976181026422814",
		user2: "323864336793862144",
		square: true,
		reference: null,
	},
	{
		url: playFightsRoute(2),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		url: playFightsRoute(3),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		url: playFightsRoute(4),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		url: playFightsRoute(5),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		url: playFightsRoute(6),
		user1: "618976181026422814",
		user2: "323864336793862144",
		square: true,
		reference: "https://discord.com/channels/@me/981986807354896394/1328649378558251060",
	},
	{
		url: playFightsRoute(7),
		user1: "618976181026422814",
		user2: "487590025127526400",
		square: true,
		reference: null,
	},
	{
		url: playFightsRoute(8),
		user1: "1080830389628710952",
		user2: "1073784513014018078",
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1357521020067512390",
	},
	{
		url: playFightsRoute(9),
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/1017993798170726411/1416913514676617327",
	},
] as const satisfies Readonly<FriendshipAction[]>;

type KrillRoute = `${typeof CDN_URL}/krills/${number}.gif`;

function krillsRoute(id: number): KrillRoute {
	return `${CDN_URL}/krills/${id}.gif`;
}

export const KRILLS = [
	{
		url: krillsRoute(1),
		users: ["713002852909449236"],
		square: true,
		reference: "https://discord.com/channels/@me/1167786068163174410/1201094884363350057",
	},
	{
		url: krillsRoute(2),
		users: ["713002852909449236"],
		square: true,
		reference: "https://discord.com/channels/@me/1167786068163174410/1201094884363350057",
	},
	{
		url: krillsRoute(3),
		users: ["713002852909449236"],
		square: true,
		reference: "https://discord.com/channels/@me/1167786068163174410/1201094884363350057",
	},
	{
		url: krillsRoute(4),
		users: ["713002852909449236"],
		square: true,
		reference: "https://discord.com/channels/@me/1167786068163174410/1201094884363350057",
	},
	{
		url: krillsRoute(5),
		users: ["713002852909449236"],
		square: true,
		reference: "https://discord.com/channels/@me/1167786068163174410/1201094884363350057",
	},
	{
		url: krillsRoute(6),
		users: ["713002852909449236"],
		square: true,
		reference: "https://discord.com/channels/@me/1167786068163174410/1201094884363350057",
	},
	{
		url: krillsRoute(7),
		users: ["618976181026422814"],
		square: true,
		reference: null,
	},
	{
		url: krillsRoute(8),
		users: ["713002852909449236"],
		square: true,
		reference: "https://discord.com/channels/@me/1167786068163174410/1201190585466363944",
	},
	{
		url: krillsRoute(9),
		users: ["618976181026422814", "628363361637236767"],
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1202441218202800189",
	},
	{
		url: krillsRoute(10),
		users: ["618976181026422814", "628363361637236767"],
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1202451995118805023",
	},
	{
		url: krillsRoute(11),
		users: ["618976181026422814"],
		square: true,
		reference: null,
	},
] as const satisfies Readonly<Krill[]>;

const friendshipActionContributors = new Set<Snowflake>();

for (const type of [HIGH_FIVES, HUGS, HAIR_TOUSLES, PLAY_FIGHTS, KRILLS]) {
	for (const action of type) {
		if ("users" in action) {
			for (const user of action.users) {
				friendshipActionContributors.add(user);
			}
		} else {
			if (action.user1) {
				friendshipActionContributors.add(action.user1);
			}

			if (action.user2) {
				friendshipActionContributors.add(action.user2);
			}
		}
	}
}

export const FRIENDSHIP_ACTIONS_CONTRIBUTORS =
	friendshipActionContributors as ReadonlySet<Snowflake>;

export const FRIENDSHIP_ACTIONS_CONTRIBUTORS_ARRAY = [...FRIENDSHIP_ACTIONS_CONTRIBUTORS] as const;
