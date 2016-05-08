import test from 'ava';

import 'babel-polyfill';
import simple from 'simple-mock';
import proxyquire from 'proxyquire';
const mockFoursquare = {
	'@noCallThru': true
};
const api = proxyquire('../server/api', { './foursquare': mockFoursquare });

test.beforeEach(t => {
	mockFoursquare.explorePlace = simple.spy(function * () {});
	mockFoursquare.exploreCoords = simple.spy(function * () {});
	t.context = {
		query: {}
	};
});

test.afterEach(t => {
	simple.restore();
});

function bind(context) {
	return api.exploreBars.bind(context);
};

function boundCall(context) {
	return bind(context)().next();
}

test('exploreBars is a function', t => {
	const actual = typeof api.exploreBars;
	const expected = 'function';

	t.is(actual, expected);
});

test(`exploreBars is a generator`, t => {
	const actual = api.exploreBars.constructor.name;
	const expected = 'GeneratorFunction';

	t.deepEqual(actual, expected);
});

test(`exploreBars sets context.type to json`, t => {
	boundCall(t.context);
	const actual = t.context.type;
	const expected = 'json';

	t.is(actual, expected);
});

test(`api.exploreBars calls explorePlace with the place if query.place is defined`, t => {
	t.context.query = {
		place: 'cape town'
	};
	boundCall(t.context);
	const actual = mockFoursquare.explorePlace.lastCall.args[0];
	const expected = 'cape town';

	t.is(actual, expected);
});

test(`api.exploreBars calls exploreCoords with coordinates if query.latitude and query.longitude are defined`, t => {
	const coords = {
		latitude: 1,
		longitude: 1,
		accuracy: 10,
	};
	t.context.query = coords;
	boundCall(t.context);
	const actual = mockFoursquare.exploreCoords.lastCall.args[0];
	const expected = {
		...coords
	};

	t.deepEqual(actual, expected);
});

