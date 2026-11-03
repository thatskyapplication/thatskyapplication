import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { PIECE_OF_LIGHT_PATH } from "~/utility/constants.js";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";

export function ShardRewardIcon({
	className,
	strong,
}: {
	className?: string | undefined;
	strong: boolean;
}) {
	const { t } = useTranslation();

	return strong ? (
		<EmojiIcon
			className={clsx("h-4 w-4", className)}
			emoji={MISCELLANEOUS_EMOJIS.AscendedCandle}
			label={t("ascended-candles", { ns: "general" })}
		/>
	) : (
		<div
			aria-label="Piece of light"
			className={clsx("h-4 w-4 bg-cover bg-center", className)}
			role="img"
			style={{ backgroundImage: `url(${PIECE_OF_LIGHT_PATH})` }}
		/>
	);
}
