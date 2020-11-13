import { AxiosInstance } from "axios";
import R from "ramda";
import { GetSession, SetSession } from "@schema/Session.schema";
import { Request } from "express";
import Axios from "./axios";

type GetSessionType = Promise<Request["getSession"]>;
type SetSessionType = Promise<Request["setSession"]>;

export const getSession = async (key: GetSession["in"]["key"]) => {
	const ax = new Axios<GetSession>();
	const { value } = await ax.transaction("/session/getSession", { key });
	return value as GetSession["out"]["value"];
};

export const setSession = async (
	key: SetSession["in"]["key"],
	value: SetSession["in"]["value"],
) => {
	const ax = new Axios<SetSession>();
	const result = await ax.transaction("/session/setSession", { key, value });
	return true as SetSession["out"]["result"];
};
