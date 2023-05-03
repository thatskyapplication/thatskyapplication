"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { DiscordLink } from "./DiscordLink";
import { DiscordMessage } from "./Message";
import { DiscordMessageEmbed } from "./MessageEmbed";
import { DiscordMessages } from "./Messages";

export function Mdx({ code }: { code: string }) {
	const Component = useMDXComponent(code);
	return <Component components={{ DiscordLink, DiscordMessage, DiscordMessages, DiscordMessageEmbed }} />;
}
