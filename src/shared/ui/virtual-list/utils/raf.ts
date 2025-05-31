let scheduled: boolean = false;
let callback: (() => void) | null = null;

/**
 * Schedules a function to be executed on the next animation frame.
 * If a function is already scheduled, the new function will replace it.
 * This helps prevent multiple RAF calls and ensures smooth animations.
 *
 * @param fn - The function to be executed on the next animation frame
 */
export const rafSchedule = (fn: () => void): void => {
	callback = fn;
	if (!scheduled) {
		scheduled = true;
		requestAnimationFrame((): void => {
			scheduled = false;
			if (callback) {
				callback();
				callback = null;
			}
		});
	}
};
