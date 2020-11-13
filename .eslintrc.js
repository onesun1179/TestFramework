module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "@typescript-eslint/parser",
	// plugins: ["@typescript-eslint", "react-hooks", "lodash", "prettier"],
	plugins: ["@typescript-eslint", "react-hooks", "prettier"],
	parserOptions: {
		ecmaFeatures: {
			js: true,
			jsx: true,
			tsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},

	extends: [
		"airbnb-base",
		// "plugin:lodash/recommended",
		"eslint:recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],

	ignorePatterns: ["*.js", "**/node_modules", "**/dist"],
	rules: {
		"no-inner-declarations" : 0,
		"no-lonely-if" : 0,
		"no-else-return" : 0,
		"no-restricted-syntax": 1,
		"no-await-in-loop": 1,
		"no-empty-pattern": 0,
		"@typescript-eslint/no-empty-function": 0,
		"react/display-name": 0,
		"react/prop-types": 0,
		// 함수형 컴포넌트 파라미터 타입 미입력(제너릭타입으로 해결)
		"no-plusplus": 0,
		"react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
		"react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
		"@typescript-eslint/ban-ts-ignore": 0,
		"@typescript-eslint/ban-ts-comment": 0,
		// //ts-ignore 허용
		"spaced-comment": 0,
		// 블록 주석문 양 끝 간격 유무
		"no-underscore-dangle": 1,
		// 밑줄로 시작하는 변수
		"func-names": 1,
		// 이름없는 함수
		"no-param-reassign": 1,
		// 매개변수 수정
		"@typescript-eslint/no-empty-interface": 0,
		// 비어있는 interface or type

		"no-use-before-define": 0,
		"no-var-requires": 0,
		"import/prefer-default-export": 0,
		"import/extensions": 0,
		"import/no-unresolved": 0,
		"import/no-extraneous-dependencies": ["error", { devDependencies: true }],

		// "lodash/import-scope": [2, "method"],
		// "lodash/prefer-lodash-method": 0,
		// lodash에 함수가 있는데도 불구, 내부함수를 사용
		// "no-return-assign": 0,
		// 화살표 함수 return 없을 시
	},
};
