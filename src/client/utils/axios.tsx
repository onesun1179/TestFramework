import axios, { AxiosResponse } from "axios";
import * as R from "ramda";
import { Modal } from "antd";
import { SchemaDefaultType } from "@schema/index";
// Names of properties in T with types that include undefined

class CustomAxios<T extends SchemaDefaultType> {
	constructor(url = "") {
		this.baseUrl = url;
	}

	baseUrl = "";

	private _axios = axios.create({
		baseURL: `${process.env.DEV_SERVER_URL}:${process.env.DEV_SERVER_PORT}`,
		timeout: 3000,
		headers: { "X-Custom-Header": "foobar" },
		withCredentials: true,
	});

	async transaction(url: string, param: T["in"] = undefined) {
		const { data } = await this._axios.post(`${this.baseUrl}${url}`, { param });
		arrHandler(data);

		return data.result as T["out"] & T["client"];
	}
}

function arrHandler(sendData: AxiosResponse["data"]) {
	if (sendData.error) {
		arrDialog(sendData.message);
	}
}

function arrDialog(title: string) {
	Modal.error({
		title,
	});
	throw Error(title);
}

export default CustomAxios;
