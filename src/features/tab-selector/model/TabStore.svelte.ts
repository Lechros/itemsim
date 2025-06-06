export interface Tab {
	label: string;
	value: string;
	disabled?: boolean;
}

export class TabStore {
	tabs: Tab[] = $state([]);
	private _currentTab: Tab | undefined = $state();

	constructor(tabs: Tab[], initialTab?: string) {
		this.tabs = tabs;
		if (this.enabledTabs.length === 0) {
			throw new Error('No enabled tabs');
		}
		this._currentTab =
			this.enabledTabs.find((tab) => tab.value === initialTab) ?? this.enabledTabs[0];
	}

	private enabledTabs = $derived(this.tabs.filter((tab) => !tab.disabled));

	public currentTab = $derived(this._currentTab) as Tab;

	setTab(tab: string) {
		const tabInfo = this.enabledTabs.find((t) => t.value === tab);
		if (tabInfo) {
			this._currentTab = tabInfo;
		}
	}
}

export function createTabStore(tabs: Tab[], initialTab?: string) {
	return new TabStore(tabs, initialTab);
}
