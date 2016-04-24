var app = riot.observable();
app.fetchBars = query => {
	const api = '/api/explore?';
	const url = encodeURIComponent(api+query);
	fetch(api+query)
		.then(r => r.json())
		.then(bars => app.trigger('bars', bars))
		.catch(e => {
			app.trigger('error', e);
			console.error(e);
		});
};
riot.mount('*', app);