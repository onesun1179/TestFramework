import { Sequelize } from "sequelize-typescript";

import Screen from "@model/Screen.model";
import Menu from "@model/Menu.model";
import User from "@model/User.model";
import Auth from "@model/Auth.model";
import ErrorLog from "@model/ErrorLog.model";
import Icon from "@model/Icon.model";
import AuthsToMenus from "@model/AuthsToMenus.model";
import { sequelizeStoreConfig } from "./connect";

export const models = {
	ErrorLog,
	Icon,
	Screen,
	Menu,
	Auth,
	User,
	AuthsToMenus,
};

export default new Sequelize({
	...sequelizeStoreConfig,
	models: Object.values(models),
	logging: false,
	define: {
		freezeTableName: true,
		underscored: true,
		timestamps: true,
	},
});
