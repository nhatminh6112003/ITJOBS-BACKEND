module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['airbnb-base', 'eslint:recommended', 'eslint-config-prettier', 'prettier'],
	plugins: ['prettier'],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		camelcase: 'off',
		eqeqeq: 'off',
		'no-console': 'off',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'import/no-unresolved': 'off',
		'no-return-await': 'off',
		'node/no-unpublished-require': 'off',
		'node/no-missing-require': 'off',
		'import/extensions': 'off',
		// 'prettier/prettier': [
		// 	'warn',
		// 	{
		// 		printWidth: 120,
		// 		useTabs: true,
		// 		bracketSameLine: true,
		// 		jsxSingleQuote: true,
		// 		singleQuote: true,
		// 		tabWidth: 3,
		// 		trailingComma: 'none'
		// 	}
		// ]
	}
};
