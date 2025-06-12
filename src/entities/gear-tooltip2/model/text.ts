export type NamedColor =
	| 'white'
	| 'gray'
	| 'darkGray'
	| 'red'
	| 'emphasis'
	| 'starforce'
	| 'scroll'
	| 'bonusStat'
	| 'potentialNormal'
	| 'potentialRare'
	| 'potentialEpic'
	| 'potentialUnique'
	| 'potentialLegendary'
	| 'exceptional';

export function getColorValue(color: string) {
	switch (color) {
		case 'white':
			return '#ffffff';
		case 'gray':
			return '#b7bfc5';
		case 'darkGray':
			return '#85919f';
		case 'red':
			return '#ff6633';
		case 'emphasis':
			return '#ffcc00';
		case 'starforce':
			return '#ffcc00';
		case 'scroll':
			return '#afadff';
		case 'bonusStat':
			return '#0ae3ad';
		case 'potentialNormal':
			return '#85919f';
		case 'potentialRare':
			return '#66ffff';
		case 'potentialEpic':
			return '#bb77ff';
		case 'potentialUnique':
			return '#ffcc00';
		case 'potentialLegendary':
			return '#ccff00';
		case 'exceptional':
			return '#ff3333';
		default:
			return '#ffffff';
	}
}
