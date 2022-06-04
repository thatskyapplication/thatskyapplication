import process from "node:process";
import { EmbedBuilder, Events, Formatters } from "discord.js";
import fetch from "node-fetch";
import type { Event } from "./index.js";
import Caelus from "../Client/Client.js";
import { repository, startupMessage } from "../Utility/Constants.js";

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

export const event: Event<typeof name> = {
  name,
  once: true,
  async fire(): Promise<void> {
    if (!branch || !commitHash || !githubToken) return Caelus.log(startupMessage);

    const json = await fetch(`https://api.github.com/repos/${repository}/commits/${commitHash}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${githubToken}`
      }
    }).then(response => response.json()) as GitHubCommit | GitHubError;

    if ("message" in json) return Caelus.log(startupMessage);
    const embed = new EmbedBuilder();
    embed.setAuthor({ iconURL: json.author.avatar_url, name: json.author.login, url: json.author.html_url });
    embed.setDescription(`Running [\`${commitHash.slice(0, 7)}\`](${json.html_url}) on [\`${branch}\`](https://github.com/${repository}/tree/${encodeURIComponent(branch)}) at ${Formatters.time(Math.floor(Date.now() / 1000), Formatters.TimestampStyles.ShortDateTime)}.\n${json.commit.message}`);
    embed.setTimestamp();
    await Caelus.log({ embeds: [embed] });
  }
};
