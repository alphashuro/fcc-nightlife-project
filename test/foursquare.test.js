import test from 'ava';

import 'babel-polyfill';
import simple from 'simple-mock';
import proxyquire from 'proxyquire';

const mockFoursquareVenues = {};
function mockFoursquareVenuesFactory(clientId, clientSecret) {
	return mockFoursquareVenues;
}
mockFoursquareVenues['@noCallThru'] = true;
const foursquare = proxyquire('../server/foursquare', {
	foursquarevenues: mockFoursquareVenuesFactory 
});

test.beforeEach(t => {
	mockFoursquareVenues.exploreVenues = simple.spy();
});

test.afterEach(t => {
	simple.restore();
});

test(`exploreBars calls exploreVenues with given options combined with { section : 'drinks'`, t => {
	foursquare.exploreBars({near: 'place'});

	const actual = mockFoursquareVenues.exploreVenues.lastCall.args[0];
	const expected = { near: 'place', section: 'drinks' };

	t.deepEqual(actual, expected);
});

test(`exploreBars callback should transform data into name, phone and address`, async t => {
	const data = {
		response: {
			groups: [{
				items: [{
					venue: {
						name: 'venue1',
						contact: { formattedPhone: '123' },
						location: { address: 'x y z' },
					}
				}]
			}]
		}
	};
	mockFoursquareVenues.exploreVenues = simple.stub().callback(null, data);

	const actual = await foursquare.exploreBars({ near: 'test' });
	const expected = [{
		name: 'venue1',
		phone: '123',
		address: 'x y z',
	}];

	t.deepEqual(actual, expected);
});

test(`explorePlace calls exploreBars with {near: place} options`, t => {
	
});

test(`exploreCoords calls exploreBars with {ll, llAcc} options`, t => {

})
