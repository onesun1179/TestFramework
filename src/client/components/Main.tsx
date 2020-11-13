import React, { useContext, useEffect, useState } from "react";
import { setUser } from "@reducer/User.reducer";
import Axios from "@client/utils/axios";
import { getSession } from "@client/utils/session";
import { useTypedSelector } from "@store";
import { useDispatch } from "react-redux";
import type { CheckSession } from "@schema/User.schema";
import { Spin } from "antd";
import LoginModal from "./LoginModal";
import Layout from "./Layout";

interface MainProps {}
interface MainState {}

const Main = ({}: MainProps) => {
	const dispatch: AppDispatch = useDispatch();
	const [loginOpen, setLoginOpen] = useState<boolean>(false);
	const [spin, setSpin] = useState<boolean>(true);
	useEffect(() => {
		(async () => {
			const ax = new Axios<CheckSession>();
			const data = await ax.transaction("/user/checkSession");
			if (data) {
				dispatch(setUser(data));
				setLoginOpen(false);
			} else {
				setLoginOpen(true);
			}
			setSpin(false);
		})();
	}, []);
	return (
		<Spin spinning={spin}>
			{loginOpen ? (
				<LoginModal open={loginOpen} setOpen={setLoginOpen} />
			) : (
				<Layout />
			)}
		</Spin>
	);
};

export default Main;
