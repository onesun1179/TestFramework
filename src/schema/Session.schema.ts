import type { SessionData } from "../server/middleware/session.middleware";

export type GetSession = {
	in: {
		key: keyof SessionData;
	};
	out: {
		value: SessionData[GetSession["in"]["key"]];
	};

	client: {
		value: SessionData[GetSession["in"]["key"]];
	};
};

export type SetSession = {
	in: {
		key: keyof SessionData;
		value: SessionData[SetSession["in"]["key"]];
	};
	out: {
		result: boolean;
	};

	client: {
		result: boolean;
	};
};
