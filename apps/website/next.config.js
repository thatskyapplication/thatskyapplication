const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
	experimental: { appDir: true },
	reactStrictMode: true,
	redirects: () => [
		{
			source: "/github",
			destination: "https://github.com/thatskyapplication",
			permanent: false,
		},
		{
			source: "/invite",
			destination:
				"https://discord.com/api/oauth2/authorize?client_id=982740693070012506&permissions=268569600&scope=applications.commands%20bot",
			permanent: false,
		},
		{
			source: "/support",
			destination: "https://discord.gg/dFJms52NgB",
			permanent: false,
		},
	],
});
