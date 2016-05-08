import test from 'ava';

import 'babel-polyfill';
import * as routes from '../server/router';

test(`exploreBars route is a generator`, t => {
	const actual = routes.exploreBars.constructor.name;
	const expected = 'GeneratorFunction';

	t.deepEqual(actual, expected);
})
