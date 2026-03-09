function createEnv() {
	const envVars = {
		API_URL: import.meta.env.VITE_API_BASE_URL,
		IMAGE_URL: import.meta.env.VITE_IMAGE_BASE_URL
	};

	const errors: [string, string][] = [];
	for (const [key, value] of Object.entries(envVars)) {
		if (!value) {
			errors.push([key, value]);
		}
	}
	if (errors.length > 0) {
		const items = errors.map(([key, value]) => ` - ${key}: ${value}`);
		throw new Error(`Missing or invalid environment variables:\n${items.join('\n')}`);
	}

	return envVars;
}

export const env = createEnv();
