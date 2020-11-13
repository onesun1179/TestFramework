// import ErrorLog from "@entity/ErrorLog.model";
import { ErrorRequestHandler } from "express-serve-static-core";
import ErrorLog from "../db/model/ErrorLog.model";

const errorHandlerMiddleware: ErrorRequestHandler = async (
	error,
	req,
	res,
	next,
) => {
	try {
		await ErrorLog.bulkCreate(
			error.stack.split("\n").map((stackLine) => ({
				statusCode: req.statusCode,
				errorLogMessage: error.message,
				errorStack: stackLine,
			})),
		);
	} catch (e) {
		console.error("error.middleware");
		console.error(e);
	} finally {
		await res.json({
			type: "error",
			message: error.message,
			stack: error.stack,
		});
		next();
	}
};

export default errorHandlerMiddleware;
