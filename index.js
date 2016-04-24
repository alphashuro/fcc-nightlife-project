require('dotenv').config();
var foursquare = (require('foursquarevenues'))(process.env.FOURSQUARE_CLIENT_ID, process.env.FOURSQUARE_CLIENT_SECRET);
var serve = require('koa-static');
var kr = require('koa-route');
var json = require('koa-json');
var koa = require('koa');
var app = koa();

app.context.foursquare = foursquare;

var bars = {
	explore: function *() {
		this.type = 'json';
		this.body = yield new Promise((resolve, reject) => {
			const options = {
				section: 'drinks'
			};
			if (this.query.place) options.near = this.query.near;
			if (this.query.latitude && this.query.longitude) {
				options.ll = this.query.latitude+','+this.query.longitude;
			}
			if (this.query.accuracy) options.llAcc = this.query.accuracy;
			this.foursquare.exploreVenues(options, (err, data) => {
				if (err) {
					reject(err);
				} else {
					const result = data.response.groups[0].items.map(i => ({
											name: i.venue.name, 
											phone: i.venue.contact.formattedPhone,
											address: i.venue.location.address
										}));
					resolve(result);
				}
			})
		});
	}
}

app.use(json());
app.use(serve('./client'));

app.use(kr.get('/api/explore', bars.explore))

app.listen(process.env.PORT || 8080);
