// NodeJs

declare namespace NodeJS {
	interface Global {
		_loginEmail: string;
	}

	interface Array<T> {
		test: string;
	}
}
