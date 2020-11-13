import AuthsToMenus from "@model/AuthsToMenus.model";
import Menu from "@model/Menu.model";
import Screen from "@model/Screen.model";

export type OneMenu = {
	menuSeqNo: Menu["menuSeqNo"];
	menuName: Menu["menuName"];
	parentMenuSeqNo?: Menu["parentMenuSeqNo"];
	menuOrder?: AuthsToMenus["menuOrder"];
	iconName?: Menu["iconName"];
	screenSeqNo?: Screen["screenSeqNo"];
	componentName?: Screen["componentName"];
};

export type GetMenuListSchema = {
	in: {
		authSeqNo: AuthsToMenus["authSeqNo"];
	};
	out: {
		menuList: OneMenu[];
	};
};

export type GetUserInfoSchema = {
	in: {
		userSeqNo: number;
	};
	out: {
		userSeqNo: number;
		authSeqNo: number;
		userEmail: string;
	};
};
