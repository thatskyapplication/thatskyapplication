import { redirect } from "react-router";
import { THATSKYLINK_URL } from "~/utility/constants";

export const loader = () => {
	return redirect(THATSKYLINK_URL);
};
