export const load = async ({ params, url }) => {
	const { seq } = params;
	const initialTab = url.searchParams.get('tab') ?? undefined;

	return {
		seq,
		initialTab
	};
};
