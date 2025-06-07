export type FontCharacter = {
	codePoint: number;
	width: number;
	height: number;
	bits: boolean[];
};

export class FontRender {
	isLoading = $state(true);
	private bytes: Uint8Array | undefined = undefined;
	private indexMap = new Map<number, number>();

	constructor(loadFontBinary: Promise<ArrayBuffer>) {
		loadFontBinary
			.then((buffer) => {
				this.bytes = new Uint8Array(buffer);
				for (let i = 0; i < this.bytes.length; ) {
					const codePointLow = this.bytes[i];
					const codePointHigh = this.bytes[i + 1];
					const codePoint = (codePointHigh << 8) | codePointLow;
					const width = this.bytes[i + 2];
					const height = this.bytes[i + 3];
					const length = Math.ceil((width * height) / 8);
					this.indexMap.set(codePoint, i);
					i += 4 + length;
				}
			})
			.finally(() => (this.isLoading = false));
	}

	getCharacter(codePoint: number): FontCharacter | undefined {
		if (!this.bytes) throw new Error('Font bytes not loaded');

		const index = this.indexMap.get(codePoint);
		if (index === undefined) return undefined;

		const width = this.bytes[index + 2];
		const height = this.bytes[index + 3];
		const bits = new Array(width * height);

		for (let i = 0; i < bits.length; i++) {
			const byteIndex = Math.floor(i / 8);
			const bitIndex = i % 8;
			bits[i] = (this.bytes[index + 4 + byteIndex] & (1 << bitIndex)) !== 0;
		}

		return { codePoint, width, height, bits };
	}
}
