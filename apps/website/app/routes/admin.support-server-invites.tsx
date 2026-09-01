import {
	ChannelType,
	type RESTGetAPIGuildInvitesResult,
	type Snowflake,
} from "@discordjs/core/http-only";
import { DiscordAPIError } from "@discordjs/rest";
import { clsx } from "clsx";
import { ArrowLeft, Check, Plus, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { data, Form, Link } from "react-router";
import type { Packet } from "@thatskyapplication/utility";
import { ActionButton } from "~/components/ActionButton.js";
import { SitePage } from "~/components/PageLayout";
import Select from "~/components/Select";
import {
	type ExpiredInvite,
	ExpiredInviteCard,
} from "~/components/support-server-invites/ExpiredInviteCard.js";
import {
	InviteTable,
	type SupportServerInvite,
} from "~/components/support-server-invites/InviteTable.js";
import { SUPPORT_SERVER_GUILD_ID } from "~/config.server.js";
import database from "~/database.server.js";
import discord from "~/discord.js";
import { useIsSaving } from "~/hooks/use-is-saving.js";
import pino from "~/pino.js";
import { requireAdminAccess } from "~/utility/functions.server.js";
import { PASSWORD_MANAGER_IGNORE_ATTRIBUTES } from "~/utility/password-manager.js";
import {
	characterCountClass,
	FIELD_ERROR_CLASS,
	FIELD_FOOTER_CLASS,
	textFieldClass,
	WARNING_BANNER_CLASS,
} from "~/utility/styles.js";
import { dateTimeFormatter } from "~/utility/time.js";
import { getTimePreferences } from "~/utility/time.server.js";
import type { Route } from "./+types/admin.support-server-invites.js";

const MAXIMUM_INVITE_NAME_LENGTH = 100 as const;

const INVITE_CHANNEL_TYPES = new Set<ChannelType>([
	ChannelType.GuildText,
	ChannelType.GuildVoice,
	ChannelType.GuildAnnouncement,
	ChannelType.GuildStageVoice,
	ChannelType.GuildForum,
	ChannelType.GuildMedia,
]);

const MAXIMUM_AGE_OPTIONS = [
	{ label: "Never", value: "0" },
	{ label: "30 minutes", value: "1800" },
	{ label: "1 hour", value: "3600" },
	{ label: "6 hours", value: "21600" },
	{ label: "12 hours", value: "43200" },
	{ label: "1 day", value: "86400" },
	{ label: "7 days", value: "604800" },
] as const;

const MAXIMUM_USES_OPTIONS = [
	{ label: "Unlimited", value: "0" },
	{ label: "1 use", value: "1" },
	{ label: "5 uses", value: "5" },
	{ label: "10 uses", value: "10" },
	{ label: "25 uses", value: "25" },
	{ label: "50 uses", value: "50" },
	{ label: "100 uses", value: "100" },
] as const;

interface CreateInviteErrors {
	channel?: string;
	form?: string;
	maximumAge?: string;
	maximumUses?: string;
	name?: string;
}

async function isInviteChannel(channelId: Snowflake) {
	const channels = await discord.guilds.getChannels(SUPPORT_SERVER_GUILD_ID);

	return channels.some(
		(channel) => channel.id === channelId && INVITE_CHANNEL_TYPES.has(channel.type),
	);
}

async function getSupportServerInvites() {
	try {
		return await discord.guilds.getInvites(SUPPORT_SERVER_GUILD_ID);
	} catch (error) {
		if (error instanceof DiscordAPIError && error.status === 403) {
			return null;
		}

		throw error;
	}
}

async function preserveHistory(
	invites: RESTGetAPIGuildInvitesResult,
	livePackets: Packet<"support_server_invites">[],
	liveCodes: ReadonlySet<string>,
) {
	const stale = invites.filter((invite) => {
		const packet = livePackets.find(({ code }) => code === invite.code);
		return packet !== undefined && packet.uses !== invite.uses;
	});

	const newlyExpired = livePackets
		.filter((packet) => !liveCodes.has(packet.code))
		.map((packet) => packet.code);

	if (stale.length === 0 && newlyExpired.length === 0) {
		return;
	}

	try {
		await database.transaction().execute(async (transaction) => {
			for (const invite of stale) {
				await transaction
					.updateTable("support_server_invites")
					.set({ uses: invite.uses })
					.where("code", "=", invite.code)
					.where("expired_at", "is", null)
					.execute();
			}

			if (newlyExpired.length > 0) {
				await transaction
					.updateTable("support_server_invites")
					.set({ expired_at: new Date() })
					.where("code", "in", newlyExpired)
					.where("expired_at", "is", null)
					.execute();
			}
		});
	} catch (error) {
		pino.error(error, "Failed to preserve support server invite history.");
	}
}

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	await requireAdminAccess({ context, request, url });
	const { locale, timeZone, timeZoneEstimated, hour12 } = getTimePreferences(request, context);

	const [invites, channels, namePackets] = await Promise.all([
		getSupportServerInvites(),
		discord.guilds.getChannels(SUPPORT_SERVER_GUILD_ID),
		database.selectFrom("support_server_invites").selectAll().orderBy("id", "asc").execute(),
	]);

	const channelOptions = channels
		.filter((channel) => INVITE_CHANNEL_TYPES.has(channel.type))
		.map((channel) => ({ label: `#${channel.name}`, value: channel.id }))
		.sort((first, second) => first.label.localeCompare(second.label));

	const livePackets = namePackets.filter((packet) => packet.expired_at === null);
	const packets = new Map(livePackets.map((packet) => [packet.code, packet]));
	const dateTimeFormat = dateTimeFormatter({ locale, timeZone, hour12 });

	const trackedOrder = new Map(livePackets.map((packet, index) => [packet.code, index]));

	const sortedInvites = (invites ?? []).sort((first, second) => {
		const firstOrder = trackedOrder.get(first.code);
		const secondOrder = trackedOrder.get(second.code);

		if (firstOrder !== undefined && secondOrder !== undefined) {
			return firstOrder - secondOrder;
		}

		if (firstOrder !== undefined || secondOrder !== undefined) {
			return firstOrder === undefined ? 1 : -1;
		}

		return Date.parse(first.created_at) - Date.parse(second.created_at);
	});

	const liveCodes = new Set(sortedInvites.map((invite) => invite.code));

	if (invites) {
		await preserveHistory(sortedInvites, livePackets, liveCodes);
	}

	const mappedInvites: SupportServerInvite[] = sortedInvites.map((invite) => ({
		channelName: invite.channel?.name ?? null,
		code: invite.code,
		createdLabel: dateTimeFormat.format(Date.parse(invite.created_at)),
		expiresLabel: invite.expires_at ? dateTimeFormat.format(Date.parse(invite.expires_at)) : null,
		maximumUses: invite.max_uses,
		name: packets.get(invite.code)?.name ?? "",
		temporary: invite.temporary,
		uses: invite.uses,
	}));

	const trackedInvites = mappedInvites.filter((invite) => packets.has(invite.code));
	const untrackedInvites = mappedInvites.filter((invite) => !packets.has(invite.code));

	const expiredInvites: ExpiredInvite[] = namePackets.flatMap((packet) =>
		packet.expired_at === null
			? []
			: [
					{
						code: packet.code,
						createdAt: packet.created_at.getTime(),
						createdLabel: dateTimeFormat.format(packet.created_at),
						expiredLabel: dateTimeFormat.format(packet.expired_at),
						name: packet.name,
						uses: packet.uses,
					},
				],
	);

	const mostUsedInviteChannelId =
		sortedInvites.find((invite) => invite.channel !== null)?.channel?.id ?? null;

	return {
		channelOptions,
		defaultChannelId:
			channelOptions.find((option) => option.value === mostUsedInviteChannelId)?.value ??
			channelOptions[0]?.value ??
			"",
		expiredInvites,
		missingPermission: invites === null,
		timeZoneEstimated,
		trackedInvites,
		untrackedInvites,
	};
};

export const action = async ({ context, request, url }: Route.ActionArgs) => {
	const { discordUser } = await requireAdminAccess({ context, request, url });
	const formData = await request.formData();
	const intent = formData.get("intent");

	if (intent === "name") {
		const rawCode = formData.get("code");
		const rawName = formData.get("name");
		const code = typeof rawCode === "string" ? rawCode.trim() : "";
		const name = typeof rawName === "string" ? rawName.trim() : "";

		if (!code) {
			throw new Response("Missing invite code.", { status: 400 });
		}

		if (name.length > MAXIMUM_INVITE_NAME_LENGTH) {
			return data(
				{
					error: `Names must be ${MAXIMUM_INVITE_NAME_LENGTH} characters or fewer.`,
					intent: "name",
					ok: false,
				} as const,
				{ status: 422 },
			);
		}

		if (name) {
			const invites = await getSupportServerInvites();
			const invite = invites?.find((liveInvite) => liveInvite.code === code);

			if (!invite) {
				return data(
					{ error: "That invite no longer exists.", intent: "name", ok: false } as const,
					{ status: 422 },
				);
			}

			await database
				.insertInto("support_server_invites")
				.values({ code, created_at: new Date(invite.created_at), name })
				.onConflict((oc) =>
					oc
						.columns(["code"])
						.where("expired_at", "is", null)
						.doUpdateSet((eb) => ({ name: eb.ref("excluded.name") })),
				)
				.execute();
		} else {
			await database
				.deleteFrom("support_server_invites")
				.where("code", "=", code)
				.where("expired_at", "is", null)
				.execute();
		}

		return data({ intent: "name", ok: true } as const);
	}

	if (intent === "delete") {
		const rawCode = formData.get("code");
		const rawCreatedAt = formData.get("created_at");
		const code = typeof rawCode === "string" ? rawCode.trim() : "";
		const createdAt = typeof rawCreatedAt === "string" ? Number(rawCreatedAt) : Number.NaN;

		if (!code || !Number.isFinite(createdAt)) {
			throw new Response("Missing invite code.", { status: 400 });
		}

		await database
			.deleteFrom("support_server_invites")
			.where("code", "=", code)
			.where("created_at", "=", new Date(createdAt))
			.where("expired_at", "is not", null)
			.execute();

		return data({ intent: "delete", ok: true } as const);
	}

	if (intent !== "create") {
		throw new Response("Unknown intent.", { status: 400 });
	}

	const rawName = formData.get("name");
	const rawChannelId = formData.get("channel");
	const rawMaximumAge = formData.get("max_age");
	const rawMaximumUses = formData.get("max_uses");
	const name = typeof rawName === "string" ? rawName.trim() : "";
	const channelId = typeof rawChannelId === "string" ? rawChannelId : "";
	const maximumAge = typeof rawMaximumAge === "string" ? rawMaximumAge : "";
	const maximumUses = typeof rawMaximumUses === "string" ? rawMaximumUses : "";
	const temporary = formData.get("temporary") === "true";
	const unique = formData.get("unique") === "true";
	const errors: CreateInviteErrors = {};

	if (!name) {
		errors.name = "A name is required.";
	} else if (name.length > MAXIMUM_INVITE_NAME_LENGTH) {
		errors.name = `Names must be ${MAXIMUM_INVITE_NAME_LENGTH} characters or fewer.`;
	}

	if (!channelId) {
		errors.channel = "A channel is required.";
	} else if (!(await isInviteChannel(channelId))) {
		errors.channel = "That channel cannot be invited to.";
	}

	if (!MAXIMUM_AGE_OPTIONS.some((option) => option.value === maximumAge)) {
		errors.maximumAge = "Invalid expiry.";
	}

	if (!MAXIMUM_USES_OPTIONS.some((option) => option.value === maximumUses)) {
		errors.maximumUses = "Invalid maximum uses.";
	}

	if (Object.keys(errors).length > 0) {
		return data({ errors, intent: "create", ok: false } as const, { status: 422 });
	}

	let existingCodes: ReadonlySet<string> | null = null;

	if (!unique) {
		const existingInvites = await getSupportServerInvites();

		if (existingInvites) {
			existingCodes = new Set(existingInvites.map((invite) => invite.code));
		}
	}

	let invite;

	try {
		invite = await discord.channels.createInvite(
			channelId,
			{
				max_age: Number(maximumAge),
				max_uses: Number(maximumUses),
				temporary,
				unique,
			},
			{ reason: `Created by ${discordUser.username} from the dashboard.` },
		);
	} catch (error) {
		if (error instanceof DiscordAPIError) {
			return data({ errors: { form: error.message }, intent: "create", ok: false } as const, {
				status: 422,
			});
		}

		pino.error(error, "Failed to create a support server invite.");

		return data(
			{
				errors: { form: "Discord could not be reached." },
				intent: "create",
				ok: false,
			} as const,
			{ status: 502 },
		);
	}

	const reused = existingCodes?.has(invite.code) ?? false;

	try {
		const result = await database
			.insertInto("support_server_invites")
			.values({ code: invite.code, created_at: new Date(invite.created_at), name })
			.onConflict((oc) => oc.columns(["code"]).where("expired_at", "is", null).doNothing())
			.executeTakeFirst();

		if (result.numInsertedOrUpdatedRows === 0n) {
			const namedPacket = await database
				.selectFrom("support_server_invites")
				.select("name")
				.where("code", "=", invite.code)
				.where("expired_at", "is", null)
				.executeTakeFirst();

			return data(
				{
					errors: {
						form: `${invite.code}, reused ("${namedPacket?.name ?? ""}").`,
					},
					intent: "create",
					ok: false,
				} as const,
				{ status: 409 },
			);
		}
	} catch (error) {
		pino.error(error, "Failed to name a created support server invite.");

		return data(
			{
				errors: {
					form: `Created ${invite.code}, but naming it failed. Name it below.`,
				},
				intent: "create",
				ok: false,
			} as const,
			{ status: 500 },
		);
	}

	return data({ intent: "create", invite: { code: invite.code, name, reused }, ok: true } as const);
};

export default function AdminSupportServerInvites({
	actionData,
	loaderData,
}: Route.ComponentProps) {
	const {
		channelOptions,
		defaultChannelId,
		missingPermission,
		expiredInvites,
		timeZoneEstimated,
		trackedInvites,
		untrackedInvites,
	} = loaderData;

	const isCreating = useIsSaving();
	const expiredHeadingRef = useRef<HTMLHeadingElement>(null);
	const previousExpiredCount = useRef(expiredInvites.length);
	const [nameValue, setNameValue] = useState("");
	const nameLength = nameValue.trim().length;
	const nameOutOfRange = nameLength === 0 || nameLength > MAXIMUM_INVITE_NAME_LENGTH;
	const [channelValue, setChannelValue] = useState(defaultChannelId);
	const [maximumAgeValue, setMaximumAgeValue] = useState<string>(MAXIMUM_AGE_OPTIONS[0].value);
	const [maximumUsesValue, setMaximumUsesValue] = useState<string>(MAXIMUM_USES_OPTIONS[0].value);

	const createResult = actionData?.intent === "create" ? actionData : null;
	const errors: CreateInviteErrors = createResult?.ok === false ? createResult.errors : {};
	const createdCode = createResult?.ok ? createResult.invite.code : null;
	const [lastCreatedCode, setLastCreatedCode] = useState(createdCode);

	useEffect(() => {
		if (expiredInvites.length < previousExpiredCount.current) {
			expiredHeadingRef.current?.focus();
		}

		previousExpiredCount.current = expiredInvites.length;
	}, [expiredInvites.length]);

	if (createdCode !== lastCreatedCode) {
		setLastCreatedCode(createdCode);

		if (createdCode !== null) {
			setNameValue("");
		}
	}

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
				<Link
					className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
					to="/admin"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>Back</span>
				</Link>

				<div>
					<h1 className="mb-1 text-4xl font-bold">Support server invites</h1>
				</div>

				{missingPermission ? (
					<div
						className={clsx(
							WARNING_BANNER_CLASS,
							"flex items-start gap-2 text-sm text-amber-800 dark:text-amber-200",
						)}
					>
						<TriangleAlert className="h-5 w-5 shrink-0" />
						<p className="my-0">Lacking manage server.</p>
					</div>
				) : (
					<>
						<div className="flex flex-col gap-3">
							<h2 className="my-0 text-lg font-medium text-gray-900 dark:text-gray-100">
								Tracked ({trackedInvites.length})
							</h2>

							{trackedInvites.length === 0 ? (
								<p className="my-0 text-sm text-gray-600 dark:text-gray-400">No invites.</p>
							) : (
								<InviteTable invites={trackedInvites} timeZoneEstimated={timeZoneEstimated} />
							)}
						</div>

						{untrackedInvites.length > 0 && (
							<div className="flex flex-col gap-3">
								<h2 className="my-0 text-lg font-medium text-gray-900 dark:text-gray-100">
									Untracked ({untrackedInvites.length})
								</h2>

								<InviteTable invites={untrackedInvites} timeZoneEstimated={timeZoneEstimated} />
							</div>
						)}

						{expiredInvites.length > 0 && (
							<div className="flex flex-col gap-3">
								<h2
									className="my-0 text-lg font-medium text-gray-900 outline-none dark:text-gray-100"
									ref={expiredHeadingRef}
									tabIndex={-1}
								>
									Expired ({expiredInvites.length})
								</h2>
								<ul className="m-0 flex list-none flex-col gap-3 p-0">
									{expiredInvites.map((invite) => (
										<li key={`${invite.code}-${invite.createdAt}`}>
											<ExpiredInviteCard invite={invite} timeZoneEstimated={timeZoneEstimated} />
										</li>
									))}
								</ul>
							</div>
						)}
						<div className="flex flex-col gap-3">
							<h2 className="my-0 text-lg font-medium text-gray-900 dark:text-gray-100">
								Create an invite
							</h2>

							<Form className="flex flex-col gap-4" method="post">
								<input name="intent" type="hidden" value="create" />

								{errors.form ? (
									<div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
										{errors.form}
									</div>
								) : null}

								<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
									<div className="flex flex-col gap-2">
										<label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="name">
											Name
										</label>
										<input
											aria-describedby={errors.name ? "name-error" : undefined}
											aria-invalid={errors.name ? true : undefined}
											className={textFieldClass(Boolean(errors.name), "medium")}
											disabled={isCreating}
											id="name"
											name="name"
											onChange={(event) => setNameValue(event.currentTarget.value)}
											required
											type="text"
											value={nameValue}
											{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
										/>
										<div className={FIELD_FOOTER_CLASS}>
											{errors.name ? (
												<p className={FIELD_ERROR_CLASS} id="name-error">
													{errors.name}
												</p>
											) : (
												<span />
											)}
											<span className={characterCountClass(nameValue.length > 0 && nameOutOfRange)}>
												{nameLength}/{MAXIMUM_INVITE_NAME_LENGTH}
											</span>
										</div>
									</div>

									<div className="flex flex-col gap-2">
										<Select
											disabled={isCreating}
											error={errors.channel}
											label="Channel"
											onChange={(value) => setChannelValue(value)}
											options={channelOptions}
											placeholder="Select a channel"
											surface="page"
											value={channelValue}
										/>
										<input name="channel" type="hidden" value={channelValue} />
									</div>

									<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
										<div className="flex flex-col gap-2">
											<Select
												disabled={isCreating}
												error={errors.maximumAge}
												label="Expire after"
												onChange={(value) => setMaximumAgeValue(value)}
												options={MAXIMUM_AGE_OPTIONS}
												surface="page"
												value={maximumAgeValue}
											/>
											<input name="max_age" type="hidden" value={maximumAgeValue} />
										</div>

										<div className="flex flex-col gap-2">
											<Select
												disabled={isCreating}
												error={errors.maximumUses}
												label="Maximum uses"
												onChange={(value) => setMaximumUsesValue(value)}
												options={MAXIMUM_USES_OPTIONS}
												surface="page"
												value={maximumUsesValue}
											/>
											<input name="max_uses" type="hidden" value={maximumUsesValue} />
										</div>
									</div>

									<div className="flex flex-col gap-2">
										<label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
											<input
												className="h-4 w-4"
												disabled={isCreating}
												name="temporary"
												type="checkbox"
												value="true"
											/>
											<span>Temporary</span>
										</label>
										<label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
											<input
												className="h-4 w-4"
												defaultChecked
												disabled={isCreating}
												name="unique"
												type="checkbox"
												value="true"
											/>
											<span>Unique</span>
										</label>
									</div>
								</div>

								<div className="flex flex-col gap-2.5">
									<ActionButton
										className="sm:w-fit"
										disabled={isCreating || nameOutOfRange || !channelValue}
										type="submit"
										variant="primary"
									>
										<Plus className="h-4 w-4" />
										<span>{isCreating ? "Creating..." : "Create invite"}</span>
									</ActionButton>

									{createResult?.ok === true ? (
										<div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/20 dark:text-green-200">
											<Check className="h-5 w-5 shrink-0 self-start" />
											<div className="flex flex-col leading-tight">
												<p className="my-0">
													{createResult.invite.reused ? "Reused" : "Created"}{" "}
													{createResult.invite.code} as "{createResult.invite.name}".
												</p>
												{createResult.invite.reused ? (
													<p className="my-0">Existing invite detected.</p>
												) : null}
											</div>
										</div>
									) : null}
								</div>
							</Form>
							<span className="sr-only" role="status">
								{isCreating
									? "Creating an invite."
									: createResult?.ok
										? `Created ${createResult.invite.code}.`
										: (errors.form ?? "")}
							</span>
						</div>
					</>
				)}
			</div>
		</SitePage>
	);
}
