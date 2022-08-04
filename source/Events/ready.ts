import process from "node:process";
import { Client, EmbedBuilder, Events, time, TimestampStyles } from "discord.js";
import fetch from "node-fetch";
import type { Event } from "./index.js";
import Notification from "../Structures/Notification.js";
import Profile from "../Structures/Profile.js";
import Rotations from "../Structures/Rotations.js";
import { REPOSITORY, STARTUP_MESSAGE } from "../Utility/Constants.js";
import { consoleLog } from "../Utility/Utility.js";

interface Commit {
  message: string;
}

interface GitHubAuthor {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface GitHubCommit {
  sha: string;
  commit: Commit;
  html_url: string;
  author: GitHubAuthor;
}

interface GitHubError {
  message: string;
  documentation_url: string;
}

const name = Events.ClientReady;
const branch = process.env.BRANCH;
const commitHash = process.env.COMMIT_HASH;
const githubToken = process.env.GITHUB_TOKEN;

async function collectFromDatabase(client: Client<true>): Promise<void> {
  try {
    await client.Maria.getConnection();
    await collectNotifications(client);
    await collectProfiles(client);
  } catch (error) {
    consoleLog(error);
    process.exit(1);
  }
}

async function collectNotifications(client: Client<true>): Promise<void> {
  for (const notificationPacket of await client.Maria.query("SELECT * FROM `Notifications`;")) {
    const notification = new Notification(client, notificationPacket);
    Notification.cache.set(notification.No, notification);
  }

  Rotations.clock();
}

async function collectProfiles(client: Client<true>): Promise<void> {
  for (const profilePacket of await client.Maria.query("SELECT * FROM `Profiles`;")) {
    const profile = new Profile(client, profilePacket);
    Profile.cache.set(profile.No, profile);
  }
}

export const event: Event<typeof name> = {
  name,
  once: true,
  async fire(client) {
    await collectFromDatabase(client);
    if (!branch || !commitHash || !githubToken) return client.log(STARTUP_MESSAGE);

    const json = await fetch(`https://api.github.com/repos/${REPOSITORY}/commits/${commitHash}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${githubToken}`
      }
    }).then(response => response.json()) as GitHubCommit | GitHubError;

    if ("message" in json) return client.log(STARTUP_MESSAGE);
    const embed = new EmbedBuilder();
    embed.setAuthor({ iconURL: json.author.avatar_url, name: json.author.login, url: json.author.html_url });
    embed.setDescription(`Running [\`${commitHash.slice(0, 7)}\`](${json.html_url}) on [\`${branch}\`](https://github.com/${REPOSITORY}/tree/${encodeURIComponent(branch)}) at ${time(Math.floor(Date.now() / 1000), TimestampStyles.ShortDateTime)}.\n${json.commit.message}`);
    embed.setTimestamp();
    await client.applyCommands();
    await client.log({ embeds: [embed] });
  }
};
