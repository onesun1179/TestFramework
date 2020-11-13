import { Response, Request, NextFunction } from "express";
import { Sequelize } from "sequelize-typescript";
import { models } from "../db/config";

function transactionMiddleware() {
	return (req: Request, res: Response, next: NextFunction) => {
		req.transaction = async (callback) => {
			try {
				const callbackResult = await callback(req.body.param, models);
				res.json({
					result: callbackResult,
				});
			} catch (e) {
				console.error(e);
				res.json({ error: true, message: e.message });
			}
		};

		next();
	};
}
export default transactionMiddleware;
