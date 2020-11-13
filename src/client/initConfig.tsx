import {
	changeConfirmLocale as modalConfig,
	getConfirmLocale as getModalDefaultConfig,
	ModalLocale,
} from "antd/lib/modal/locale";

interface Config {
	lang: "ko" | "eng";
}

export default function initConfig({ lang }: Config): void {
	const modalDefaultConfig = getModalDefaultConfig();

	modalConfig(
		lang === "ko"
			? {
					okText: "확인",
					cancelText: "취소",
					justOkText: "확인",
			  }
			: modalDefaultConfig,
	);
}
