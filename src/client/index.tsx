import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import ko from "antd/lib/locale-provider/ko_KR";
import en from "antd/lib/locale-provider/en_US";

import moment from "moment";
import "moment/locale/fr";
import { reducer, initValue } from "@context/uiConfig";
import { ThemeProvider } from "react-jss";
// import initConfig from "./initConfig";
// const theme = createMuiTheme();
import { Provider } from "react-redux";
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import store from "./redux/store";
/* hook */
import Main from "./components/Main";
import { unregister } from "./serviceWorker";
import theme from "./theme";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Index = () => {
	const [state] = useReducer(reducer, initValue);

	moment.locale(state.language);
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<ConfigProvider locale={state.language === "ko" ? ko : en}>
					{/*<LoginDialog />*/}
					<Main />
				</ConfigProvider>
			</ThemeProvider>
		</Provider>
	);
};

ReactDOM.render(<Index />, document.getElementById("root"));
unregister();
