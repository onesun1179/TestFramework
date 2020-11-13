import * as express from "express";
import type { GetSession, SetSession } from "@schema/Session.schema";
import type { CanSendType, SchemaDefaultType } from "@schema/index";

import { models as _models } from "../../server/db/config";

type Callback<T extends SchemaDefaultType> =
	| ((param: T["in"], models: typeof _models) => T["out"] | Promise<T["out"]>)
	| ((param: T["in"]) => T["out"] | Promise<T["out"]>);

declare global {
	namespace Express {
		interface Request {
			getSession: (key: GetSession["in"]["key"]) => GetSession["out"]["value"];
			setSession: (
				key: SetSession["in"]["key"],
				value: SetSession["in"]["value"],
			) => SetSession["out"]["result"];
			transaction: <T extends SchemaDefaultType>(callback: Callback<T>) => void;
		}
	}
}
