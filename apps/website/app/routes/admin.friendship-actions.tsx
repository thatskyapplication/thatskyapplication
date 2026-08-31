import { Buffer } from "node:buffer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { Snowflake } from "@discordjs/core/http-only";
import { clsx } from "clsx";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { data, Link } from "react-router";
import {
	CDN,
	FRIENDSHIP_ACTION_TYPE_VALUES,
	type FriendshipActionTypes,
	isFriendshipActionType,
} from "@thatskyapplication/utility";
import {
	type FriendshipAction,
	FriendshipActionCard,
} from "~/components/friendship-actions/FriendshipActionCard.js";
import {
	type FriendshipActionUploadErrors,
	FriendshipActionUploadForm,
	MAXIMUM_FRIENDSHIP_ACTIONS_ASSET_BYTES_SIZE,
	MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE,
	MAXIMUM_FRIENDSHIP_ACTIONS_USERS,
	type SuccessfulUpload,
} from "~/components/friendship-actions/FriendshipActionUploadForm.js";
import type { FriendshipActionUser } from "~/components/friendship-actions/FriendshipActionUserChip.js";
import { SitePage } from "~/components/PageLayout";
import { CDN_BUCKET, CDN_URL, SUPPORT_SERVER_GUILD_ID } from "~/config.server.js";
import database from "~/database.server.js";
import pino from "~/pino.js";
import S3Client from "~/s3-client.server.js";
import { FriendshipActionTypeToLabel } from "~/utility/friendship-actions.js";
import { avatarURL, defaultAvatarURL } from "~/utility/functions.js";
import { requireAdminAccess } from "~/utility/functions.server.js";
import { SECTION_HEADING_CLASS, WARNING_BANNER_CLASS } from "~/utility/styles.js";
import { resolveUsers } from "~/utility/users.server.js";
import type { Route } from "./+types/admin.friendship-actions.js";

const USER_CHIP_ICON_SIZE = 64 as const;
const MAXIMUM_FRIENDSHIP_ACTION_ID = 32_767 as const;
const DISCORD_USER_ID_REGEX = /^\d{17,19}$/;

const REFERENCE_REGEX = new RegExp(
	`^https:\\/\\/discord\\.com\\/channels\\/${SUPPORT_SERVER_GUILD_ID}\\/\\d{19}$`,
);

const cdn = new CDN(CDN_URL);

function parseUserIds(value: string) {
	const lines = value
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);

	if (lines.length === 0) {
		return { error: "At least one user id is required." } as const;
	}

	const ids: Snowflake[] = [];

	for (const line of lines) {
		if (!DISCORD_USER_ID_REGEX.test(line)) {
			return {
				error: "User ids must be present and separated via new lines.",
			} as const;
		}

		if (!ids.includes(line)) {
			ids.push(line);
		}
	}

	if (ids.length > MAXIMUM_FRIENDSHIP_ACTIONS_USERS) {
		return {
			error: `You can upload up to ${MAXIMUM_FRIENDSHIP_ACTIONS_USERS} users at a time.`,
		} as const;
	}

	return { ids } as const;
}

async function validateAsset(file: File) {
	if (file.type !== "image/gif") {
		return { error: "Invalid asset type. Only GIFs are allowed." } as const;
	}

	if (file.size > MAXIMUM_FRIENDSHIP_ACTIONS_ASSET_BYTES_SIZE) {
		return {
			error: `Asset is too large. Maximum size is ${MAXIMUM_FRIENDSHIP_ACTIONS_ASSET_BYTES_SIZE.toLocaleString()} bytes.`,
		} as const;
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const signature = buffer.subarray(0, 6).toString("ascii");

	if (buffer.length < 10 || (signature !== "GIF87a" && signature !== "GIF89a")) {
		return { error: "Asset is not a valid GIF." } as const;
	}

	const width = buffer.readUInt16LE(6);
	const height = buffer.readUInt16LE(8);

	if (
		width > MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE ||
		height > MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE
	) {
		return {
			error: `Asset dimensions are too large. Maximum is ${MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE}x${MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE}.`,
		} as const;
	}

	if (width !== height) {
		return { error: "Asset is not 1:1." } as const;
	}

	return { buffer, square: width === height } as const;
}

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	await requireAdminAccess({ context, request, url });

	const packets = await database
		.selectFrom("friendship_actions")
		.selectAll()
		.$narrowType<{ type: FriendshipActionTypes }>()
		.orderBy("type", "asc")
		.orderBy("id", "asc")
		.execute();

	const userIds = [...new Set(packets.flatMap((packet) => packet.users))];

	const skyProfilePackets =
		userIds.length === 0
			? []
			: await database
					.selectFrom("sky_profiles")
					.select(["user_id", "name", "icon"])
					.where("user_id", "in", userIds)
					.where("name", "is not", null)
					.$narrowType<{ name: string }>()
					.execute();

	const skyProfiles = new Map(skyProfilePackets.map((packet) => [packet.user_id, packet]));

	const { users } = await resolveUsers(userIds.filter((userId) => !skyProfiles.has(userId)));

	const friendshipActions: FriendshipAction[] = packets.map((packet) => ({
		assetURL: cdn.FriendshipActionTypeToURL[packet.type](packet.id),
		id: packet.id,
		reference: packet.reference,
		skip: packet.skip,
		square: packet.square,
		type: packet.type,
		typeLabel: FriendshipActionTypeToLabel[packet.type],
		users: packet.users.map((userId): FriendshipActionUser => {
			const skyProfile = skyProfiles.get(userId);

			if (skyProfile) {
				return {
					iconURL: skyProfile.icon
						? cdn.skyProfileIconURL(userId, skyProfile.icon)
						: defaultAvatarURL(userId),
					id: userId,
					name: skyProfile.name,
					skyProfile: true,
				};
			}

			const user = users.get(userId);

			return {
				iconURL: user ? avatarURL(user, { size: USER_CHIP_ICON_SIZE }) : defaultAvatarURL(userId),
				id: userId,
				name: user ? (user.global_name ?? user.username) : null,
				skyProfile: false,
			};
		}),
	}));

	const groups = FRIENDSHIP_ACTION_TYPE_VALUES.map((type) => {
		const groupFriendshipActions = friendshipActions.filter(
			(friendshipAction) => friendshipAction.type === type,
		);

		return {
			friendshipActions: groupFriendshipActions,
			skipped: groupFriendshipActions.filter((friendshipAction) => friendshipAction.skip).length,
			type,
			typeLabel: FriendshipActionTypeToLabel[type],
		};
	});

	return { groups, total: friendshipActions.length };
};

export const action = async ({ context, request, url }: Route.ActionArgs) => {
	await requireAdminAccess({ context, request, url });
	const formData = await request.formData();
	const intent = formData.get("intent");

	if (intent === "skip") {
		const rawId = formData.get("id");
		const rawType = formData.get("type");
		const rawSkip = formData.get("skip");
		const id = typeof rawId === "string" ? Number.parseInt(rawId, 10) : Number.NaN;
		const type = typeof rawType === "string" ? Number.parseInt(rawType, 10) : Number.NaN;

		if (
			!Number.isSafeInteger(id) ||
			id <= 0 ||
			id > MAXIMUM_FRIENDSHIP_ACTION_ID ||
			!isFriendshipActionType(type) ||
			(rawSkip !== "true" && rawSkip !== "false")
		) {
			return data({ error: "Invalid request.", intent: "skip", ok: false } as const);
		}

		const result = await database
			.updateTable("friendship_actions")
			.set({ skip: rawSkip === "true" })
			.where("id", "=", id)
			.where("type", "=", type)
			.executeTakeFirst();

		if (result.numUpdatedRows === 0n) {
			return data({
				error: "That friendship action no longer exists.",
				intent: "skip",
				ok: false,
			} as const);
		}

		return data({ intent: "skip", ok: true } as const);
	}

	if (intent !== "upload") {
		throw new Response("Unknown intent.", { status: 400 });
	}

	const rawType = formData.get("type");
	const rawAsset = formData.get("asset");
	const rawUsers = formData.get("users");
	const rawReference = formData.get("reference");
	const type = typeof rawType === "string" ? Number.parseInt(rawType, 10) : Number.NaN;
	const users = typeof rawUsers === "string" ? rawUsers.trim() : "";
	const reference = typeof rawReference === "string" ? rawReference.trim() : "";
	const errors: FriendshipActionUploadErrors = {};

	if (!isFriendshipActionType(type)) {
		errors.type = "Invalid friendship action type.";
	}

	if (!(rawAsset instanceof File) || rawAsset.size === 0 || rawAsset.name === "") {
		errors.asset = "Asset is required.";
	}

	const parsedUsers = parseUserIds(users);
	let parsedUserIds: readonly Snowflake[] | null = null;

	if ("error" in parsedUsers) {
		errors.users = parsedUsers.error;
	} else {
		parsedUserIds = parsedUsers.ids;
	}

	if (!REFERENCE_REGEX.test(reference)) {
		errors.reference = "Invalid reference. Must be a link to the friendship actions thread.";
	}

	let validatedAsset: Awaited<ReturnType<typeof validateAsset>> | null = null;

	if (!errors.asset && rawAsset instanceof File) {
		validatedAsset = await validateAsset(rawAsset);

		if ("error" in validatedAsset) {
			errors.asset = validatedAsset.error;
		}
	}

	if (!errors.users && parsedUserIds) {
		const { failedUserIds, unknownUserIds } = await resolveUsers(parsedUserIds);

		if (failedUserIds.length > 0) {
			errors.users = "Discord could not be reached. Try again.";
		} else if (unknownUserIds.length > 0) {
			errors.users =
				unknownUserIds.length === 1
					? `Discord user ${unknownUserIds[0]} does not exist.`
					: `These Discord users do not exist: ${unknownUserIds.join(", ")}.`;
		}
	}

	if (Object.keys(errors).length > 0) {
		return data({ errors, intent: "upload", ok: false } as const, { status: 422 });
	}

	const friendshipActionType = type as FriendshipActionTypes;
	const validatedUserIds = parsedUserIds as readonly Snowflake[];
	const validatedUpload = validatedAsset as { buffer: Buffer; square: boolean };

	try {
		const { maxId } = await database
			.selectFrom("friendship_actions")
			.select((eb) => eb.fn.max("id").as("maxId"))
			.where("type", "=", friendshipActionType)
			.executeTakeFirstOrThrow();

		const nextId = (maxId ?? 0) + 1;

		const row = await database
			.insertInto("friendship_actions")
			.values({
				id: nextId,
				type: friendshipActionType,
				users: [...validatedUserIds],
				square: validatedUpload.square,
				skip: false,
				reference,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		try {
			await S3Client.send(
				new PutObjectCommand({
					Bucket: CDN_BUCKET,
					Key: cdn.friendshipActionRoute(friendshipActionType, nextId),
					Body: validatedUpload.buffer,
					ContentDisposition: "inline",
					ContentType: "image/gif",
				}),
			);
		} catch (error) {
			try {
				await database
					.deleteFrom("friendship_actions")
					.where("id", "=", nextId)
					.where("type", "=", friendshipActionType)
					.execute();
			} catch (error) {
				pino.error(
					error,
					"Failed to clean up database after failed friendship action asset upload.",
				);
			}

			throw error;
		}

		const upload: SuccessfulUpload = {
			id: row.id,
			type: friendshipActionType,
			users: row.users,
			assetURL: cdn.FriendshipActionTypeToURL[friendshipActionType](row.id),
		};

		return data({ intent: "upload", ok: true, upload } as const);
	} catch (error) {
		pino.error(error, "Failed to upload friendship action.");

		return data(
			{
				errors: {
					form: "Something went wrong while uploading the friendship action.",
				},
				intent: "upload",
				ok: false,
			} as const,
			{ status: 500 },
		);
	}
};

export default function AdminFriendshipActions({ actionData, loaderData }: Route.ComponentProps) {
	const { groups, total } = loaderData;
	const [hiddenTypes, setHiddenTypes] = useState<ReadonlySet<FriendshipActionTypes>>(new Set());
	const uploadResult = actionData?.intent === "upload" ? actionData : null;

	const uploadErrors: FriendshipActionUploadErrors =
		uploadResult?.ok === false ? uploadResult.errors : {};

	const shownGroups = groups.filter((group) => !hiddenTypes.has(group.type));

	const unavailableGroups = groups.filter(
		(group) => group.friendshipActions.length === group.skipped,
	);

	function toggleType(type: FriendshipActionTypes) {
		setHiddenTypes((previous) => {
			const next = new Set(previous);

			if (!next.delete(type)) {
				next.add(type);
			}

			return next;
		});
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
					<h1 className="mb-1 text-4xl font-bold">Friendship actions</h1>
					<p className="mb-0 text-base text-gray-600 dark:text-gray-400">
						{total === 1 ? "1 friendship action." : `${total} friendship actions.`}
					</p>
				</div>

				{unavailableGroups.length > 0 && (
					<div
						className={clsx(
							WARNING_BANNER_CLASS,
							"flex items-start gap-2 text-sm text-amber-800 dark:text-amber-200",
						)}
					>
						<TriangleAlert className="h-5 w-5 shrink-0" />
						<p className="my-0">
							Nothing left to send for:{" "}
							{unavailableGroups.map((group) => group.typeLabel.toLowerCase()).join(", ")}.
						</p>
					</div>
				)}

				<div aria-label="Filter by friendship action type." role="group">
					<ul className="-mx-2 -mt-1 flex list-none flex-wrap gap-x-1 gap-y-0.5 p-0">
						{groups.map((group) => {
							const hidden = hiddenTypes.has(group.type);

							return (
								<li key={group.type}>
									<button
										aria-pressed={!hidden}
										className={clsx(
											"inline-flex cursor-pointer items-center rounded-full border px-2 py-1 text-xs font-medium transition",
											hidden
												? "border-gray-300 bg-transparent text-gray-600 line-through hover:bg-black/5 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-white/10"
												: "border-transparent bg-gray-900 text-gray-50 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300",
										)}
										onClick={() => toggleType(group.type)}
										type="button"
									>
										{group.typeLabel} ({group.friendshipActions.length})
									</button>
								</li>
							);
						})}
					</ul>
				</div>

				{shownGroups.length === 0 ? (
					<p className="my-0 text-sm text-gray-600 dark:text-gray-400">
						Every type is hidden. Select a type above to show it.
					</p>
				) : (
					shownGroups.map((group) => (
						<div className="flex flex-col gap-3" key={group.type}>
							<h2 className={SECTION_HEADING_CLASS}>
								{group.typeLabel} ({group.friendshipActions.length}
								{group.skipped > 0 ? `, ${group.skipped} skipped` : ""})
							</h2>

							{group.friendshipActions.length === 0 ? (
								<p className="my-0 text-sm text-gray-600 dark:text-gray-400">
									No friendship actions.
								</p>
							) : (
								<ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 lg:grid-cols-2">
									{group.friendshipActions.map((friendshipAction) => (
										<li key={friendshipAction.id}>
											<FriendshipActionCard friendshipAction={friendshipAction} />
										</li>
									))}
								</ul>
							)}
						</div>
					))
				)}

				<FriendshipActionUploadForm
					errors={uploadErrors}
					upload={uploadResult?.ok ? uploadResult.upload : null}
				/>
			</div>
		</SitePage>
	);
}
