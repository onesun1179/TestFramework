import React, {
	FC,
	useContext,
	useEffect,
	useRef,
	useCallback,
	useMemo,
	ReactNode,
	createElement,
	useState,
} from "react";
import * as R from "ramda";
import { Menu as AntdMenu, Button, Input, Modal } from "antd";
import * as icons from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";

import { MENU_INLINE_INDENT } from "@constant";
import Axios from "@client/utils/axios";
import uuid from "react-uuid";
import treeUtil from "tree-util";
import withStyles, { WithStylesProps } from "react-jss";
import { GetMenuListSchema } from "@schema/AuthsToMenus.schema";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@store";
import {
	searchMenu,
	openSubMenu,
	initMenu,
	clickMenuItem,
	setMenuList,
	goHome,
} from "@reducer/Menu.reducer";

interface SideMenuProps extends WithStylesProps<typeof styles> {}

const { SubMenu, Item } = AntdMenu;
const styles = (theme) => ({
	menu: {
		height: "100%",
	},
	menuSearchInput: {},
});

const Menu: FC<SideMenuProps> = ({ classes }) => {
	const dispatch: AppDispatch = useDispatch();
	const {
		openKeys,
		treeMenuList,
		selectedKeys,
		menuList,
		typingMenu,
	} = useTypedSelector((state) => state.menu);
	const { user } = useTypedSelector((state) => state.user);
	useEffect(() => {
		dispatch(goHome());
	}, []);
	useEffect(() => {
		(async () => {
			if (user) {
				const ax = new Axios<GetMenuListSchema>();
				const axResult = await ax.transaction("/authsToMenus/getMenuList", {
					authSeqNo: user.authSeqNo,
				});

				await dispatch(setMenuList(axResult.menuList));
			}
		})();
	}, [user]);

	/**
	 * 서브 메뉴 클릭
	 * */
	const onSubMenuClick = useCallback(
		(e) => {
			dispatch(openSubMenu(e.key));
		},
		[openKeys, menuList],
	);

	/**
	 * 메뉴 아이템 클릭
	 * 메인화면 변경
	 * */
	const onMenuItemClick = useCallback(
		(e) => {
			const findMenu = menuList!.find((menu) => {
				return menu.menuSeqNo === Number(e.key);
			});
			if (findMenu && findMenu!.screenSeqNo) {
				dispatch(clickMenuItem(e.key));
			} else {
				Modal.error({
					title: "해당 메뉴의 화면이 없습니다.",
				});
			}
		},
		[selectedKeys, menuList],
	);
	/**
	 * 메뉴명 검색 change 핸들러
	 * */
	const onSearchMenuChange = (e) => {
		const val = e.target.value;
		dispatch(searchMenu(val));
		e.preventDefault();
	};
	/**
	 * 메뉴 셋팅
	 * () => React.ReactNode[]
	 * */
	const notEmptyMenuList = useMemo(() => {
		function findChild(
			brothers: Record<string, any>[],
			parent: (children: ReactNode) => ReactNode,
			index: number,
			resultBrothers: ReactNode[] = [],
		) {
			if (brothers.length === 0) return null;
			const _resultBrothers = resultBrothers;
			const { children, dataObj } = brothers[index];
			if (children.length === 0) {
				// 자식 노드가 없는 경우
				_resultBrothers.push(
					<Item
						onClick={onMenuItemClick}
						key={dataObj.menuSeqNo}
						icon={
							dataObj.iconName ? createElement(icons[dataObj.iconName]) : null
						}
					>
						{dataObj.menuName}
					</Item>,
				);

				if (brothers.length === index + 1) {
					// 마지막이면 부모에 담아서 리턴

					return parent(_resultBrothers);
				} else {
					// 마지막 아니면 재귀
					findChild(brothers, parent, index + 1, _resultBrothers);
				}
			} else {
				// 자식 노드가 있는 경우

				_resultBrothers.push(
					findChild(
						children,
						(child) => (
							<SubMenu
								onTitleClick={onSubMenuClick}
								key={dataObj.menuSeqNo}
								title={dataObj.menuName}
								icon={
									dataObj.iconName
										? createElement(icons[dataObj.iconName])
										: null
								}
							>
								{child}
							</SubMenu>
						),
						0,
					),
				);

				if (brothers.length === index + 1) {
					return parent(_resultBrothers);
				} else {
					findChild(brothers, parent, index + 1, _resultBrothers);
				}
			}

			return parent(_resultBrothers);
		}

		return findChild(treeMenuList, (child) => <>{child}</>, 0, []);
	}, [menuList]);
	// test;
	return (
		<AntdMenu
			multiple={true}
			mode="inline"
			inlineIndent={MENU_INLINE_INDENT}
			className={classes.menu}
			selectedKeys={selectedKeys}
			openKeys={openKeys}
			subMenuOpenDelay={0.5}
			subMenuCloseDelay={0.5}
		>
			<Input
				className={classes.menuSearchInput}
				prefix={<SearchOutlined />}
				allowClear={true}
				value={typingMenu}
				onChange={onSearchMenuChange}
			/>
			{menuList.length === 0 ? null : notEmptyMenuList}
		</AntdMenu>
	);
};

export default withStyles(styles)(Menu);
