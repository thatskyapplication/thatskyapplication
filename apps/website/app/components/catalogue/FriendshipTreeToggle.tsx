import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { SWITCH_CLASS, SWITCH_THUMB_CLASS } from "~/utility/styles.js";

export function FriendshipTreeToggle({ search, seasonal }: { search: string; seasonal: boolean }) {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<Field.Root className="flex w-fit items-center gap-2">
			<Switch.Root
				checked={seasonal}
				className={SWITCH_CLASS}
				onCheckedChange={(checked) => {
					void navigate(checked ? `${search}&tree=seasonal` : search, {
						preventScrollReset: true,
						replace: true,
					});
				}}
			>
				<Switch.Thumb className={SWITCH_THUMB_CLASS} />
			</Switch.Root>
			<Field.Label className="cursor-pointer text-sm text-gray-600 dark:text-gray-400">
				{t("spirits.friendship-tree-seasonal", { ns: "features" })}
			</Field.Label>
		</Field.Root>
	);
}
