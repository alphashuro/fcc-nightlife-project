module.exports = wallaby => ({
	files: ['server/**/*.js'],
	tests: ['test/**/*.js'],
	env: {
		type: 'node'
	},
	testFramework: 'ava',
	compilers: {
    '**/*.js': wallaby.compilers.babel()
  }
});
