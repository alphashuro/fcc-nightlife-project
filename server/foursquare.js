/**
 * Foursquare module.
 * @module nightlife/foursquare
 * This module configures the foursquare API and provides functions for exploring areas.
 */
import foursquarevenues from 'foursquarevenues';

const foursquareClientId = process.env.FOURSQUARE_CLIENT_ID;
const foursquareClientSecret = process.env.FOURSQUARE_CLIENT_SECRET;

/** Set the client id and the client secret. */
export const foursquare = foursquarevenues(foursquareClientId, foursquareClientSecret);

/**
 * Explore drinking venues in an area based on a place or coordinates. Either the place or the coordinates must be provided.
 * @param {String} options.place - the place to explore.
 * @param {Number} options.latitude - the latitude to explore.
 * @param {Number} options.longitude - the longitude to explore.
 * @param {Number} options.accuracy - the accuracy of the location.
 * @returns {Promise} the venues found near the given location with a name, phone and address.
 */
export function exploreBars(options) {
	if (!options) return new Promise.reject(new Error('no options given'));
	// either place or coords should be in options
	if (!options.near && !options.ll) {
		return new Promise.reject(new Error('place or coordinates required'));
	};
	return new Promise((resolve, reject) => {
		foursquare.exploreVenues(
			Object.assign(options, { section: 'drinks' }), 
			(err,	data ) => {
				if (err) {
					reject(err);
				} else {
					const venues = data.response.groups[0].items.map(i => ({
						name: i.venue.name, 
						phone: i.venue.contact.formattedPhone,
						address: i.venue.location.address,
					}));
					resolve(venues);
				}
		});
	});
};

/**
 * Explore drinking venues in an area based on place name.
 * @param {String} place - the place to explore.
 * @returns {Promise} the venues found near the given location with a name, phone and address.
 */
export function explorePlace(place) {
	if (!place) return new Promise.reject(new Error('Place is required.'));
	return exploreBars({ near: place });
};

/**
 * Explore drinking venues in an area based on coordinates.
 * @param {Float} latitude, longitude - the coordinates to explore.
 * @param {Number} accuracy - (optional) the accuracy of the location.
 * @returns {Promise} the venues found near the given location with a name, phone and address.
 */
export function exploreCoords({ latitude, longitude, accuracy }) {
	if (!latitude || !longitude) {
		return new Promise.reject(new Error('Latitude and longitude are required.'));
	};
	return exploreBars({ ll: `${latitude},${longitude}`, llAcc: accuracy });
};
