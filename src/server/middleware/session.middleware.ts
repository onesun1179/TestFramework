import { Response, Request, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import R from "ramda";

function customSession() {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.session!.data) {
			const data: SessionData = {};

			req.session!.data = data;
		}
		// 서버측에서 사용
		req.getSession = (key) => {
			return req.session ? req.session.data[key] : undefined;
		};

		req.setSession = (key, value) => {
			req.session!.data[key] = value;

			return true;
		};

		next();
	};
}

export interface SessionData {
	userSeqNo?: number;
	authSeqNo?: number;
}

export default customSession;
