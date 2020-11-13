import { getManager, getConnection } from "typeorm";
import express, { Request } from "express";
import crypto from "crypto";

import treeUtil from "tree-util";
import { chkObjNull, removeTbNames } from "@common";
import { GetMenuListSchema } from "@schema/AuthsToMenus.schema";
import Menu from "@model/Menu.model";
import Screen from "@model/Screen.model";
import AuthsToMenus from "@model/AuthsToMenus.model";

const router = express.Router();

router.post("/getMenuList", async (req) => {
	req.transaction<GetMenuListSchema>(
		async ({ authSeqNo }, { AuthsToMenus }) => {
			const result = await AuthsToMenus.findAll({
				attributes: ["menuOrder", "menuSeqNo"],
				where: {
					authSeqNo,
				},
				include: [
					{
						attributes: ["menuName", "parentMenuSeqNo", "iconName"],
						model: Menu,
						include: [
							{
								attributes: ["screenSeqNo", "componentName"],
								model: Screen,
							},
						],
					},
				],
			});
			return {
				menuList: result.map((o) => {
					const t = o.toJSON() as AuthsToMenus;
					return {
						menuSeqNo: t.menuSeqNo,
						menuName: t.menu.menuName,
						parentMenuSeqNo: t.menu.parentMenuSeqNo,
						menuOrder: t.menuOrder,
						iconName: t.menu.iconName,
						...(t.menu.screen
							? {
									screenSeqNo: t.menu.screen.screenSeqNo,
									componentName: t.menu.screen.componentName,
							  }
							: {}),
					};
				}),
			};
		},
	);
});

export default router;
