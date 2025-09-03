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
		throw new Error(`Missing or invalid environment variables:
		${Object.entries(errors)
			.map(([key, value]) => `- ${key}: ${value}`)
			.join('\n')}`);
	}

	return envVars;
}

export const env = createEnv();
