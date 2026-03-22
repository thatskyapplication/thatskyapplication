type CookieInitWithLegacy = Omit<CookieInit, "expires"> & {
	maxAge?: number;
};

function setDocumentCookie({
	name,
	value,
	path = "/",
	maxAge,
	sameSite = "lax",
}: CookieInitWithLegacy) {
	let cookie = `${name}=${encodeURIComponent(value)}; Path=${path}; SameSite=${sameSite}`;

	if (typeof maxAge === "number") {
		cookie += `; Max-Age=${maxAge}`;
	}

	// Check for local development too.
	if (window.location.protocol === "https:") {
		cookie += "; Secure";
	}

	// biome-ignore lint/suspicious/noDocumentCookie: People use old stuff.
	document.cookie = cookie;
}

export async function cookieStoreSet(options: CookieInitWithLegacy) {
	if (!("cookieStore" in window)) {
		setDocumentCookie(options);
		return;
	}

	const { name, value, path = "/", maxAge, sameSite = "lax" } = options;

	try {
		await window.cookieStore.set({
			name,
			value,
			path,
			expires: typeof maxAge === "number" ? Date.now() + maxAge * 1000 : null,
			sameSite,
		});
	} catch {
		setDocumentCookie(options);
	}
}
