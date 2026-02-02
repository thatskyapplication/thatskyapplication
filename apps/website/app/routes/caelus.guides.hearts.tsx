import { redirect } from "react-router";
import { GUIDE_URL } from "~/utility/constants.js";

export const loader = () => {
	return redirect(GUIDE_URL);
};
