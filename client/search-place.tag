<search-place>
	<form onsubmit={ search }>
		<input name="place" type="text" placeholder="Where you at?">
		<button>Go</button>
	</form>

	<script>
		search(e) {
			const query = 'place='+this.place.value;
			opts.fetchBars(query);
		}
	</script>
</search-place>