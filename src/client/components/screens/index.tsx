import React, { createElement, useState, useEffect, memo } from "react";
import type { ReactNode, FC } from "react";
import { useTypedSelector } from "@store";
import { Modal } from "antd";

interface ScreenProps {}
const Screen: FC<ScreenProps> = ({}) => {
	const baseUrl = `./`;
	const homePath = `Home`;
	const [screen, setScreen] = useState<ReactNode>(null);
	const { clickedMenu } = useTypedSelector((state) => state.menu);
	useEffect(() => {
		(async () => {
			try {
				let component: any = null;
				// TODO: 메뉴 클릭 시 화면 유무 체크해야함
				if (clickedMenu && clickedMenu !== "home") {
					component = await import(
						`${baseUrl}${clickedMenu.componentName}.screen`
					);
				} else {
					component = await import(`${baseUrl}${homePath}.screen`);
				}
				setScreen(createElement(component.default));
			} catch (e) {
				Modal.error({
					title: e.message,
				});
			}
		})();
	}, [clickedMenu]);
	return <>{screen}</>;
};

export default Screen;
