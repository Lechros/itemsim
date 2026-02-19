export type ExportPayload = {
	/**
	 * schema version
	 */
	version: 2;
} & (
	| {
			type: 'backup';
			items: ExportFullGearRowV2[];
	  }
	| {
			type: 'export';
			items: ExportGearRowV2[];
	  }
);

export interface ExportGearRowV2 {
	gear: { name: string };
	hash?: string;
}

export interface ExportFullGearRowV2 extends ExportGearRowV2 {
	createdAt: string;
	updatedAt: string;
}
