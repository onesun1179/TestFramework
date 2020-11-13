import React, {
	createElement,
	ReactElement,
	useContext,
	useEffect,
	useMemo,
} from "react";
import * as R from "ramda";
import * as icons from "@ant-design/icons";
import { Breadcrumb as AntdBreadcrumb } from "antd";
import { useTypedSelector } from "@store";
import withStyles, { WithStylesProps } from "react-jss";
import { onlyOpenSubMenu } from "@reducer/Menu.reducer";
import { useDispatch } from "react-redux";

interface BreadcrumbProps extends WithStylesProps<typeof styles> {
	className?: string;
}

interface BreadcrumbState {}
const styles = (theme) => ({});

const Breadcrumb = ({ className }: BreadcrumbProps) => {
	const dispatch = useDispatch();
	const { parentMenuList } = useTypedSelector((state) => state.menu);
	const onClick = (e) => {
		dispatch(onlyOpenSubMenu(e.target.getAttribute("data-key")));
	};
	const setBreadcrumb = useMemo(() => {
		return R.reverse(parentMenuList).map((menu) => {
			return (
				<AntdBreadcrumb.Item key={menu.menuSeqNo} onClick={onClick} href={"#"}>
					{menu.iconName ? createElement(icons[menu.iconName]) : null}
					<span data-key={menu.menuSeqNo}>{menu.menuName}</span>
				</AntdBreadcrumb.Item>
			);
		});
		return null;
	}, [parentMenuList]);

	return <AntdBreadcrumb className={className}>{setBreadcrumb}</AntdBreadcrumb>;
};

export default withStyles(styles)(Breadcrumb);
