"use client";

import { Button } from "ariakit/button";
import { useTheme } from "next-themes";
import { MdInvertColors } from "react-icons/md";

export default function ThemeSwitcher() {
	const { resolvedTheme, setTheme } = useTheme();
	const toggleTheme = () => setTheme(resolvedTheme === "light" ? "dark" : "light");

	return (
		<Button
			aria-label="Toggle theme"
			className="h-6 w-6 flex flex-row transform-gpu cursor-pointer appearance-none place-items-center border-0 rounded rounded-full bg-transparent p-0 leading-none no-underline outline-none active:translate-y-px focus:ring focus:ring-caelus dark:focus:ring-white focus:ring-width-2"
			onClick={() => toggleTheme()}
		>
			<MdInvertColors size={24} />
		</Button>
	);
}
