import React, {
	createContext,
	useContext,
	FC,
	useReducer,
	useCallback,
	useEffect,
	useRef,
	useState,
	Dispatch,
} from "react";
import { Modal, Input, Form, Checkbox, Button, Grid, Spin } from "antd";
// import { Context } from "./Main";
import { UserOutlined } from "@ant-design/icons";
import withStyles, { WithStylesProps } from "react-jss";
import Axios from "@client/utils/axios";
import { setSession } from "@client/utils/session";
import { setUser } from "@reducer/User.reducer";
import { useTypedSelector } from "@store";
import { Login } from "@schema/User.schema";
import { useDispatch } from "react-redux";

export interface LoginModalProps extends WithStylesProps<typeof style> {
	open: boolean;
	setOpen: Dispatch<boolean>;
}

export interface LoginModalState {}
const style = (theme) => ({
	labelCol: {},
});
const labelCol = {
	span: 5,
};

const LoginModal: FC<LoginModalProps> = ({ open, setOpen }) => {
	const dispatch: AppDispatch = useDispatch();
	const [spin, setSpin] = useState<boolean>(false);
	const [form] = Form.useForm();

	useEffect(() => {
		return () => {};
	}, []);
	const onLogin = async (e) => {
		await setSpin(true);
		const ax = new Axios<Login>();

		const loginUserInfo = await ax.transaction("/user/login", e);

		if (loginUserInfo) {
			await dispatch(setUser(loginUserInfo));
			await setOpen(false);
		} else {
			Modal.error({
				title: "로그인 실패",
			});
		}
		await setSpin(false);
	};

	return (
		<Modal
			title={"로그인"}
			visible={open}
			closable={false}
			footer={
				<Button
					autoFocus={true}
					onClick={() => {
						form.submit();
					}}
				>
					로그인
				</Button>
			}
		>
			<Spin spinning={spin}>
				<Form
					form={form}
					initialValues={{ remember: true }}
					onFinish={onLogin}
					onFinishFailed={(e) => {
						// TODO : input shake effect 넣는게 어떰?
						// TODO : https://elrumordelaluz.github.io/reshake/
					}}
				>
					<Form.Item
						labelCol={labelCol}
						labelAlign={"left"}
						label={"email"}
						name={"userEmail"}
						rules={[{ required: true }, { type: "email" }]}
						initialValue={"onesun1179@naver.com"}
					>
						<Input size={"large"} onPressEnter={onLogin} />
					</Form.Item>
					<Form.Item
						labelCol={labelCol}
						labelAlign={"left"}
						label="Password"
						name="userPassword"
						rules={[{ required: true }]}
						initialValue={"1234"}
					>
						<Input.Password
							size={"large"}
							onPressEnter={onLogin}
							value={"1234"}
						/>
					</Form.Item>
					<Form.Item name="remember" valuePropName="checked">
						<Checkbox>Remember me</Checkbox>
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
};

export const LoginProvider = ({}) => {};

export default withStyles(style)(LoginModal);
