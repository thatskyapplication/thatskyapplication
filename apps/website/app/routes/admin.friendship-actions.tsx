import { Buffer } from "node:buffer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { Snowflake } from "@discordjs/core/http-only";
import { DiscordAPIError } from "@discordjs/rest";
import {
	type FriendshipActionsPacket,
	FriendshipActionType,
	type FriendshipActionTypes,
	hairTouslesRoute,
	highFivesRoute,
	hugsRoute,
	isFriendshipActionType,
	krillsRoute,
	playFightsRoute,
	Table,
} from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { ArrowLeft, Check, ExternalLinkIcon, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { data, Form, Link, useActionData, useNavigation } from "react-router";
import { SitePage } from "~/components/PageLayout";
import Select from "~/components/Select";
import { CDN_BUCKET, CDN_URL, SUPPORT_SERVER_GUILD_ID } from "~/config.server.js";
import discord from "~/discord.js";
import pg from "~/pg.server.js";
import pino from "~/pino.js";
import S3Client from "~/s3-client.server.js";
import { requireAdminAccess } from "~/utility/functions.server.js";

const MAXIMUM_FRIENDSHIP_ACTIONS_ASSET_BYTES_SIZE = 5_000_000 as const;
const MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE = 512 as const;
const MAXIMUM_FRIENDSHIP_ACTIONS_USERS = 5 as const;
const DISCORD_USER_ID_REGEX = /^\d{17,19}$/;

const FRIENDSHIP_ACTION_REFERENCE_REGEX = new RegExp(
	`^https:\\/\\/discord\\.com\\/channels\\/${SUPPORT_SERVER_GUILD_ID}\\/\\d{17,20}$`,
);

const FriendshipActionTypeToLabel = {
	[FriendshipActionType.HighFive]: "High-five",
	[FriendshipActionType.Hug]: "Hug",
	[FriendshipActionType.HairTousle]: "Hair tousle",
	[FriendshipActionType.PlayFight]: "Play fight",
	[FriendshipActionType.Krill]: "Krill",
} as const satisfies Readonly<Record<FriendshipActionTypes, string>>;

const FriendshipActionTypeToCDNName = {
	[FriendshipActionType.HighFive]: "high_fives",
	[FriendshipActionType.Hug]: "hugs",
	[FriendshipActionType.HairTousle]: "hair_tousles",
	[FriendshipActionType.PlayFight]: "play_fights",
	[FriendshipActionType.Krill]: "krills",
} as const satisfies Readonly<Record<FriendshipActionTypes, string>>;

const FriendshipActionTypeToRoute = {
	[FriendshipActionType.HighFive]: highFivesRoute,
	[FriendshipActionType.Hug]: hugsRoute,
	[FriendshipActionType.HairTousle]: hairTouslesRoute,
	[FriendshipActionType.PlayFight]: playFightsRoute,
	[FriendshipActionType.Krill]: krillsRoute,
} as const satisfies Readonly<
	Record<FriendshipActionTypes, (cdnURL: string, id: number) => string>
>;

interface FriendshipActionUploadErrors {
	type?: string;
	asset?: string;
	users?: string;
	reference?: string;
	form?: string;
}

interface SuccessfulUpload {
	id: number;
	type: FriendshipActionTypes;
	users: readonly Snowflake[];
	reference: string;
	assetURL: string;
}

function fieldClass(hasError: boolean) {
	return clsx(
		"w-full rounded-lg border bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm outline-none transition-colors",
		"disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500",
		"dark:bg-gray-800 dark:text-gray-100 dark:disabled:border-gray-700 dark:disabled:bg-gray-900 dark:disabled:text-gray-500",
		hasError
			? "border-red-500 focus:border-red-500 dark:border-red-500"
			: "border-gray-300 focus:border-blue-500 dark:border-gray-600",
	);
}

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
				error: "Users ids must be present and separated via new lines.",
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { discordUser } = await requireAdminAccess(request);
	return { discordUser };
};

export const action = async ({ request }: ActionFunctionArgs) => {
	await requireAdminAccess(request);
	const formData = await request.formData();
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

	if (!FRIENDSHIP_ACTION_REFERENCE_REGEX.test(reference)) {
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
		const userResults = await Promise.allSettled(
			parsedUserIds.map((userId) => discord.users.get(userId)),
		);

		const unknownUserIds: Snowflake[] = [];

		for (const [index, result] of userResults.entries()) {
			if (result.status === "fulfilled") {
				continue;
			}

			if (result.reason instanceof DiscordAPIError && result.reason.status === 404) {
				unknownUserIds.push(parsedUserIds[index]!);
				continue;
			}

			throw result.reason;
		}

		if (unknownUserIds.length > 0) {
			errors.users =
				unknownUserIds.length === 1
					? `Discord user ${unknownUserIds[0]} does not exist.`
					: `These Discord users do not exist: ${unknownUserIds.join(", ")}.`;
		}
	}

	if (Object.keys(errors).length > 0) {
		return data({ ok: false, errors } as const, { status: 422 });
	}

	const friendshipActionType = type as FriendshipActionTypes;
	const validatedUserIds = parsedUserIds as readonly Snowflake[];
	const validatedUpload = validatedAsset as { buffer: Buffer; square: boolean };

	try {
		const { maxId } = await pg<FriendshipActionsPacket>(Table.FriendshipActions)
			.where({ type: friendshipActionType })
			.max({ maxId: "id" })
			.first<{ maxId: number | null }>();

		const nextId = (maxId ?? 0) + 1;

		const rows = await pg<FriendshipActionsPacket>(Table.FriendshipActions).insert(
			{
				id: nextId,
				type: friendshipActionType,
				users: validatedUserIds,
				square: validatedUpload.square,
				reference,
			},
			"*",
		);

		try {
			await S3Client.send(
				new PutObjectCommand({
					Bucket: CDN_BUCKET,
					Key: `${FriendshipActionTypeToCDNName[friendshipActionType]}/${nextId}.gif`,
					Body: validatedUpload.buffer,
				}),
			);
		} catch (error) {
			try {
				await pg<FriendshipActionsPacket>(Table.FriendshipActions)
					.delete()
					.where({ id: nextId, type: friendshipActionType });
			} catch (error) {
				pino.error(
					error,
					"Failed to clean up database after failed friendship action asset upload.",
				);
			}

			throw error;
		}

		const row = rows[0]!;

		const upload: SuccessfulUpload = {
			id: row.id,
			type: friendshipActionType,
			users: row.users,
			reference: row.reference,
			assetURL: FriendshipActionTypeToRoute[friendshipActionType](CDN_URL, row.id),
		};

		return data({ ok: true, upload } as const);
	} catch (error) {
		pino.error({ error, request }, "Failed to upload friendship action.");

		return data(
			{
				ok: false,
				errors: {
					form: "Something went wrong while uploading the friendship action.",
				},
			} as const,
			{ status: 500 },
		);
	}
};

export default function AdminFriendshipActions() {
	const actionData = useActionData<typeof action>();
	const navigation = useNavigation();
	const formRef = useRef<HTMLFormElement>(null);
	const assetInputRef = useRef<HTMLInputElement>(null);
	const assetPreviewURLRef = useRef<string | null>(null);
	const [assetFileName, setAssetFileName] = useState("");
	const [referenceValue, setReferenceValue] = useState("");
	const [assetPreviewURL, setAssetPreviewURL] = useState<string | null>(null);
	const [typeValue, setTypeValue] = useState("");
	const [usersValue, setUsersValue] = useState("");
	const isSaving =
		navigation.state !== "idle" &&
		navigation.formMethod?.toLowerCase() === "post" &&
		navigation.formData != null;
	const errors: FriendshipActionUploadErrors = actionData?.ok === false ? actionData.errors : {};
	const canSubmit = Boolean(
		typeValue && assetFileName && usersValue.trim().length > 0 && referenceValue.trim().length > 0,
	);

	useEffect(
		() => () => {
			if (assetPreviewURLRef.current) {
				URL.revokeObjectURL(assetPreviewURLRef.current);
			}
		},
		[],
	);

	useEffect(() => {
		if (actionData?.ok) {
			formRef.current?.reset();
			setAssetFileName("");
			if (assetPreviewURLRef.current) {
				URL.revokeObjectURL(assetPreviewURLRef.current);
			}
			assetPreviewURLRef.current = null;
			setAssetPreviewURL(null);
			setReferenceValue("");
			setTypeValue("");
			setUsersValue("");
		}
	}, [actionData]);

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
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
						Upload a new friendship action.
					</p>
				</div>

				<Form
					className="flex flex-col gap-4"
					encType="multipart/form-data"
					method="post"
					ref={formRef}
				>
					{errors.form ? (
						<div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
							{errors.form}
						</div>
					) : null}

					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<h2
								className="my-0 text-base font-medium text-gray-900 dark:text-gray-100"
								id="type-heading"
							>
								Type
							</h2>
							<div className="flex flex-col gap-2">
								<p className="my-0 text-sm text-gray-600 dark:text-gray-400" id="type-description">
									Choose which friendship action this GIF belongs to.
								</p>
								<Select
									ariaDescribedBy={`type-description${errors.type ? " type-error" : ""}`}
									ariaLabelledBy="type-heading"
									className="w-full"
									disabled={isSaving}
									error={errors.type}
									onChange={(value) => setTypeValue(value)}
									options={Object.entries(FriendshipActionTypeToLabel).map(([value, label]) => ({
										label,
										value,
									}))}
									placeholder="Select a friendship action"
									value={typeValue}
								/>
								<input name="type" type="hidden" value={typeValue} />
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">Asset</h2>
							<div className="flex flex-col gap-2">
								<label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="asset">
									Upload a 1:1 GIF up to {MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE}x
									{MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE} and{" "}
									{(MAXIMUM_FRIENDSHIP_ACTIONS_ASSET_BYTES_SIZE / 1_000_000).toFixed(0)} MB.
								</label>
								<input
									accept="image/gif"
									aria-describedby={errors.asset ? "asset-error" : undefined}
									aria-invalid={errors.asset ? true : undefined}
									className="sr-only"
									disabled={isSaving}
									id="asset"
									name="asset"
									onChange={(event) => {
										const nextFile = event.currentTarget.files?.[0] ?? null;

										setAssetFileName(nextFile?.name ?? "");

										if (assetPreviewURLRef.current) {
											URL.revokeObjectURL(assetPreviewURLRef.current);
										}

										const nextPreviewURL = nextFile ? URL.createObjectURL(nextFile) : null;
										assetPreviewURLRef.current = nextPreviewURL;
										setAssetPreviewURL(nextPreviewURL);
									}}
									ref={assetInputRef}
									required
									type="file"
								/>
								<div className="flex justify-center">
									<button
										aria-describedby={errors.asset ? "asset-error" : undefined}
										aria-invalid={errors.asset ? true : undefined}
										className={clsx(
											"flex aspect-square w-full max-w-64 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border text-center shadow-sm transition-colors",
											errors.asset
												? "border-red-500 bg-white dark:border-red-500 dark:bg-gray-800"
												: "border-gray-300 bg-white hover:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-blue-400",
											isSaving && "cursor-not-allowed opacity-60",
										)}
										disabled={isSaving}
										onClick={() => assetInputRef.current?.click()}
										type="button"
									>
										{assetPreviewURL ? (
											<img
												alt="Friendship action preview."
												className="h-full w-full object-cover"
												src={assetPreviewURL}
											/>
										) : (
											<>
												<Upload className="h-8 w-8 shrink-0 text-gray-500 dark:text-gray-400" />
												<span className="px-6 text-base font-medium text-gray-900 dark:text-gray-100">
													Choose a GIF
												</span>
											</>
										)}
									</button>
								</div>
								{assetFileName ? (
									<p className="my-0 text-center text-sm text-gray-600 dark:text-gray-400">
										{assetFileName}
									</p>
								) : null}
								{errors.asset ? (
									<p className="my-0 text-sm text-red-600 dark:text-red-400" id="asset-error">
										{errors.asset}
									</p>
								) : null}
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">Users</h2>
							<div className="flex flex-col gap-2">
								<label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="users">
									Paste up to {MAXIMUM_FRIENDSHIP_ACTIONS_USERS} user ids on a new line.
								</label>
								<textarea
									aria-describedby={errors.users ? "users-error" : undefined}
									aria-invalid={errors.users ? true : undefined}
									className={fieldClass(Boolean(errors.users))}
									disabled={isSaving}
									id="users"
									name="users"
									onChange={(event) => setUsersValue(event.currentTarget.value)}
									required
									rows={MAXIMUM_FRIENDSHIP_ACTIONS_USERS}
									value={usersValue}
								/>
								{errors.users ? (
									<p className="my-0 text-sm text-red-600 dark:text-red-400" id="users-error">
										{errors.users}
									</p>
								) : null}
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
								Reference
							</h2>
							<div className="flex flex-col gap-2">
								<label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="reference">
									Support server #friendship-actions thread.
								</label>
								<input
									aria-describedby={errors.reference ? "reference-error" : undefined}
									aria-invalid={errors.reference ? true : undefined}
									className={fieldClass(Boolean(errors.reference))}
									disabled={isSaving}
									id="reference"
									name="reference"
									onChange={(event) => setReferenceValue(event.currentTarget.value)}
									placeholder="https://discord.com/channels/1017993798170726411/1416913514676617327"
									required
									type="url"
									value={referenceValue}
								/>
								{errors.reference ? (
									<p className="my-0 text-sm text-red-600 dark:text-red-400" id="reference-error">
										{errors.reference}
									</p>
								) : null}
							</div>
						</div>
					</div>

					<div className="mt-1 flex flex-col gap-2.5">
						<button
							className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-gray-300 bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors duration-300 hover:bg-green-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-green-600/60 disabled:text-white/80 disabled:shadow-md dark:border-gray-600 sm:w-fit"
							disabled={isSaving || !canSubmit}
							type="submit"
						>
							<Upload className="h-4 w-4" />
							<span>{isSaving ? "Uploading..." : "Upload friendship action"}</span>
						</button>

						{actionData?.ok === true ? (
							<div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/20 dark:text-green-200">
								<Check className="h-5 w-5 shrink-0 self-start" />
								<div className="flex flex-col leading-tight">
									<p className="my-0">
										Added {FriendshipActionTypeToLabel[actionData.upload.type]} #
										{actionData.upload.id}.
									</p>
									<p className="my-0">Users: {actionData.upload.users.join(", ")}</p>
									<p className="my-0">
										<a
											className="regular-link inline-flex items-center gap-1"
											href={actionData.upload.assetURL}
											rel="noreferrer"
											target="_blank"
										>
											Open uploaded asset
											<ExternalLinkIcon className="h-4 w-4" />
										</a>
									</p>
								</div>
							</div>
						) : null}
					</div>
				</Form>
			</div>
		</SitePage>
	);
}
