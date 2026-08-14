import { useNavigation } from "react-router";

export function useIsSaving() {
	const navigation = useNavigation();

	return (
		navigation.state !== "idle" &&
		navigation.formMethod?.toLowerCase() === "post" &&
		navigation.formData != null
	);
}

export function selectableOptionLabelClass(isSaving: boolean) {
	return isSaving ? "cursor-not-allowed" : "cursor-pointer";
}
