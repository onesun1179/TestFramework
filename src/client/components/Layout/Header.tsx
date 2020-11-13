import React, { ComponentClass, FC, ReactNode, useCallback } from "react";
import { Layout, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { goHome } from "@reducer/Menu.reducer";

const { Header } = Layout;
interface HeaderProps {}

interface HeaderState {}

const DwHeader: FC<HeaderProps> = ({}) => {
	const dispatch = useDispatch();
	const onHomeClick = useCallback(() => {
		dispatch(goHome());
	}, []);
	return (
		<Header>
			<Button icon={<HomeOutlined />} onClick={onHomeClick} />
		</Header>
	);
};

export default DwHeader;
