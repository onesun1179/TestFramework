// import * as path from "path";
/* eslint-disable import/newline-after-import, import/order, import/first */
import dotenv from "dotenv";
dotenv.config();

import express, { Request } from "express";
import loginRouter from "@router/user.router";
import userInfoRouter from "@router/authsToMenus.router";
import tableManagerRouter from "@router/tableManager.router";
import morgan from "morgan";
import customSession from "@middleware/session.middleware";
import sessionParser from "express-session";
import SequelizeSession from "express-session-sequelize";
import transactionMiddleware from "@middleware/transaction.middleware";
import errorhandler from "errorhandler";
import sessionRouter from "@router/session.router";
import cors from "cors";
import sequelize from "./db/config";
import errorHandlerMiddleware from "@middleware/errorHandler.middleware";
import path from "path";
import fs from "fs";

(async () => {
	const SequelizeStore = SequelizeSession(sessionParser.Store);
	const app = express();
	const port = process.env.DEV_SERVER_PORT || 8000;

	await sequelize.authenticate().then(() => {
		console.log("DB 연결 성공");
	});
	await sequelize.sync({ force: true }).then(() => {
		console.log("DB sync 완료");
	});

	const sessionOpt = {
		key: "session_cookie_name",
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		store: await new SequelizeStore({
			db: sequelize,
		}),
	};

	const corsOpt = {
		origin: true,
		credentials: true,
	};

	// app.set("trust proxy", 1);
	await app
		.use(sessionParser(sessionOpt))
		.use(customSession())
		.use(transactionMiddleware())

		.use(morgan("common"))
		.use(errorhandler())
		.use(
			express.urlencoded({
				extended: true,
			}),
		)
		.use(express.json())
		.use(cors(corsOpt));

	const routers = await fs.readdirSync(path.join(__dirname, "router"));
	// .reduce<string[]>((result, router) => {
	// 	return /.+\.router\.ts$/.test(router)
	// 		? [...result, router.replace(".router.ts", "")]
	// 		: result;
	// }, []);

	for await (const router of routers) {
		const pathName = router.replace(".router.ts", "");
		const routerObj = await import(path.join(__dirname, "router", router));

		app.use(`/${pathName}`, routerObj.default);
	}

	// console.log(routers);
	/* router */
	// app
	// 	.use("/session", sessionRouter)
	// 	.use("/tableManager", tableManagerRouter)
	// 	.use("/login", loginRouter)
	// 	.use("/userInfo", userInfoRouter)
	// 	.use("/authManage", authManageRouter)
	/* router -END*/

	app.use(errorHandlerMiddleware);

	await app.listen(port, () => {
		console.log(`server running on PORT ${port}`);
	});
})();
