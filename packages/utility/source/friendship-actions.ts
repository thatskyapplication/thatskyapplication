import type { Snowflake } from "./types/index.js";

interface FriendshipAction {
	/**
	 * The id. Filenames should be this.
	 */
	id: number;
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

export const HUGS = [
	{
		id: 1,
		user1: "618976181026422814",
		user2: "826803719323910184",
		square: true,
		reference: "https://discord.com/channels/@me/966748908569112617/1075455587892084836",
	},
	{
		id: 2,
		user1: "618976181026422814",
		user2: "826803719323910184",
		square: true,
		reference: "https://discord.com/channels/@me/966748908569112617/1075468403944464445",
	},
	{
		id: 3,
		user1: "618976181026422814",
		user2: "826803719323910184",
		square: false,
		reference: "https://discord.com/channels/@me/966748908569112617/1075476870952390747",
	},
	{
		id: 4,
		user1: "618976181026422814",
		user2: "588116773392351246",
		square: true,
		reference: null,
	},
	{
		id: 5,
		user1: "618976181026422814",
		user2: "588116773392351246",
		square: false,
		reference: null,
	},
	{
		id: 6,
		user1: "618976181026422814",
		user2: null,
		square: false,
		reference: null,
	},
	{
		id: 7,
		user1: null,
		user2: null,
		square: false,
		reference: null,
	},
	{
		id: 8,
		user1: null,
		user2: null,
		square: false,
		reference: null,
	},
	{
		id: 9,
		user1: "319884785050714112",
		user2: "588116773392351246",
		square: false,
		reference: null,
	},
	{
		id: 10,
		user1: "618976181026422814",
		user2: "319884785050714112",
		square: false,
		reference: "https://discord.com/channels/@me/996478536674201622/1076275606293065889",
	},
	{
		id: 11,
		user1: "618976181026422814",
		user2: "323864336793862144",
		square: false,
		reference: "https://discord.com/channels/@me/981986807354896394/1076568094857760939",
	},
	{
		id: 12,
		user1: "618976181026422814",
		user2: "618976181026422814",
		square: false,
		reference: "https://discord.com/channels/@me/966748908569112617/1077651301107773450",
	},
	{
		id: 13,
		user1: "319884785050714112",
		user2: "588116773392351246",
		square: false,
		reference: null,
	},
	{
		id: 14,
		user1: "618976181026422814",
		user2: "685979313689985095",
		square: false,
		reference: "https://discord.com/channels/@me/1065544020417323079/1080580366089326722",
	},
	{
		id: 15,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: false,
		reference: "https://discord.com/channels/@me/978871599669313536/1089306088245043242",
	},
	{
		id: 16,
		user1: "618976181026422814",
		user2: "976366720916799538",
		square: true,
		reference: null,
	},
	{
		id: 17,
		user1: "618976181026422814",
		user2: "976366720916799538",
		square: true,
		reference: null,
	},
	{
		id: 18,
		user1: "618976181026422814",
		user2: "820687453290496034",
		square: true,
		reference: null,
	},
	{
		id: 19,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		id: 20,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		id: 21,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1133604012525109339",
	},
	{
		id: 22,
		user1: "618976181026422814",
		user2: "881146771412250625",
		square: true,
		reference: "https://discord.com/channels/@me/1169413845710815342/1169426206261788774",
	},
	{
		id: 23,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1169468680443281428",
	},
	{
		id: 24,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1169476505433276507",
	},
	{
		id: 25,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		id: 26,
		user1: "678313351641563214",
		user2: "676086722475458611",
		square: true,
		reference: null,
	},
	{
		id: 27,
		user1: "618976181026422814",
		user2: "319884785050714112",
		square: true,
		reference: "https://discord.com/channels/@me/996478536674201622/1236226811319549982",
	},
	{
		id: 28,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		id: 29,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: null,
	},
	{
		id: 30,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1313687995592736870",
	},
	{
		id: 31,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1313687995592736870",
	},
	{
		id: 32,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1313687995592736870",
	},
	{
		id: 33,
		user1: "618976181026422814",
		user2: "628363361637236767",
		square: true,
		reference: "https://discord.com/channels/@me/978871599669313536/1313687995592736870",
	},
	{
		id: 34,
		user1: "1088471588606853212",
		user2: null,
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1315148576166514758",
	},
	{
		id: 35,
		user1: "1088471588606853212",
		user2: null,
		square: true,
		reference: "https://discord.com/channels/@me/1301966613045841981/1317491732362956890",
	},
	{
		id: 36,
		user1: "618976181026422814",
		user2: "323864336793862144",
		square: true,
		reference: null,
	},
	{
		id: 37,
		user1: "824821969517674536",
		user2: null,
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1357521020067512390",
	},
	{
		id: 38,
		user1: "1080830389628710952",
		user2: "1073784513014018078",
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1357521020067512390",
	},
	{
		id: 39,
		user1: "1080830389628710952",
		user2: "1073784513014018078",
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1357521020067512390",
	},
	{
		id: 40,
		user1: "1080830389628710952",
		user2: "1073784513014018078",
		square: true,
		reference:
			"https://discord.com/channels/1017993798170726411/1092894736857174026/1357521020067512390",
	},
	{
		id: 41,
		user1: "678313351641563214",
		user2: null,
		square: true,
		reference: "https://discord.com/channels/@me/1229370707830378496/1359911288821518376",
	},
] as const satisfies Readonly<FriendshipAction[]>;

export const HAIR_TOUSLES = [
	{
		id: 1,
		user1: "618976181026422814",
		user2: "323864336793862144",
		square: true,
		reference: "https://discord.com/channels/@me/981986807354896394/1332476262308122669",
	},
	{
		id: 2,
		user1: "618976181026422814",
		user2: "323864336793862144",
		square: true,
		reference: "https://discord.com/channels/@me/981986807354896394/1332475548240445521",
	},
	{
		id: 3,
		user1: "618976181026422814",
		user2: "820687453290496034",
		square: true,
		reference: "https://discord.com/channels/@me/1118611467164467250/1332764981829173279",
	},
] as const satisfies Readonly<FriendshipAction[]>;
