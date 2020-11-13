import React, {
	createContext,
	Dispatch,
	useEffect,
	useReducer,
	useRef,
	useState,
	useCallback,
	useContext,
} from "react";
/* redux */
/* component */
import Breadcrumb from "@components/Layout/Breadcrumb";
import LoginModal from "@components/LoginModal";
import SideMenu from "@components/Menu";
import { Layout, Button } from "antd";
/* icon */
import withStyles, { WithStylesProps } from "react-jss";
import { useTypedSelector } from "@store";
import Header from "./Header";
import Screen from "../screens";

const styles = (theme) => ({
	layout: {
		height: "100vh",
		width: "100vw",
	},
	sideMenu: {
		width: "400px",
		color: "white",
	},
	main: {
		backgroundColor: "white",
		padding: 15,
	},
	mainWrap: {
		padding: 15,
	},
	breadcrumb: {
		marginBottom: 10,
	},
});

interface Props extends WithStylesProps<typeof styles> {}
const { Sider, Content } = Layout;
const Index = ({ classes }: Props) => {
	const { parentMenuList } = useTypedSelector((state) => state.menu);

	return (
		<Layout className={classes.layout}>
			<Header></Header>

			<Layout>
				<Sider className={classes.sideMenu}>
					<SideMenu />
				</Sider>
				<Layout className={classes.mainWrap}>
					{parentMenuList.length === 0 ? null : (
						<Breadcrumb className={classes.breadcrumb} />
					)}
					<Content className={classes.main}>
						<Screen />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default withStyles(styles)(Index);
