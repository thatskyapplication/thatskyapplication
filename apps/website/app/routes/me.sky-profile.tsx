import {
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SkyProfileEditType,
	type SkyProfilePacket,
	Table,
} from "@thatskyapplication/utility";
import { ArrowLeft, Check, ExternalLinkIcon } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { Form, Link, useActionData, useLoaderData } from "react-router";
import { SitePage } from "~/components/PageLayout";
import pg from "~/pg.server";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select("name")
		.where({ user_id: discordUser.id })
		.first();

	return { discordUserId: discordUser.id, skyProfilePacket };
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select("name")
		.where({ user_id: discordUser.id })
		.first();

	const formData = await request.formData();
	const rawName = formData.get("name");

	if (typeof rawName !== "string") {
		return { ok: false, message: "Field is required." } as const;
	}

	const name = rawName.trim();

	if (name.length === 0) {
		return { ok: false, message: "Field is required." } as const;
	}

	if (name.length > SKY_PROFILE_MAXIMUM_NAME_LENGTH) {
		return {
			ok: false,
			message: `Name must not exceed ${SKY_PROFILE_MAXIMUM_NAME_LENGTH} characters.`,
		} as const;
	}

	if (name === (skyProfilePacket?.name ?? "")) {
		return null;
	}

	await pg<SkyProfilePacket>(Table.Profiles)
		.insert({ user_id: discordUser.id, name })
		.onConflict("user_id")
		.merge({ name });

	return { ok: true } as const;
};

export default function MeSkyProfile() {
	const { discordUserId, skyProfilePacket } = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const { t } = useTranslation();
	const initialName = skyProfilePacket?.name ?? "";
	const [showSuccess, setShowSuccess] = useState(false);
	const [nameValue, setNameValue] = useState(initialName);
	const hasChanges = nameValue.trim() !== initialName;

	useEffect(() => {
		if (actionData?.ok !== true) {
			setShowSuccess(false);
			return;
		}

		setShowSuccess(true);
		const timeout = window.setTimeout(() => setShowSuccess(false), 3000);
		return () => window.clearTimeout(timeout);
	}, [actionData]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		if (!hasChanges) {
			event.preventDefault();
		}
	};

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
				<div>
					<Link
						className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
						to="/me"
					>
						<ArrowLeft className="h-4 w-4" />
						<span>Back</span>
					</Link>
				</div>

				<div>
					<h1 className="mb-2">Sky profile</h1>
					<p className="mb-0 text-gray-600 dark:text-gray-400">
						Update your Sky profile here. For now, you can set your name.
					</p>
				</div>

				<Form
					key={initialName}
					method="post"
					onReset={() => setNameValue(initialName)}
					onSubmit={handleSubmit}
				>
					<div className="rounded-lg border border-gray-200 bg-gray-100 p-6 shadow-md dark:border-gray-700 dark:bg-gray-900">
						<h2 className="my-0 text-lg font-medium text-gray-900 dark:text-gray-100">
							{t(`sky-profile.edit-type-label.${SkyProfileEditType.Name}`, {
								ns: "features",
							})}
						</h2>
						<div>
							<label className="mb-2 block text-sm text-gray-600 dark:text-gray-400" htmlFor="name">
								{t(`sky-profile.edit-type-description.${SkyProfileEditType.Name}`, {
									ns: "features",
								})}
							</label>
							<input
								aria-invalid={actionData?.ok === false ? true : undefined}
								className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition-colors focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
								defaultValue={skyProfilePacket?.name ?? ""}
								id="name"
								maxLength={SKY_PROFILE_MAXIMUM_NAME_LENGTH}
								name="name"
								onChange={(event) => setNameValue(event.currentTarget.value)}
								required
								type="text"
							/>
							{actionData?.ok === false ? (
								<p className="mt-2 text-sm text-red-600 dark:text-red-400">{actionData.message}</p>
							) : null}
						</div>
					</div>

					<div className="mt-6 flex flex-col gap-3 sm:flex-row">
						<div className="flex flex-col gap-3 sm:flex-row">
							<button
								className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-green-600 px-5 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-600/60 disabled:text-white/80 dark:border-gray-600"
								disabled={!hasChanges}
								type="submit"
							>
								Save Sky profile
							</button>
							<button
								className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-200 px-5 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-200/70 disabled:text-gray-900/70 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:disabled:bg-gray-700/70 dark:disabled:text-gray-100/70"
								disabled={!hasChanges}
								type="reset"
							>
								Reset
							</button>
						</div>
						{skyProfilePacket?.name ? (
							<Link
								className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-black px-5 py-3 font-medium text-white transition-colors hover:bg-black/80 dark:border-gray-600 dark:bg-white dark:text-black dark:hover:bg-white/80"
								to={`/sky-profiles/${discordUserId}`}
							>
								<ExternalLinkIcon className="h-4 w-4" />
								<span>View public profile</span>
							</Link>
						) : null}
					</div>
					{showSuccess ? (
						<div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/20 dark:text-green-200">
							<Check className="h-5 w-5" />
							<span>Sky profile saved!</span>
						</div>
					) : null}
				</Form>
			</div>
		</SitePage>
	);
}
