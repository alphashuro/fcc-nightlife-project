<bars>
	<ul>
	<li each={ bars }>
		{this}
	</li>
	</ul>

	<script>
		this.bars = [];
		app.on('bars', bars => {
			this.update(bars);
		})
	</script>
</bars>