import type { Scroll } from '@malib/gear';

export type SelectScrollFunction = (
	scroll: Scroll | null,
	apply?: () => void,
	getOptionStrings?: () => [string, string][]
) => void;
