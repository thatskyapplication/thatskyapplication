// import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import { IoIosLink /* IoIosPaper */ } from "react-icons/io";
import { SiDiscord } from "react-icons/si";
import { DiscordLink } from "~/components/DiscordLink";
import { DiscordMessage } from "~/components/Message";
import { DiscordMessages } from "~/components/Messages";
import { caelus } from "~/structures/SkyKid";
import { INVITE_APPLICATION_URL, INVITE_SUPPORT_SERVER_URL, THAT_SKY_GAME_URL } from "~/util/constants";

export default function Page() {
	return (
		<div className="mx-auto flex min-h-screen max-w-6xl flex-col place-items-center gap-12 px-8 py-16 lg:place-content-center lg:px-8 lg:py-0">
			<div className="flex flex-col place-items-center gap-10 lg:flex-row lg:gap-6">
				<div className="flex max-w-lg flex-col gap-3 lg:mr-8">
					<h1 className="text-3xl font-black leading-tight sm:text-5xl sm:leading-tight">{caelus.name}</h1>
					<div>
						<DiscordMessages rounded>
							<DiscordMessage author={{ username: caelus.name, avatar: caelus.avatarIcon, bot: true }}>
								I'm Discord bot made especially for{" "}
								<DiscordLink href={THAT_SKY_GAME_URL} title="Sky: Children of the Light" />, the game we all know and
								love!
								<br />
								<br />
								Check out the buttons below to see how I can help you on your journey.
							</DiscordMessage>
						</DiscordMessages>
					</div>
					<div className="flex flex-row flex-wrap gap-4">
						{/* <Link
							className="bg-white dark:bg-caelus-100 hover:bg-lightblue-100 focus:ring focus:ring-width-2 flex h-11 transform-gpu cursor-pointer select-none appearance-none flex-row place-items-center gap-2 rounded px-4 text-base font-semibold leading-none text-black no-underline outline-none focus:ring-caelus dark:focus:ring-white active:translate-y-px"
							href="./features/home/introduction"
						>
							<IoIosPaper size={20} />
							Features
						</Link> */}
						<a
							className="bg-white dark:bg-caelus-100 hover:bg-lightblue-100 focus:ring focus:ring-width-2 flex h-11 transform-gpu cursor-pointer select-none appearance-none flex-row place-items-center gap-2 rounded px-4 text-base font-semibold leading-none text-black no-underline outline-none focus:ring-caelus dark:focus:ring-white active:translate-y-px"
							href={INVITE_APPLICATION_URL}
							rel="external noopener noreferrer"
							target="_blank"
						>
							<IoIosLink size={20} />
							Invite <BiLinkExternal />
						</a>
						<a
							className="bg-white dark:bg-caelus-100 hover:bg-lightblue-100 focus:ring focus:ring-width-2 flex h-11 transform-gpu cursor-pointer select-none appearance-none flex-row place-items-center gap-2 rounded px-4 text-base font-semibold leading-none text-black no-underline outline-none focus:ring-caelus dark:focus:ring-white active:translate-y-px"
							href={INVITE_SUPPORT_SERVER_URL}
							rel="external noopener noreferrer"
							target="_blank"
						>
							<SiDiscord size={20} />
							Support <BiLinkExternal />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
