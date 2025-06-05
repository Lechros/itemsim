import type { Observable } from 'dexie';

export abstract class AbstractLiveQuery<T> {
	value: T | undefined = $state(undefined);
	isLoading = $state(true);
	error = $state<unknown | undefined>(undefined);

	protected abstract getLiveQuery(): Observable<T>;

	constructor() {
		$effect(() => {
			return this.getLiveQuery().subscribe(
				(value) => {
					this.error = undefined;
					if (value !== undefined) {
						this.value = value;
						this.isLoading = false;
					} else {
						this.isLoading = true;
					}
				},
				(error) => {
					this.error = error;
					this.value = undefined;
					this.isLoading = false;
				}
			).unsubscribe;
		});
	}
}
