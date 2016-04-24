require('dotenv').config();
var foursquare = (require('foursquarevenues'))(process.env.FOURSQUARE_CLIENT_ID, process.env.FOURSQUARE_CLIENT_SECRET);
var serve = require('koa-static');
var kr = require('koa-route');
var json = require('koa-json');
var koa = require('koa');
var app = koa();

app.context.foursquare = foursquare;

function explore(location) {
	return 
}

var bars = {
	search: function *(location) {
		this.type = 'json';
		this.body = yield new Promise((resolve, reject) => {
			const options = {
				venuePhotos: 1,
				section: 'drinks', 
				near: location
			};
			this.foursquare.exploreVenues(options, (err, data) => {
				if (err) {
					reject(err);
				} else {
					const result = data.response.groups[0].items.map(i => ({
											name: i.venue.name, 
											phone: i.venue.contact.formattedPhone,
											address: i.venue.location.address,
											self: i.venue
										}));
					resolve(result);
				}
			})
		});
	}
}

app.use(json());
app.use(serve('./client'));

app.use(kr.get('/api/search/:location', bars.search))

app.listen(8080);
