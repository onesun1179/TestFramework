import React, { useContext } from "react";
import { Layout, Row, Col, Divider } from "antd";

interface MenuByAuthManageProps {}

interface MenuByAuthManageState {}
const { Header, Content, Footer } = Layout;
const style = { background: "#0092ff", padding: "8px 0" };
const MenuByAuthManageScreen = ({}: MenuByAuthManageProps) => {
	return (
		<Layout>
			<Content>
				<Row gutter={16}>
					<Col className="gutter-row" span={12}>
						<Divider orientation={"center"}>권한</Divider>
						<div style={style}>col-6</div>
					</Col>
					<Col className="gutter-row" span={12}>
						<Divider orientation={"center"}>메뉴</Divider>
						<div style={style}>col-6</div>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
};

export default MenuByAuthManageScreen;
