import { ReactNode } from "react";
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";
import treeUtil from "tree-util";
import { findIndex } from "ramda";

export interface TreeOneMenu {
	dataObj: {
		menuSeqNo: number;
		menuName: string;
		parentMenuSeqNo: number;
		menuOrder?: number | undefined;
		iconName?: string | undefined;
		screenSeqNo?: number | undefined;
		componentName?: string | undefined;
	};
	children: TreeOneMenu[];
}
export interface OneMenu {
	menuSeqNo: number;
	menuName: string;
	parentMenuSeqNo?: number;
	menuOrder?: number | undefined;
	iconName?: string | undefined;
	screenSeqNo?: number | undefined;
	componentName?: string | undefined;
}
export type OpenKey = string;
export type SelectedKey = string;

interface State {
	parentMenuList: OneMenu[];
	clickedMenu: OneMenu | undefined | "home";
	typingMenu: string;
	openKeys: OpenKey[];
	selectedKeys: SelectedKey[];
	menuList: OneMenu[];
	treeMenuList: TreeOneMenu[];
}

interface Payload {
	onlyClickSubMenu: string;
	typingMenu: string;
	openKeys: OpenKey[];
	selectedKeys: SelectedKey[];
	menuList: OneMenu[];
	treeMenuList: TreeOneMenu[];
}

const initialState: State = {
	parentMenuList: [],
	clickedMenu: undefined,
	typingMenu: "",
	openKeys: [],
	selectedKeys: [],
	menuList: [],
	treeMenuList: [],
};

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		initScreen(state) {},
		goHome(state) {
			state.parentMenuList = [];
			state.clickedMenu = "home";
			state.typingMenu = "";
			state.openKeys = [];
			state.selectedKeys = [];
		},
		onlyOpenSubMenu(
			state,
			{ payload }: PayloadAction<Payload["onlyClickSubMenu"]>,
		) {
			state.selectedKeys = [];
			state.typingMenu = "";

			const index = state.parentMenuList.findIndex(
				(el) => el.menuSeqNo === Number(payload),
			);
			const result = state.parentMenuList
				.slice(index + 1, state.parentMenuList.length)
				.map((el) => {
					return `${el.menuSeqNo}`;
				});
			state.openKeys = result;
		},
		/**
		 * click Sub Menu
		 * */
		openSubMenu(state, { payload }: PayloadAction<OpenKey>) {
			state.typingMenu = "";
			const keyIndex = state.openKeys.indexOf(payload);
			if (keyIndex !== -1) {
				state.openKeys.splice(keyIndex, 1);
			} else {
				state.openKeys.push(payload);
			}
		},

		/**
		 * 메뉴 초기화
		 * */
		initMenu(state, action: PayloadAction<void>) {
			state.openKeys = [];
			state.selectedKeys = [];
		},

		/**
		 * 메뉴명 검색
		 * */
		searchMenu(state, { payload }: PayloadAction<string>) {
			state.typingMenu = payload;
			const willSelectKeys: string[] = [];
			let willOpenKeys: string[] = [];

			if (R.isEmpty(payload)) {
				state.openKeys = [];
				state.selectedKeys = [];
			} else {
				(function recurFunc(
					_menuList: TreeOneMenu[],
					isParentInclude: boolean,
					parentKey: string[] = [],
				) {
					_menuList.forEach((_menu) => {
						const _seqNo = _menu.dataObj.menuSeqNo.toString();
						const isInclude = new RegExp(payload).test(_menu.dataObj.menuName);

						if (_menu.children.length === 0) {
							if (isInclude) {
								willSelectKeys.push(_seqNo);
								willOpenKeys = [...willOpenKeys, ...parentKey];
							} else {
								// TODO : 마지막 자식이 미포함시 부모는 닫음
								if (isParentInclude) {
									parentKey.splice(parentKey.length - 1, 1);
								}
							}
						} else {
							parentKey.push(_seqNo);
							recurFunc(_menu.children, isInclude, parentKey);
						}
					});
				})(state.treeMenuList, false);

				state.selectedKeys = willSelectKeys;
				state.openKeys = willOpenKeys;
			}
		},

		/**
		 *  메뉴 아이템 클릭
		 * */
		clickMenuItem(state, { payload }: PayloadAction<SelectedKey>) {
			const parentMenus = (function findParent(menuSeqNo, menus: any[]) {
				const currentMenu = state.menuList.find((s) => {
					return s.menuSeqNo === menuSeqNo;
				});
				if (currentMenu) {
					menus.push(currentMenu);
					if (currentMenu.parentMenuSeqNo) {
						return findParent(currentMenu.parentMenuSeqNo, menus);
					} else {
						return menus;
					}
				}

				return [];
			})(Number(payload), []);

			state.selectedKeys = [payload];
			state.clickedMenu = parentMenus[0];
			state.parentMenuList = parentMenus;
		},

		/**
		 * 메뉴 리스트 셋팅
		 * */
		setMenuList(state, { payload }: PayloadAction<Payload["menuList"]>) {
			const menuTree = treeUtil.buildTrees(payload, {
				id: `menuSeqNo`,
				parentid: `parentMenuSeqNo`,
			});

			const result: TreeOneMenu[] = [];

			function recurvFunc({ dataObj, children }) {
				if (children.length !== 0) {
					const temp: any[] = [];
					children.forEach((n) => {
						temp.push(recurvFunc(n));
					});
					return {
						dataObj: {
							...dataObj,
						},
						children: temp,
					};
				} else {
					return {
						dataObj: {
							...dataObj,
						},
						children: [],
					};
				}
			}
			menuTree.forEach(({ rootNode: { dataObj, children } }) => {
				result.push(
					recurvFunc({
						dataObj,
						children,
					}),
				);
			});

			state.menuList = payload;
			state.treeMenuList = result;
		},
	},
});
export const {
	initScreen,
	goHome,
	searchMenu,
	clickMenuItem,
	setMenuList,
	openSubMenu,
	initMenu,
	onlyOpenSubMenu,
} = menuSlice.actions;

export default menuSlice.reducer;
