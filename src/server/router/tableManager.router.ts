import express, { Request } from "express";
import { GetTableData, Column, ModelColumn } from "@schema/TableManager.schema";
import R from "ramda";
import { removeTbNames } from "@common";
import sequelize from "../db/config";

const router = express.Router();

/* middleware define */
/* middleware define -END */
router.post("/getTableData", async (req) => {
	req.transaction<GetTableData>(async ({ tableName }) => {
		/*
		 * 테이블 유무 확인
		 * */
		// if (
		// 	Object.values(sequelize.models).some((tbName) => {
		// 		return tableName === (tbName as any);
		// 	})
		// ) {
		// 	throw Error("해당 테이블이 존재하지 않습니다.");
		// }
		// const model = (await import(`${tbPath + tableName}.model`)).default;
		// const columns: Column[] = [];
		//
		// for (const [key, value] of Object.entries(model.rawAttributes)) {
		// 	await columns.push({
		// 		title: (value as ModelColumn).comment || key,
		// 		dataIndex: key,
		// 		key,
		// 		editable: true,
		// 		// editable: !(value.autoIncrement || value.primaryKey),
		// 	});
		// }
		//
		// let result = await removeTbNames(await model.findAll({ raw: true }));
		// result = result.map((o, i) => ({
		// 	...o,
		// 	key: i,
		// }));

		// return {
		// 	realColumns: model.rawAttributes,
		// 	result,
		// 	columns,
		// };
		return [] as any;
	});
});

export default router;
