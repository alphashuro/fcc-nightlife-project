<use-my-loc>
	<button onclick={ useloc }>Use my location</button>

	<script>
		useloc() {
			navigator.geolocation.getCurrentPosition(({coords}) => {
				const query = 
					'?latitude='+coords.latitude+
					'&longitude='+coords.longitude+
					'&accuracy='+coords.accuracy;
				opts.fetchBars(query);
			});
		}
	</script>
</use-my-loc>
