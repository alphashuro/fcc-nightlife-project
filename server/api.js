const foursquare = require('./foursquare');

export function * exploreBars() {
	this.type = 'json';
	
	const { place, latitude, longitude, accuracy } = this.query;
	
	if (place) {
		this.body = yield foursquare.explorePlace(place);
	} else if (latitude && longitude) {
		this.body = yield foursquare.exploreCoords({ latitude, longitude, accuracy });
	} else {
		return;
	};
};
