import { defineConfig, presetTypography, presetUno } from "unocss";

export default defineConfig({
	theme: {
		colors: {
			blurple: { DEFAULT: "#5865F2" },
			caelus: { 100: "#A5B5F1", 200: "#7f91d4", DEFAULT: "#6D6D6D" },
			link: { DEFAULT: "#5F1EC0" },
		},
	},
	presets: [
		presetUno({ dark: "class" }),
		presetTypography({
			cssExtend: {
				pre: {
					padding: "1em",
					"line-height": "1.5",
					"border-radius": "4px",
				},
				code: {
					"font-size": "1em",
					"font-weight": "unset",
				},
				":where(:not(pre) > code)::before": {
					content: '""',
				},
				":where(:not(pre) > code)::after": {
					content: '""',
				},
				a: {
					color: "#5865F2",
					"text-decoration": "none",
				},
				"a > img": {
					display: "inline-block",
				},
				h1: {
					"scroll-margin-top": "6.5rem",
				},
				".level-h1": {
					margin: "1rem 0",
				},
				h2: {
					"margin-top": "1.25em",
					"scroll-margin-top": "6.5rem",
				},
				".level-h2": {
					margin: "1.25em 0",
				},
				h3: {
					"margin-top": "1.25em",
					"scroll-margin-top": "6.5rem",
				},
				".level-h3": {
					margin: "1.25em 0",
				},
				h4: {
					"margin-top": "1.25em",
					"scroll-margin-top": "6.5rem",
				},
				".level-h4": {
					margin: "1.25em 0",
				},
				// eslint-disable-next-line id-length
				p: {
					margin: ".5em 0",
				},
			},
		}),
	]
});
