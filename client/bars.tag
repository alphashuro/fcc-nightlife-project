<bars>
	<ul>
	<li each={ bars }>
		<p>{ this.name }</p>
		<p>{ this.phone }</p>
		<p>{ this.address }</p>
		<button onclick={ parent.going } >Going</button>
	</li>
	</ul>

	<script>
		this.bars = [];

		app.on('bars', bars => {
			this.update({bars});
		});

		going(e) {
			console.log(e.item);
		}
	</script>
</bars>