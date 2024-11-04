import process from "node:process";
import { Client, GatewayIntentBits, Options, Partials } from "discord.js";
import "./i18next.js"; // Must be first.
import events, { type Event } from "./events/index.js";
import pino from "./pino.js";
import { APPLICATION_ID, TOKEN } from "./utility/constants.js";

if (!TOKEN) {
	pino.fatal("Missing Discord token.");
	process.exit(1);
}

const client = new Client({
	intents:
		GatewayIntentBits.Guilds |
		GatewayIntentBits.GuildMembers |
		GatewayIntentBits.GuildMessages |
		GatewayIntentBits.MessageContent,
	makeCache: Options.cacheWithLimits({
		ApplicationCommandManager: 0,
		AutoModerationRuleManager: 0,
		BaseGuildEmojiManager: 0,
		GuildBanManager: 0,
		GuildEmojiManager: 0,
		GuildInviteManager: 0,
		GuildMemberManager: {
			keepOverLimit: (member) => member.user.id === APPLICATION_ID,
			maxSize: 50,
		},
		GuildScheduledEventManager: 0,
		GuildStickerManager: 0,
		MessageManager: 15,
		PresenceManager: 0,
		ReactionManager: 0,
		ReactionUserManager: 0,
		StageInstanceManager: 0,
		ThreadManager: 0,
		ThreadMemberManager: {
			keepOverLimit: (user) => user.id === APPLICATION_ID,
			maxSize: 5,
		},
		UserManager: {
			keepOverLimit: (user) => user.id === APPLICATION_ID,
			maxSize: 50,
		},
		VoiceStateManager: 0,
	}),
	partials: [Partials.GuildMember],
});

for (const event of events) {
	const { name, once, fire }: Event = event;
	client[once ? "once" : "on"](name, fire);
}

void client.login(TOKEN);
