import test from 'ava';

import 'babel-polyfill';
import simple from 'simple-mock';
const request = require('supertest-as-promised').agent(app.listen());

import app from '../server/app';

test('explore place', async t => {
	// t.plan(2);

	// const res = await request
		// .get('/api/explore?place=CapeTown')
		// .send();

	// t.is(res.status, 200);
});

// test
